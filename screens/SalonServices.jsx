import React, { useState, useCallback } from "react";
//import { Image } from "expo-image";
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import Dashboard from "../components/Dashboard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import { useRoute } from '@react-navigation/native';

const SalonServices = () => {
    const route = useRoute();

    //const   Name  = route.params?.Name;

  const [textVisible, setTextVisible] = useState(false);

  const openText = useCallback(() => {
    setTextVisible(true);
  }, []);

  const closeText = useCallback(() => {
    setTextVisible(false);
  }, []);

  return (
    <>
      <View style={styles.customerservice}>
       
        <Text style={[styles.services, styles.textFlexBox]}>Services</Text>
        <Pressable style={styles.pressable} onPress={openText}>
          <Text style={[styles.text, styles.textTypo]}>{`<`}</Text>
        </Pressable>
        <View style={[styles.salonservice, styles.salonserviceLayout3]}>
          <View style={[styles.salonserviceChild, styles.salonserviceBg]} />
          <Text style={styles.hairCut}>HAIR CUT</Text>
          <Image
            style={[styles.menhair2Icon, styles.menhair2IconLayout]}
            contentFit="cover"
            source={require("../assets/menhair-11.jpeg")}
          />
          <Text style={[styles.uniqueWithColor, styles.uniqueTypo]}>
            Unique with color and cut
          </Text>
          
          <Text style={styles.pkr}>300PKR</Text>
        <TouchableOpacity
        activeOpacity={0.2}>
          <View style={{
            top: 50,
            left: 285,
            width:55,
            height:30,
            borderRadius: 10,
            backgroundColor: "#0076D4",
          }}>
            <Text style={{color: "white", top: 5, left: 10}}>Book</Text>
          </View>
          </TouchableOpacity>
        </View>


        <View style={[styles.salonservice1, styles.salonserviceLayout1]}>
          <View style={[styles.salonserviceItem, styles.salonserviceLayout1]} />
          <Text style={styles.beard}>BEARD</Text>
          <Image
            style={[styles.menhair2Icon1, styles.menhair2IconLayout]}
            contentFit="cover"
            source={require("../assets/menhair-11.jpeg")}
          />
          <Text style={styles.uniqueWithColor1}>Unique with color and cut</Text>
          <Text style={[styles.pkr1, styles.pkr1Layout]}>260PKR</Text>
          <TouchableOpacity
        activeOpacity={0.2}>
          <View style={{
            top: 50,
            left: 285,
            width:55,
            height:30,
            borderRadius: 10,
            backgroundColor: "#0076D4",
          }}>
            <Text style={{color: "white", top: 5, left: 10}}>Book</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.salonserviceWrapper, styles.salonserviceLayout]}>
          <View style={[styles.salonservice2, styles.salonserviceLayout]}>
            <View
              style={[styles.salonserviceInner, styles.salonserviceLayout]}
            />
            <Text style={[styles.hairColor, styles.hairTypo]}>HAIR COLOR</Text>
            <Text style={[styles.uniqueWithColor2, styles.uniqueTypo]}>
              Unique with color and cut
            </Text>
            <Text style={[styles.pkr2, styles.pkrTypo]}>500PKR</Text>
            <TouchableOpacity
        activeOpacity={0.2}>
          <View style={{
            top: 50,
            left: 285,
            width:55,
            height:30,
            borderRadius: 10,
            backgroundColor: "#0076D4",
          }}>
            <Text style={{color: "white", top: 5, left: 10}}>Book</Text>
          </View>
          </TouchableOpacity>
            <Image
              style={[styles.menhair23Icon, styles.iconLayout2]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
          </View>
        </View>
      
       
      
       
        
        <View style={[styles.customerserviceInner, styles.frameViewLayout]}>
          <View style={[styles.frameView, styles.frameViewLayout]} />
        </View>
        <View style={styles.userParent}>
          <View style={[styles.user, styles.userPosition]}>
            <Text style={[styles.komalShaikh, styles.komalShaikhClr]}>
             Hair cut Salon
            </Text>
            <Image
              style={[
                styles.beautifulWomanWearingSunglaIcon,
                styles.iconLayout,
                
              ]}
              contentFit="cover"
             source={require("../assets/menhair-11.jpeg")}
            />
          </View>
          <View
            style={{
                top:140,
                left: 4,
                borderBottomColor: 'black',
                borderWidth: 3,
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            />
          <TouchableOpacity
            style={[styles.vector, styles.vectorPosition]}
            activeOpacity={0.1}
            onPress={() => {}}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
            //  source={require("../assets/vector46.png")}
            />
          </TouchableOpacity>
          <Text style={[styles.sukkurIbaUniversity, styles.vectorPosition]}>
            65200, Sukkur IBA University
          </Text>
          <View style={{ flexDirection: 'row', top: 60, left: 100 }}>
                  <Ionicons name="star-sharp" size={20} color="#FF7851" />
                  <Ionicons name="star-sharp" size={20} color="#FF7851" />
                  <Ionicons name="star-sharp" size={20} color="#FF7851" />
                  <Ionicons name="star-sharp" size={20} color="#FF7851" />
                  <Ionicons name="star-sharp" size={20} color="#FF7851" />
                  <Text style={{color: "#FF7851", left:5}}>5.0(100)</Text>
                  <TouchableOpacity
                  activeOpacity={0.2}>
                  <Ionicons name="chatbox-ellipses"  size={40} color="#FF7851" style={{left:40,top: -30}} />
                  </TouchableOpacity>

              </View>
        </View>
        <Image
          style={styles.menhair25Icon}
          contentFit="cover"
          source={require("../assets/menhair-11.jpeg")}
        />
       
        <Text style={[styles.services1, styles.reviewsTypo]}>Services</Text>
        <Text style={[styles.reviews, styles.reviewsTypo]}>Reviews</Text>
        <Text style={[styles.gallery, styles.reviewsTypo]}>Gallery</Text>
      
      </View>

      <Modal animationType="fade" transparent visible={textVisible}>
        <View style={styles.textOverlay}>
          <Pressable style={styles.textBg} onPress={closeText} />
          <Dashboard onClose={closeText} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    textAlign: "center",
    color: Color.white,
  },
  textTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  salonserviceLayout3: {
    height: 91,
    width: 447,
    backgroundColor:"#FADFDF",
    borderRadius: 20,
    position: "absolute",
  },
  salonserviceBg: {
    backgroundColor: Color.mistyrose_200,
    borderRadius: Border.br_xl,
    top: 0,
  },
  menhair2IconLayout: {
    width: 97,
    borderRadius: Border.br_61xl,
    left: 10,
    position: "absolute",
  },
  uniqueTypo: {
    height: 15,
    width: 203,
    fontFamily: FontFamily.poppinsLight,
    fontWeight: "300",
    left: 100,
    color: Color.black,
    fontSize: FontSize.size_base,
    textAlign: "center",
    position: "absolute",
  },
  salonserviceLayout1: {
    height: 85,
    width: 446,
    left: 0,
    backgroundColor: "#FADFDF",
    borderRadius:20,
    position: "absolute",
  },
  pkr1Layout: {
    width: 67,
    position: "absolute",
  },
  salonserviceLayout: {
    height: 83,
    width: 446,
    backgroundColor: "#FADFDF",
    left: 0,
    position: "absolute",
  },
  hairTypo: {
    width: 100,
    height: 21,
    color: Color.black,
    fontSize: FontSize.size_base,
    left: 120,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    position: "absolute",
  },
  pkrTypo: {
    top: 18,
    width: 69,
    height: 17,
    fontSize: FontSize.size_lg,
    color: Color.black,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    position: "absolute",
  },
  iconLayout2: {
    borderRadius: Border.br_51xl,
    width: 96,
    position: "absolute",
  },
  salonserviceLayout2: {
    width: 446,
    height: 91,
    left: 0,
    position: "absolute",
  },
  rectangleGroupLayout: {
    height: 29,
    left: 352,
    width: 89,
    position: "absolute",
  },
  text1Layout: {
    height: 28,
    position: "absolute",
  },
  frameViewLayout: {
    height: 77,
    width: 403,
    position: "absolute",
  },
  userPosition: {
    top: "0%",
    position: "absolute",
  },
  komalShaikhClr: {
    color: Color.black,
    textAlign: "left",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: 40,
  },
  vectorPosition: {
    top: "40%",
    position: "absolute",
  },
  reviewsTypo: {
    fontSize: FontSize.size_xl,
    top: 323,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  mdiarrowLeftThinIcon: {
    top: 288,
    width: 24,
    height: 24,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  services: {
    top: 34,
    left: 108,
    width: 204,
    height: 48,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.white,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  textOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  textBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  text: {
    fontSize: FontSize.size_29xl,
    width: 42,
    height: 56,
    textAlign: "center",
    color: Color.white,
  },
  pressable: {
    left: 22,
    top: 20,
    position: "absolute",
  },
  salonserviceChild: {
    height: 91,
    width: 447,
    position: "absolute",
    left: 0,
  },
  hairCut: {
    height: 21,
    width: 74,
    fontSize: FontSize.size_base,
    left: 122,
    color: Color.black,
    top: 25,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    position: "absolute",
  },
  menhair2Icon: {
    top: 15,
    height: 62,
  },
  uniqueWithColor: {
    top: 46,
  },
  pkr: {
    left: 275,
    width: 68,
    height: 17,
    fontSize: FontSize.size_lg,
    top: 23,
    color: Color.black,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    position: "absolute",
  },
  salonservice: {
    top: 380,
    left: -2,
  },
  salonserviceItem: {
    backgroundColor: Color.mistyrose_200,
    borderRadius: Border.br_xl,
    top: 0,
  },
  beard: {
    height: 19,
    top: 23,
    width: 74,
    color: Color.black,
    fontSize: FontSize.size_base,
    left: 122,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    position: "absolute",
  },
  menhair2Icon1: {
    top: 14,
    height: 57,
  },
  uniqueWithColor1: {
    top: 43,
    height: 14,
    width: 203,
    fontFamily: FontFamily.poppinsLight,
    fontWeight: "300",
    left: 100,
    color: Color.black,
    fontSize: FontSize.size_base,
    textAlign: "center",
    position: "absolute",
  },
  pkr1: {
    top: 17,
    height: 16,
    left: 280,
    fontSize: FontSize.size_lg,
    width: 67,
    color: Color.black,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
  },
  salonservice1: {
    top: 490,
  },
  salonserviceInner: {
    backgroundColor: Color.mistyrose_200,
    borderRadius: Border.br_xl,
    top: 0,
  },
  hairColor: {
    top: 16,
  },
  uniqueWithColor2: {
    top: 37,
  },
  pkr2: {
    width: 69,
    left: 280,
  },
  menhair23Icon: {
    top: 10,
    left: 9,
    height: 71,
    width: 96,
  },
  salonservice2: {
    top: 0,
  },
  salonserviceWrapper: {
    top: 590,
  },
  rectangleView: {
    backgroundColor: Color.mistyrose_200,
    borderRadius: Border.br_xl,
    top: 0,
  },
  hairColor1: {
    top: 25,
    width: 100,
  },
  pkr3: {
    left: 362,
    width: 69,
  },
  salonservice3: {
    top: 0,
  },
  menhair24Icon: {
    height: 59,
    width: 96,
    top: 16,
    left: 0,
  },
  salonserviceParent: {
    top: 700,
  },
  groupChild: {
    top: 1,
    left: 11,
    backgroundColor: Color.dodgerblue,
    width: 69,
  },
  book: {
    width: 89,
    fontSize: FontSize.size_lg,
    top: 0,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    color: Color.white,
    height: 24,
    left: 0,
    position: "absolute",
  },
  rectangleParent: {
    top: 767,
  },
  rectangleGroup: {
    top: 668,
  },
  rectangleContainer: {
    top: 573,
  },
  groupTouchableopacity: {
    top: 470,
  },
  frameView: {
    top: 0,
    left: 0,
  },
  customerserviceInner: {
    top: 182,
    left: 18,
  },
  komalShaikh: {
    height: "47.2%",
    width: "64.76%",
    top: "15.62%",
    left: "35.24%",
    fontSize: 22,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    position: "absolute",
  },
  beautifulWomanWearingSunglaIcon: {
    width: "32.54%",
    right: "66.89%",
    bottom: "0%",
    left: "0.57%",
    height: "100%",
    maxWidth: "100%",
    top: "0%",
    position: "absolute",
  },
  user: {
    height: "84.35%",
    width: "82.63%",
    right: "17.37%",
    bottom: "15.65%",
    left: "0%",
  },
  icon: {
    height: "100%",
    maxWidth: "100%",
    width: "100%",
  },
  vector: {
    left: "87.59%",
    right: "0%",
    bottom: "26.09%",
    width: "12.41%",
    height: "33.91%",
  },
  sukkurIbaUniversity: {
    height: "20.38%",
    width: "57.95%",
    left: "29.03%",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    color: Color.black,
  },
  groupIcon: {
    top: 6,
    width: 159,
    height: 40,
    left: 0,
    position: "absolute",
  },
  text1: {
    left: 151,
    color: Color.coral,
    textAlign: "left",
    width: 96,
    top: 0,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
    height: 28,
  },
  groupParent: {
    top: 69,
    left: 121,
    width: 247,
    height: 46,
    position: "absolute",
  },
  userParent: {
    height: "13.59%",
    width: "94.62%",
    top: "27.88%",
    right: "5.83%",
    bottom: "62.53%",
    left: "-0.45%",
    position: "absolute",
  },
  menhair25Icon: {
    width: 448,
    height: 197,
    top: 0,
    left: 0,
    position: "absolute",
  },
  mdiarrowLeftThinIcon1: {
    top: 11,
    width: 72,
    height: 47,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon: {
    height: "4.02%",
    width: "8.07%",
    top: "1.3%",
    right: "3.14%",
    bottom: "94.68%",
    left: "88.79%",
    position: "absolute",
  },
  customerserviceChild: {
    top: 158,
    left: 188,
    height: 20,
  },
  customerserviceItem: {
    top: 356,
    width: 441,
    height: 2,
    left: 0,
    position: "absolute",
  },
  services1: {
    left: 3,
  },
  reviews: {
    left: 142,
  },
  gallery: {
    left: 300,
  },
  lineIcon: {
    top: 354,
    width: 105,
    height: 4,
    left: 0,
    position: "absolute",
  },
  customerservice: {
    backgroundColor: Color.white,
    flex: 1,
    height: 846,
    overflow: "hidden",
    width: "100%",
  },
});

export default SalonServices;
