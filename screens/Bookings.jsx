import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { useSalon } from "../components/salonContext";
import { useState, useEffect, useCallback } from "react";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import {
  getDatabase,
  get,
  ref as databaseRef,
} from "firebase/database";
import { useFocusEffect } from '@react-navigation/native';


const Bookings = () => {
  const { salonName, profilePicture, salon } = useSalon();
  const [acceptedOrders, setAcceptedOrders] = React.useState([]);
  const [declinedOrders, setDeclinedOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        setLoading(true);
        const database = getDatabase();
        // const salonOrderRef = databaseRef(database, `salons/${salon.uid}/orders`);
        const salonOrderRef = databaseRef(database, `orderDetails`);

        const snapshot = await get(salonOrderRef);

        if (snapshot.exists()) {
          const orders = snapshot.val();
          const validAcceptedOrders = Object.values(orders).filter(
            (order) => order.status === "Accepted"
          );
          const validDeclinedOrders = Object.values(orders).filter(
            (order) => order.status === "Declined"
          );

          setAcceptedOrders(validAcceptedOrders);
          console.log("validaccepted orders: ", acceptedOrders)
          setDeclinedOrders(validDeclinedOrders);
          console.log("valid declined orders: ", declinedOrders)
          setLoading(false);
        }
      };

      fetchOrders();
    }, [salon.uid]));

  return (
    <View style={styles.dashboard}>
      {loading ? (
        <ActivityIndicator size="large" color={Color.coral} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <ScrollView>
                <Text style={styles.sectionTitle}>Accepted Orders</Text>
                <FlatList
                  data={acceptedOrders}
                  renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: (typeof item.userProfilePic === 'string' ? item.userProfilePic : "placeholder_image_url_here")
                        }}
                      />
                      <View style={styles.orderDetails}>
                        <Text style={styles.orderName}>{item.userName}</Text>
                        <Text style={styles.orderService}>Service: {item.description}</Text>
                        <Text style={styles.orderTime}>Time: {item.setTime}</Text>
                        <Text style={styles.orderDate}>Date: {item.setDate}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => "accepted-" + index.toString()}
                />

                <Text style={styles.sectionTitle}>Declined Orders</Text>
                <FlatList
                  data={declinedOrders}
                  renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: (typeof item.userProfilePic === 'string' ? item.userProfilePic : "placeholder_image_url_here")
                        }}
                      />
                      <View style={styles.orderDetails}>
                        <Text style={styles.orderName}>{item.userName}</Text>
                        <Text style={styles.orderService}>Service: {item.description}</Text>
                        <Text style={styles.orderTime}>Time: {item.setTime}</Text>
                        <Text style={styles.orderDate}>Date: {item.setDate}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => "declined-" + index.toString()}
                />
              </ScrollView>
            </>
          }
        />
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: FontSize.size_xl,
    fontWeight: "bold",
    marginVertical: 10,
  },
  orderCard: {
    backgroundColor: Color.coral,
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  orderDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  orderName: {
    fontSize: FontSize.size_lg,
    color: Color.white,
    fontFamily: FontFamily.poppinsBold,
  },
  orderService: {
    fontSize: FontSize.size_md,
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 5,
  },
  orderTime: {
    fontSize: FontSize.size_sm,
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 5,
  },
  orderDate: {
    fontSize: FontSize.size_sm,
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 5,
  },
});


export default Bookings;
