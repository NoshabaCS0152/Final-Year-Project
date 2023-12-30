import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  StatusBar,
  Modal,
} from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import SideBar from "./SideBar";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const MainScreen = ({ onClose }) => {
  const [
    beautifulWomanWearingSunglaImageVisible,
    setBeautifulWomanWearingSunglaImageVisible,
  ] = useState(false);
  const navigation = useNavigation();

  const openBeautifulWomanWearingSunglaImage = useCallback(() => {
    setBeautifulWomanWearingSunglaImageVisible(true);
  }, []);

  const closeBeautifulWomanWearingSunglaImage = useCallback(() => {
    setBeautifulWomanWearingSunglaImageVisible(false);
  }, []);

  return (
    <>
      <View style={[styles.mainScreen, styles.iconLayout4]}>
        <View style={[styles.user, styles.userPosition]}>
          <Image
            style={[styles.userChild, styles.userLayout]}
            resizeMode="cover"
            source={require("../assets/ellipse-1.png")}
          />
          <Image
            style={[styles.vectorIcon, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector.png")}
          />
          <Image
            style={[styles.userItem, styles.userLayout]}
            resizeMode="cover"
            source={require("../assets/ellipse-2.png")}
          />
          <Image
            style={[styles.vectorIcon1, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
          <Text style={[styles.komalShaikh, styles.komalShaikhClr]}>
            KOMAL SHAIKH
          </Text>
          <Text
            style={[styles.sukkurIbaUniversity, styles.exploreByServicesTypo]}
          >
            65200, Sukkur IBA University
          </Text>
          <Pressable
            style={styles.beautifulWomanWearingSungla}
            onPress={openBeautifulWomanWearingSunglaImage}
          >
            <Image
              style={[styles.icon, styles.iconLayout4]}
              resizeMode="cover"
              source={require("../assets/beautifulwomanwearingsunglassesavatarcharactericonfreevector-1.png")}
            />
          </Pressable>
        </View>
        <Text style={[styles.exclusiveOffers, styles.viewAll1Typo]}>
          Exclusive Offers
        </Text>
        <Text style={styles.mostRatedSalons}>Upcoming Appointments</Text>
        <Pressable
          style={styles.viewAll}
          onPress={() => navigation.navigate("AppointmentScreen")}
        >
          <Text style={[styles.viewAll1, styles.viewAll1Typo]}>view all</Text>
        </Pressable>
        <Text style={styles.hairAndBeauty}>
          Hair and beauty services Nearby
        </Text>
        <Text style={[styles.exploreByServices, styles.exclusiveOffersTypo]}>
          Explore by Services
        </Text>
        <StatusBar barStyle="default" />
        <View style={styles.rectangleParent}>
          <View style={[styles.groupChild, styles.groupShadowBox]} />
          <Image
            style={styles.imageRemovebgPreview1Icon}
            resizeMode="cover"
            source={require("../assets/imageremovebgpreview-1.png")}
          />
          <View style={styles.groupItem} />
          <Text style={[styles.ext22BeaContainer, styles.ellipseParentLayout]}>
            <Text style={styles.ext22Typo}>{`EXT 22%         BEA
RA `}</Text>
            <Text style={styles.offOn}>OFF ON</Text>
            <Text style={styles.ext22Typo}> RD</Text>
          </Text>
          <Text style={[styles.useCodeCom201, styles.ext22Typo]}>
            Use code: COM201
          </Text>
        </View>
        <View style={styles.rectangleGroup}>
          <View style={[styles.groupInner, styles.inputLayout]} />
          <Text style={[styles.maneSat16Container, styles.maneTypo]}>
            <Text style={styles.ext22Typo}>{`Mane
`}</Text>
            <Text style={styles.offOn}>Sat 16,</Text>
          </Text>
          <Image
            style={[styles.download12, styles.downloadLayout]}
            resizeMode="cover"
            source={require("../assets/download-1-2.png")}
          />
        </View>
        <View style={[styles.rectangleContainer, styles.userPosition]}>
          <View style={[styles.rectangleView, styles.inputLayout]} />
          <Image
            style={[styles.download11, styles.downloadLayout]}
            resizeMode="cover"
            source={require("../assets/download-1-11.png")}
          />
          <Text
            style={[styles.maneBeautylocks, styles.maneBeautylocksPosition]}
          >
            Mane Beautylocks
          </Text>
          <Text
            style={[styles.sat16thuContainer, styles.maneBeautylocksPosition]}
          >
            <Text
              style={[styles.sat16thu, styles.maneTypo]}
            >{`Sat 16,thu  `}</Text>
            <Text style={styles.text}>
              <Text style={styles.ext22Typo}>.</Text>
            </Text>
            <Text style={styles.offOn}>
              <Text style={styles.text}>{` `}</Text>
              <Text style={styles.maneTypo}> 5:00 pm</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.ellipseParent, styles.ellipseParentLayout]}>
          <Image
            style={styles.ellipseIcon}
            resizeMode="cover"
            source={require("../assets/ellipse-3.png")}
          />
          <Text style={[styles.hairCut, styles.beardTypo]}>Hair cut</Text>
          <Image
            style={[styles.image1Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/image-1.png")}
          />
        </View>
        <View style={styles.ellipseGroup}>
          <Image
            style={[styles.groupChild1, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-8.png")}
          />
          <Image
            style={[styles.image5Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/image-1.png")}
          />
        </View>
        <View style={styles.ellipseContainer}>
          <Image
            style={[styles.groupChild2, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-5.png")}
          />
          <Text style={[styles.beard, styles.beardTypo]}>Beard</Text>
          <Image
            style={[styles.image2Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/image-2.png")}
          />
        </View>
        <View style={[styles.groupView, styles.groupViewPosition]}>
          <Image
            style={[styles.groupChild1, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-9.png")}
          />
          <Image
            style={[styles.image6Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/image-2.png")}
          />
        </View>
        <View style={styles.ellipseParent1}>
          <Image
            style={[styles.groupChild4, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-4.png")}
          />
          <Text style={[styles.facial, styles.facialTypo]}>Facial</Text>
          <Image
            style={[styles.image3Icon, styles.iconParentLayout]}
            resizeMode="cover"
            source={require("../assets/image-3.png")}
          />
        </View>
        <View style={[styles.ellipseParent2, styles.iconParentLayout]}>
          <Image
            style={[styles.groupChild1, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-8.png")}
          />
          <Image
            style={[styles.image7Icon, styles.iconParentLayout]}
            resizeMode="cover"
            source={require("../assets/image-3.png")}
          />
        </View>
        <View style={styles.ellipseParent3}>
          <Image
            style={[styles.groupChild6, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-6.png")}
          />
          <Text style={[styles.hairColor, styles.facialTypo]}>Hair color</Text>
          <Image
            style={[styles.image4Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/image-4.png")}
          />
        </View>
        <View style={[styles.ellipseParent4, styles.iconParentLayout]}>
          <Image
            style={[styles.groupChild1, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/ellipse-8.png")}
          />
          <Image
            style={[styles.image8Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/image-4.png")}
          />
        </View>
        <Text style={[styles.her, styles.herTypo]}>Her</Text>
        <Text style={[styles.him, styles.herTypo]}>Him</Text>
        <RNPTextInput
          style={[styles.input, styles.inputLayout]}
          placeholder="Enter your full Name"
          label="Label"
          mode="outlined"
          placeholderTextColor="rgba(0, 0, 0, 0.81)"
          outlineColor="#dcdedf"
          activeOutlineColor="#7f7f7f"
          theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
        />
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={beautifulWomanWearingSunglaImageVisible}
      >
        <View style={styles.beautifulWomanWearingSunglaImageOverlay}>
          <Pressable
            style={styles.beautifulWomanWearingSunglaImageBg}
            onPress={closeBeautifulWomanWearingSunglaImage}
          />
          <SideBar onClose={closeBeautifulWomanWearingSunglaImage} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout4: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  userPosition: {
    left: "2.57%",
    position: "absolute",
  },
  userLayout: {
    bottom: "25.32%",
    top: "17.05%",
    width: "11.25%",
    height: "57.63%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vectorIconLayout: {
    bottom: "41.47%",
    top: "22.77%",
    width: "6.11%",
    height: "35.76%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  komalShaikhClr: {
    color: Color.black,
    position: "absolute",
  },
  exploreByServicesTypo: {
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    textAlign: "left",
  },
  viewAll1Typo: {
    fontFamily: FontFamily.iBMPlexSansKRSemibold,
    fontWeight: "600",
    textAlign: "left",
  },
  exclusiveOffersTypo: {
    fontSize: FontSize.size_xl,
    color: Color.black,
    position: "absolute",
  },
  groupShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    height: "100%",
    bottom: "0%",
    top: "0%",
  },
  ellipseParentLayout: {
    height: 81,
    position: "absolute",
  },
  ext22Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  inputLayout: {
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  maneTypo: {
    fontSize: FontSize.size_mini,
    color: Color.black,
  },
  downloadLayout: {
    height: 49,
    borderRadius: Border.br_mini,
    position: "absolute",
  },
  maneBeautylocksPosition: {
    left: 91,
    textAlign: "left",
    position: "absolute",
  },
  beardTypo: {
    fontFamily: FontFamily.iBMPlexSansKRRegular,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  iconLayout1: {
    height: 61,
    width: 66,
    borderRadius: Border.br_81xl,
    position: "absolute",
  },
  groupChildPosition: {
    left: "-5.25%",
    right: "-5.25%",
    width: "110.49%",
    position: "absolute",
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupViewPosition: {
    bottom: 20,
    width: "17.81%",
  },
  facialTypo: {
    top: 77,
    fontFamily: FontFamily.iBMPlexSansKRRegular,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  iconParentLayout: {
    height: 66,
    position: "absolute",
  },
  iconLayout: {
    height: 63,
    width: 62,
    borderRadius: Border.br_81xl,
    position: "absolute",
  },
  herTypo: {
    height: 36,
    width: 62,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_lg,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  userChild: {
    right: "-1.02%",
    left: "89.77%",
  },
  vectorIcon: {
    right: "1.43%",
    left: "92.46%",
  },
  userItem: {
    right: "9.59%",
    left: "79.15%",
  },
  vectorIcon1: {
    right: "12.04%",
    left: "81.85%",
  },
  komalShaikh: {
    height: "47.2%",
    width: "44.69%",
    top: "15.62%",
    left: "24.31%",
    fontSize: 22,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
  },
  sukkurIbaUniversity: {
    height: "30.43%",
    width: "57.37%",
    top: "63.77%",
    left: "24.39%",
    fontSize: 14,
    color: Color.black,
    position: "absolute",
  },
  beautifulWomanWearingSunglaImageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  beautifulWomanWearingSunglaImageBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  beautifulWomanWearingSungla: {
    right: "77.55%",
    width: "22.45%",
    height: "100%",
    bottom: "0%",
    top: "0%",
    left: "0%",
    position: "absolute",
  },
  user: {
    height: "8.28%",
    width: "91.81%",
    top: "8.94%",
    right: "5.62%",
    bottom: "82.78%",
  },
  exclusiveOffers: {
    height: "4.27%",
    width: "58.46%",
    top: "25.98%",
    left: "7.24%",
    fontSize: FontSize.size_xl,
    color: Color.black,
    position: "absolute",
  },
  mostRatedSalons: {
    height: "3.84%",
    width: "69.47%",
    top: "48.15%",
    fontSize: FontSize.size_lg,
    left: "4.44%",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  viewAll1: {
    height: "3.08%",
    width: "15.64%",
    fontSize: 17,
    color: "rgba(0, 0, 0, 0.62)",
  },
  viewAll: {
    left: "75.93%",
    top: "48.51%",
    position: "absolute",
  },
  hairAndBeauty: {
    height: "3.56%",
    width: "83.88%",
    top: "61.02%",
    left: "4.44%",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  exploreByServices: {
    height: "3.6%",
    width: "49.62%",
    top: "75.21%",
    left: "5.37%",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    textAlign: "left",
  },
  groupChild: {
    width: "95.13%",
    right: "4.87%",
    borderRadius: Border.br_mini,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    left: "0%",
    position: "absolute",
  },
  imageRemovebgPreview1Icon: {
    left: 184,
    width: 229,
    height: 129,
    top: 8,
    position: "absolute",
  },
  groupItem: {
    top: 97,
    left: 11,
    borderRadius: 5,
    backgroundColor: "#e14203",
    width: 163,
    height: 25,
    position: "absolute",
  },
  offOn: {
    fontFamily: FontFamily.poppinsRegular,
  },
  ext22BeaContainer: {
    left: 12,
    fontSize: 26,
    color: "#926842",
    width: 210,
    top: 8,
    textAlign: "left",
  },
  useCodeCom201: {
    top: 98,
    left: 20,
    fontSize: 16,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent: {
    height: "15.76%",
    width: "96.5%",
    top: "30.31%",
    bottom: "53.93%",
    left: "3.5%",
    right: "0%",
    position: "absolute",
  },
  groupInner: {
    width: "51.8%",
    right: "46.05%",
    left: "2.15%",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    height: "100%",
    bottom: "0%",
    top: "0%",
  },
  maneSat16Container: {
    left: 69,
    width: 177,
    top: 11,
    textAlign: "left",
    position: "absolute",
  },
  download12: {
    width: 63,
    left: 0,
    top: 6,
  },
  rectangleGroup: {
    height: "7.2%",
    width: "57.48%",
    top: "53.16%",
    right: "-29.67%",
    bottom: "39.64%",
    left: "72.2%",
    position: "absolute",
  },
  rectangleView: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    height: "100%",
    bottom: "0%",
    top: "0%",
    right: "0%",
    width: "100%",
    left: "0%",
    borderRadius: Border.br_3xs,
  },
  download11: {
    top: 15,
    left: 6,
    width: 71,
  },
  maneBeautylocks: {
    fontSize: FontSize.size_mini,
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    top: 8,
  },
  sat16thu: {
    fontFamily: FontFamily.poppinsRegular,
  },
  text: {
    fontSize: FontSize.size_17xl,
    color: Color.orangered_100,
  },
  sat16thuContainer: {
    top: 10,
    width: 172,
    height: 42,
  },
  rectangleContainer: {
    height: "7.23%",
    width: "64.87%",
    top: "52.21%",
    right: "32.56%",
    bottom: "40.57%",
  },
  ellipseIcon: {
    width: "110.42%",
    right: "-5.24%",
    bottom: 8,
    left: "-5.18%",
    height: 73,
    position: "absolute",
    maxWidth: "100%",
    overflow: "hidden",
  },
  hairCut: {
    top: 58,
    left: 10,
  },
  image1Icon: {
    top: 2,
    left: 0,
  },
  ellipseParent: {
    width: "17.82%",
    right: "78.21%",
    bottom: 93,
    left: "3.97%",
  },
  groupChild1: {
    bottom: -8,
    height: 73,
  },
  image5Icon: {
    top: 1,
    left: 5,
  },
  ellipseGroup: {
    right: "53.92%",
    bottom: 22,
    left: "28.27%",
    height: 65,
    width: "17.81%",
    position: "absolute",
  },
  groupChild2: {
    height: "83.24%",
    bottom: "16.76%",
    top: "0%",
    left: "-5.25%",
    right: "-5.25%",
    width: "110.49%",
    maxHeight: "100%",
  },
  beard: {
    top: 73,
    left: 17,
  },
  image2Icon: {
    left: 7,
    top: 6,
  },
  ellipseContainer: {
    height: "10.41%",
    top: "79%",
    right: "52.98%",
    bottom: "10.58%",
    left: "29.21%",
    width: "17.81%",
    position: "absolute",
  },
  image6Icon: {
    left: 9,
    top: 0,
  },
  groupView: {
    right: "29.96%",
    left: "52.23%",
    height: 67,
    position: "absolute",
  },
  groupChild4: {
    height: "80%",
    bottom: "20%",
    top: "0%",
    left: "-5.25%",
    right: "-5.25%",
    width: "110.49%",
    maxHeight: "100%",
  },
  facial: {
    left: 16,
  },
  image3Icon: {
    left: 2,
    width: 66,
    borderRadius: Border.br_81xl,
    height: 66,
    top: 11,
  },
  ellipseParent1: {
    height: "10.83%",
    top: "79.12%",
    right: "30.19%",
    bottom: "10.04%",
    left: "52%",
    width: "17.81%",
    position: "absolute",
  },
  image7Icon: {
    left: 4,
    top: 0,
    width: 66,
    borderRadius: Border.br_81xl,
    height: 66,
  },
  ellipseParent2: {
    right: "7.42%",
    bottom: 15,
    left: "74.77%",
    width: "17.81%",
  },
  groupChild6: {
    height: "80.42%",
    bottom: "19.58%",
    top: "0%",
    left: "-5.25%",
    right: "-5.25%",
    width: "110.49%",
    maxHeight: "100%",
  },
  hairColor: {
    left: 5,
  },
  image4Icon: {
    top: 9,
    left: 0,
  },
  ellipseParent3: {
    height: "10.78%",
    top: "79.72%",
    right: "5.55%",
    bottom: "9.5%",
    left: "76.64%",
    width: "17.81%",
    position: "absolute",
  },
  image8Icon: {
    top: 0,
    left: 5,
  },
  ellipseParent4: {
    right: "78.92%",
    left: "3.27%",
    bottom: 20,
    width: "17.81%",
  },
  her: {
    top: 613,
    left: 26,
  },
  him: {
    top: 615,
    left: 106,
  },
  input: {
    top: 175,
    left: 30,
    width: 378,
    height: 50,
  },
  mainScreen: {
    backgroundColor: Color.white,
    width: 428,
    height: 926,
  },
});

export default MainScreen;
