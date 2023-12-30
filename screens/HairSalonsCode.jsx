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
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../components/Dashboard";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import SalonServices from "./SalonServices";
import { useRoute } from "@react-navigation/native";

const HairSalons = () => {
    const [textVisible, setTextVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const Name = route.params?.Name;

    const openText = useCallback(() => {
        setTextVisible(true);
    }, []);

    const closeText = useCallback(() => {
        setTextVisible(false);
    }, []);

    return (
        <>
            <View style={styles.customerservice}>



                {/* <View
          style={{
            padding: 10,
            flexDirection: "row",
            width: "90%",
            backgroundColor: "#FADFDF",
            borderRadius: 10,
            alignItems: "center",
            top: 90,
            left: 14,
            height: 40,
          }}
        >
          <Ionicons name="search" size={20} color="black" style={{ left: 1 }} />
          <TextInput
            style={{ fontSize: 15, left: 5 }}
            placeholder="Hair Cut Sukkur"
          />
        </View>

        <Image style={styles.mdiarrowLeftThinIcon} contentFit="cover" />
        <Text style={[styles.services, styles.textFlexBox]}>Services</Text>
        <Pressable style={styles.pressable} onPress={openText}>
          <Text style={[styles.text, styles.textTypo]}>{`<`}</Text>
        </Pressable>

        <Text style={styles.bestHairCut}>Best hair cut Salons in Sukkur:</Text>

        <View style={[styles.salonserviceParent, styles.salonserviceLayout]}>
          <View style={[styles.salonservice, styles.salonservicePosition]}>
            <View
              style={[styles.salonserviceChild, styles.salonservicePosition]}
            />
            <Text style={[styles.hairCutSalon, styles.hairCutSalonPosition]}>
              HAIR CUT Salon
            </Text>
            <Image
              style={[styles.menhair2Icon, styles.menhair2IconPosition]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
            <Text style={[styles.uniqueWithColor, styles.hairCutSalonPosition]}>
              Unique with color and cut
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", top: 70, left: 110 }}>
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Text style={{ color: "#FF7851", left: 5 }}>5.0(100)</Text>
            </View>
          </View>

          <View style={styles.groupParent}>
            <Image style={styles.groupItem} contentFit="cover" />
          </View>

          <View style={styles.hair1Parent}>
            <Image
              style={[styles.hair1Icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/girl-1.png")}
            />
            <Image
              style={[styles.hair2Icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/girl-1.png")}
            />
            <Image
              style={[styles.menhair3Icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
            <Image
              style={[styles.menhair4Icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
          </View>
          <TouchableOpacity
            style={[styles.rectangleGroup, styles.groupLayout]}
            activeOpacity={0.1}
            onPress={() => navigation.navigate(SalonServices, { Name })}
          >
            <View style={[styles.groupInner, styles.groupInnerBg]} />
            <Text style={[styles.seeAllServices, styles.homeTypo]}>
              See All Services
            </Text>
          </TouchableOpacity>
          <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <Text style={[styles.startFrom500pkr, styles.homeTypo]}>
              Start From 500PKR
            </Text>
          </View>
        </View>

        <View style={[styles.salonserviceGroup, styles.salonserviceLayout]}>
          <View style={[styles.salonservice, styles.salonservicePosition]}>
            <View
              style={[styles.salonserviceChild, styles.salonservicePosition]}
            />
            <Text style={[styles.hairCutSalon, styles.hairCutSalonPosition]}>
              Noshaba’s Salon
            </Text>
            <Image
              style={[styles.menhair2Icon, styles.menhair2IconPosition]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
            <Text style={[styles.uniqueWithColor, styles.hairCutSalonPosition]}>
              Unique with color and cut
            </Text>
          </View>

          <View>
            <View style={{ flexDirection: "row", top: 70, left: 110 }}>
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Ionicons name="star-sharp" size={20} color="#FF7851" />
              <Text style={{ color: "#FF7851", left: 5 }}>5.0(100)</Text>
            </View>
          </View>
          <View style={styles.groupParent}>
            <Image style={styles.groupItem} contentFit="cover" />
          </View>
          <View style={styles.hair1Parent}>
            <Image
              style={[styles.hair1Icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/girl-1.png")}
            />
            <Image
              style={[styles.hair2Icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/girl-1.png")}
            />
            <Image
              style={[styles.menhair3Icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
            <Image
              style={[styles.menhair4Icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/menhair-11.jpeg")}
            />
          </View>
          <TouchableOpacity
            style={[styles.rectangleGroup, styles.groupLayout]}
            activeOpacity={0.1}
            onPress={() => navigation.navigate(SalonServices, { Name })}
          >
            <View style={[styles.groupInner, styles.groupInnerBg]} />
            <Text style={[styles.seeAllServices, styles.homeTypo]}>
              See All Services
            </Text>
          </TouchableOpacity>
          <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <Text style={[styles.startFrom500pkr, styles.homeTypo]}>
              Start From 300PKR
            </Text>
          </View> 
        </View>

        <View style={[styles.customerserviceChild, styles.groupInnerBg]} />
        <TouchableOpacity
          style={styles.iconMenu}
          activeOpacity={0.1}
          onPress={() => navigation.navigate("SideBar2")}
        >
          <Image style={[styles.icon, styles.iconLayout2]} contentFit="cover" />
        </TouchableOpacity>
        <Text style={[styles.home, styles.homeTypo]}>Home</Text>
*/}
            </View >

        </>
    );
};

const styles = StyleSheet.create({
    customerservice: {
        flex: 1,
        height: 846,
        overflow: "hidden",
        width: "100%",
        backgroundColor: Color.white,
    },
    // groupContainer: {
    //   top: 54,
    //   left: 100,
    //   width: 178,
    //   height: 24,
    //   position: "absolute",
    // },
    // textFlexBox: {
    //   textAlign: "center",
    //   color: Color.white,
    // },
    // textTypo: {
    //   fontFamily: FontFamily.poppinsMedium,
    //   fontWeight: "500",
    // },
    // iconLayout3: {
    //   height: "100%",
    //   width: "100%",
    // },
    // iconLayout2: {
    //   maxHeight: "100%",
    //   maxWidth: "100%",
    //   overflow: "hidden",
    // },
    // salonserviceLayout: {
    //   height: 273,
    //   width: 370,
    //   borderRadius: 40,
    //   backgroundColor: "#FADFDF",
    // },
    // salonservicePosition: {
    //   top: 0,
    //   position: "absolute",
    // },
    // hairCutSalonPosition: {
    //   left: 72,
    //   color: Color.black,
    //   fontSize: FontSize.size_base,
    //   textAlign: "center",
    //   position: "absolute",
    // },
    // menhair2IconPosition: {
    //   left: 14,
    //   position: "absolute",
    // },
    // iconLayout1: {
    //   width: 78,
    //   height: 90,
    //   top: 0,
    //   position: "absolute",
    // },
    // iconLayout: {
    //   width: 69,
    //   height: 90,
    //   top: 0,
    //   position: "absolute",
    // },
    // groupLayout: {
    //   //borderRadius: 40,
    //   height: 58,
    //   width: 196,
    // },
    // groupInnerBg: {
    //   backgroundColor: Color.coral,
    //   position: "absolute",
    // },
    // homeTypo: {
    //   fontSize: FontSize.size_xl,
    //   textAlign: "left",
    //   position: "absolute",
    // },
    // rectangleLayout: {
    //   width: 180,
    //   height: 48,
    //   position: "absolute",
    // },
    // mdiarrowLeftThinIcon: {
    //   top: 288,
    //   width: 24,
    //   height: 24,
    //   left: 0,
    //   position: "absolute",
    //   overflow: "hidden",
    // },
    // services: {
    //   top: 34,
    //   left: 108,
    //   fontWeight: "700",
    //   fontFamily: FontFamily.poppinsBold,
    //   width: 204,
    //   height: 48,
    //   fontSize: FontSize.size_5xl,
    //   position: "absolute",
    // },
    // textOverlay: {
    //   flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center",
    //   backgroundColor: "rgba(113, 113, 113, 0.3)",
    // },
    // textBg: {
    //   position: "absolute",
    //   width: "100%",
    //   height: "100%",
    //   left: 0,
    //   top: 0,
    // },
    // text: {
    //   fontSize: FontSize.size_29xl,
    //   width: 42,
    //   height: 56,
    //   textAlign: "center",
    //   color: Color.white,
    // },
    // pressable: {
    //   top: 20,
    //   left: 22,
    //   position: "absolute",
    // },
    // groupChild: {
    //   top: "0%",
    //   right: "0%",
    //   bottom: "0%",
    //   left: "0%",
    //   borderRadius: Border.br_3xs,
    //   backgroundColor: Color.mistyrose_100,
    //   shadowColor: "rgba(0, 0, 0, 0.25)",
    //   shadowOffset: {
    //     width: 0,
    //     height: 4,
    //   },
    //   shadowRadius: 4,
    //   elevation: 4,
    //   shadowOpacity: 1,
    //   position: "absolute",
    // },
    // hairCutSukkkur: {
    //   height: "45.89%",
    //   width: "61.32%",
    //   top: "33.33%",
    //   left: "7.2%",
    //   color: Color.gray_300,
    //   textAlign: "left",
    //   fontFamily: FontFamily.poppinsRegular,
    //   fontSize: FontSize.size_base,
    //   position: "absolute",
    // },
    // vectorIcon: {
    //   height: "47.81%",
    //   width: "6.84%",
    //   top: "26.32%",
    //   right: "5.32%",
    //   bottom: "25.88%",
    //   left: "87.84%",
    //   position: "absolute",
    // },
    // rectangleParent: {
    //   height: "6.74%",
    //   width: "93.95%",
    //   top: "8.98%",
    //   right: "3.59%",
    //   bottom: "84.28%",
    //   left: "2.47%",
    //   position: "absolute",
    // },
    // bestHairCut: {
    //   top: 141,
    //   left: 113,
    //   color: Color.black,
    //   textAlign: "left",
    //   fontSize: FontSize.size_base,
    //   fontFamily: FontFamily.poppinsMedium,
    //   fontWeight: "500",
    //   position: "absolute",
    // },
    // salonserviceChild: {
    //   borderRadius: 40,
    //   backgroundColor: Color.mistyrose_200,
    //   height: 273,
    //   width: 436,
    //   left: 0,
    // },
    // hairCutSalon: {
    //   top: 29,
    //   width: 138,
    //   height: 57,
    //   fontFamily: FontFamily.poppinsMedium,
    //   fontWeight: "500",
    // },
    // menhair2Icon: {
    //   top: 18,
    //   borderRadius: 40,
    //   width: 70,
    //   height: 89,
    // },
    // uniqueWithColor: {
    //   top: 50,
    //   fontWeight: "300",
    //   fontFamily: FontFamily.poppinsLight,
    //   width: 203,
    //   height: 42,
    // },
    // salonservice: {
    //   height: 273,
    //   width: 436,
    //   left: 10,
    // },
    // groupItem: {
    //   top: 5,
    //   width: 149,
    //   height: 30,
    //   left: 0,
    //   position: "absolute",
    // },
    // text1: {
    //   left: 142,
    //   color: Color.coral,
    //   width: 91,
    //   height: 21,
    //   textAlign: "left",
    //   fontFamily: FontFamily.poppinsMedium,
    //   fontWeight: "500",
    //   fontSize: FontSize.size_5xl,
    // },
    // groupParent: {
    //   top: 81,
    //   left: 77,
    //   width: 233,
    //   height: 35,
    //   position: "absolute",
    // },
    // hair1Icon: {
    //   left: 0,
    // },
    // hair2Icon: {
    //   left: 89,
    // },
    // menhair3Icon: {
    //   left: 175,
    // },
    // menhair4Icon: {
    //   left: 255,
    // },
    // hair1Parent: {
    //   top: 116,
    //   width: 343,
    //   height: 90,
    //   left: 20,
    //   position: "absolute",
    // },
    // groupInner: {
    //   borderRadius: 40,
    //   top: 0,
    //   left: 0,
    //   height: 48,
    //   width: 156,
    // },
    // seeAllServices: {
    //   left: 20,
    //   top: 14,
    //   fontSize: FontSize.size_xl,
    //   fontFamily: FontFamily.poppinsRegular,
    //   color: Color.white,
    // },
    // rectangleGroup: {
    //   //borderRadius: 50,
    //   top: 215,
    //   left: 14,
    //   position: "absolute",
    // },
    // rectangleView: {
    //   borderRadius: 40,
    //   top: 7,
    //   left: -40,
    //   backgroundColor: Color.white,
    //   width: 26,
    // },
    // startFrom500pkr: {
    //   left: -12,
    //   width: 195,
    //   top: 17,
    //   fontSize: FontSize.size_xl,
    //   fontFamily: FontFamily.poppinsRegular,
    //   color: Color.black,
    // },
    // rectangleContainer: {
    //   top: 208,
    //   left: 220,
    // },
    // salonserviceParent: {
    //   top: 180,
    //   left: -5,
    //   position: "absolute",
    // },
    // salonserviceGroup: {
    //   top: 460,
    //   left: 4,
    //   position: "absolute",
    // },
    // customerserviceChild: {
    //   top: -2,
    //   left: -1,
    //   width: 447,
    //   height: 70,
    // },
    // icon: {
    //   height: "100%",
    //   width: "100%",
    // },
    // iconMenu: {
    //   left: "1.57%",
    //   top: "2.36%",
    //   right: "86.77%",
    //   bottom: "94.8%",
    //   width: "11.66%",
    //   height: "2.84%",
    //   position: "absolute",
    // },
    // home: {
    //   left: 187,
    //   fontFamily: FontFamily.poppinsMedium,
    //   fontWeight: "500",
    //   top: 20,
    //   color: Color.white,
    // },

});

export default HairSalons;
