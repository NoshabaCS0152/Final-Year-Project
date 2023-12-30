import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSalon } from "../components/salonContext";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { getStorage, ref as storageRef, put } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { useFocusEffect } from '@react-navigation/native';
import {
  getDatabase,
  onValue,
  child,
  get,
  off,
  push,
  ref as databaseRef,
  set,
  update,
  runTransaction
} from "firebase/database";
import { useUser } from "../components/userContext";


const Requests = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const { salon } = useSalon();
  const { customerID } = useUser();
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [newAppointmentTime, setNewAppointmentTime] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const fetchSalonOrders = useCallback(() => {
    const database = getDatabase();
    const orderDetailsRef = databaseRef(database, `orderDetails`);

    const handleSnapshot = (snapshot) => {
      console.log("this is jfhjf", snapshot.val());
      //const orderData = snapshot.val().order;
      //console.log("this is order data", orderData)
      if (snapshot.exists()) {
        const allOrders = [];
        snapshot.forEach(childSnapshot => {
          const orderData = childSnapshot.val();
          console.log('Extracted order data:', orderData);
          allOrders.push({
            ...orderData,
            key: childSnapshot.key
          });
        });

        const validPendingOrders = allOrders.filter(order =>
          order.salonId === salon.uid &&
          order.status !== 'Accepted' &&
          order.status !== 'Declined'
        );

        setOrders(validPendingOrders);
      } else {
        setOrders([]);
      }
    };

    const listener = onValue(orderDetailsRef, handleSnapshot);

    return () => off(orderDetailsRef, 'value', listener);
  }, [salon.uid]);
  useEffect(() => {
    const detachListener = fetchSalonOrders();
    return detachListener;
  }, [fetchSalonOrders]);

  const updateOrderStatus = async (orderId, serviceId, status) => {
    try {
      const database = getDatabase();
      // const orderRef = databaseRef(database, `salons/${salon.uid}/orders/${orderId}`);
      // console.log(`Order ${orderId} status updated to ${status} in salon module.`);


      // // Using a transaction to atomically update the order status
      // await runTransaction(orderRef, (currentData) => {
      //   if (currentData === null) {
      //     // If the order doesn't exist, don't modify the database
      //     return;
      //   } else {
      //     // Otherwise, set the order status
      //     return { ...currentData, status: status };
      //   }
      // });

      const specificOrderRef = databaseRef(database, `orderDetails/${orderId}`);
      if (status === "Declined") {
        setDeclineModalVisible(true);
        // You can use the specificOrderRef and update the order status later when the salon owner provides a new time.
      } else {
        await update(specificOrderRef, { status: status });
        console.log(`Order ${orderId} status updated to ${status}`);
      }


    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeclineWithNewTime = async () => {
    try {
      const database = getDatabase();
      const specificOrderRef = databaseRef(
        database,
        `orderDetails/${selectedOrderId}`  // Use the selectedOrderId instead of orderId
      );
      await update(specificOrderRef, {
        status: "Declined",
        newAppointmentTime: newAppointmentTime,
      });

      setDeclineModalVisible(false);
      setNewAppointmentTime("");
      setSelectedOrderId("");
    } catch (error) {
      console.error("Error updating order status with new time:", error);
    }
  };
  const Drawer = createDrawerNavigator();
  var orderId;

  return (

    <View style={[styles.dashboard, styles.iconLayout1]}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => {
            console.log("Order Data:", item);
            console.log("Order key:", item.key);
            orderId = item.key
            return (
              <View style={styles.orderCard}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: (typeof item.userProfilePic === 'string' ? item.userProfilePic : "placeholder_image_url_here") }}
                />
                <Text style={styles.orderName}>{item.userName}</Text>
                <Text style={styles.orderService}>Service: {item.description}</Text>
                <Text style={styles.orderTime}>Time: {item.setTime}</Text>
                <Text>Date: {item.setDate}</Text>
                {/* ... (other render items unchanged) */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    onPress={() => {
                      console.log("Accepted");
                      updateOrderStatus(item.key, item.serviceId, 'Accepted');
                    }}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.declineButton]}
                    onPress={() => {
                      console.log("Declined");
                      setSelectedOrderId(item.key);
                      updateOrderStatus(item.key, item.serviceId, 'Declined');
                    }}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>

                </View>

              </View>
            )
          }}
          keyExtractor={(item) => item.key}

        />
      ) : (
        <Text style={{ top: 370, left: 30, fontSize: FontSize.size_5xl }}>No Bookings at the Moment</Text>
      )}
      {/* Decline Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={declineModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Provide a new time for the appointment:</Text>
            <TextInput
              placeholder="New Appointment Time"
              value={newAppointmentTime}
              onChangeText={(text) => setNewAppointmentTime(text)}
            />
            <Button
              title="Submit"
              onPress={handleDeclineWithNewTime}
            />
          </View>
        </View>
      </Modal>


    </View>

  );



};

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  childBg: {
    backgroundColor: Color.coral,
    position: "absolute",
  },

  dashboardChild: {
    top: 0,
    left: 0,
    height: 102,
    width: 428,
  },
  dashboard1: {
    top: 34,
    left: 100,
    color: Color.white,
    width: 196,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },

  dashboard: {
    backgroundColor: Color.white,
    height: 926,
    width: 428,
  },
  dashboard: {
    flex: 1,
    backgroundColor: Color.white,
  },
  noBookingText: {
    marginTop: 370,
    marginLeft: 30,
    fontSize: FontSize.size_5xl,
    color: Color.coral,
    fontFamily: FontFamily.poppinsBold,
  },
  orderCard: {
    backgroundColor: Color.coral,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  orderName: {
    fontSize: FontSize.size_xl,
    color: Color.white,
    fontFamily: FontFamily.poppinsBold,
  },
  orderService: {
    fontSize: FontSize.size_lg,
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 5,
  },
  orderTime: {
    fontSize: FontSize.size_lg,
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  },
  acceptButton: {
    backgroundColor: Color.green || '#4CAF50',  // If you don't have Color.green defined, it will default to a general green color.
  },
  declineButton: {
    backgroundColor: Color.red || '#F44336',  // If you don't have Color.red defined, it will default to a general red color.
  },
  buttonText: {
    color: Color.white || '#FFF',   // If you don't have Color.white defined, it will default to white.
    fontWeight: '600',
  },
});

export default Requests