import * as React from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,

} from "react-native";
import { useRoute } from '@react-navigation/native';
//import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Border, FontSize, Color, FontFamily } from "../GlobalStyles";
import SalonServices from "./SalonServices";
import SalonHome from "./HairSalons";

const MenServices = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const Name = route.params?.Name;

  return (
    <View style={styles.menservices}>

      <View style={{
        padding: 10,
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#FADFDF",
        borderRadius: 10,
        alignItems: "center",
        top: 122,
        left: 14,
        height: 40,
      }}>
        <Ionicons name="search" size={20} color="black" style={{ left: 1 }}
        />
        <TextInput style={{ fontSize: 15, left: 5 }} placeholder="Search location or salon" />

      </View>


      <TouchableOpacity
        activeOpacity={0.2}
        onPress={() => { }}

      >
        <Image
          style={styles.image10Icon}
          contentFit="cover"
          source={require("../assets/image-12.jpg")}

        />
      </TouchableOpacity>
      <TouchableOpacity

      >
        <Image
          style={[styles.image11Icon, styles.iconLayout2]}
          contentFit="cover"
          source={require("../assets/image-11.jpg")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.image12}
        activeOpacity={0.1}
        onPress={() => navigation.navigate(SalonHome, { Name })}

      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-10.jpg")}
        />
      </TouchableOpacity>



      <Image
        style={[styles.image14Icon, styles.image15Position]}

        contentFit="cover"
        source={require("../assets/image-14.jpg")}
      />


      <Text style={[styles.haircut, styles.facialTypo]}>{`Trimming`}</Text>
      <Text style={[styles.head, styles.headTypo]}>{`Head
`}</Text>
      <Text style={[styles.massage, styles.headTypo]}>Massage</Text>
      <Text style={[styles.trimming, styles.headTypo]}>{`Hair Cut
`}</Text>
      <Text style={[styles.grooming, styles.facialTypo]}>Grooming</Text>
      <Text style={[styles.facial, styles.facialTypo]}>{`Facial
`}</Text>
      <TouchableOpacity
        style={[styles.image15, styles.image15Position]}
        activeOpacity={0.1}
        onPress={() => { }}
      >
        <Image
          style={[styles.icon1, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-15.jpg")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.image13}
        activeOpacity={0.1}
        onPress={() => { }}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-13.jpg")}
        />
      </TouchableOpacity>

      <View style={styles.menservicesChild} />
      <Text style={styles.men}>Men</Text>
      <TouchableOpacity
        style={styles.iconMenu}
        activeOpacity={0.1}
        onPress={() => navigation.navigate("SideBar2")}
      >
        <Image
          style={[styles.icon3, styles.iconLayout]}
          contentFit="cover"
        // source={require("../assets/-icon-menu.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.categories, styles.categoriesTypo]}>
        Categories:
      </Text>
      <Text style={[styles.topProSalons, styles.categoriesTypo]}>
        Top Pro Salons:
      </Text>
      <View style={styles.groupParent}>
        <View style={styles.groupChildPosition}>
          <Image
            style={[styles.groupItem, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-3.png")}
          />
          <Text style={styles.rehansSalonServices}>Rehan’s Salon Services</Text>
          <Image
            style={[styles.image3Icon, styles.image3IconPosition]}
            contentFit="cover"
            source={require("../assets/image-3.png")}
          />
        </View>
        <View style={styles.groupContainer}>
          <View style={{ flexDirection: 'row', top: -5, left: -8 }}>
            <Ionicons name="star-sharp" size={20} color="#FF7851" />
            <Ionicons name="star-sharp" size={20} color="#FF7851" />
            <Ionicons name="star-sharp" size={20} color="#FF7851" />
            <Ionicons name="star-sharp" size={20} color="#FF7851" />
            <Ionicons name="star-sharp" size={20} color="#FF7851" />
          </View>
          <Text style={[styles.text, styles.textTypo]}>5.0(100)</Text>
        </View>
        <Text style={styles.sukkurDelhiMuslim}>
          Sukkur, Delhi Muslim Society
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout2: {
    width: 110,
    left: 125,
    borderRadius: Border.br_base,
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  image15Position: {
    top: 420,
    position: "absolute",
  },
  facialTypo: {
    height: 26,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  headTypo: {
    top: 590,
    height: 26,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  groupChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  textTypo: {
    fontSize: FontSize.size_base,
    textAlign: "left",
    position: "absolute",
  },
  categoriesTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    color: Color.black,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  image3IconPosition: {
    top: 2,
    position: "absolute",
  },
  image10Icon: {
    top: 175,
    left: 7,
    width: 110,
    height: 155,
    borderRadius: Border.br_base,
    position: "absolute",
  },
  image11Icon: {
    top: 170,
    height: 155,
    position: "absolute",


  },
  icon: {
    borderRadius: 25,
  },

  image12: {
    left: 7,
    top: 420,
    width: 110,
    height: 155,
    position: "absolute",
  },
  image14Icon: {
    height: 165,
    width: 110,
    left: 125,
    borderRadius: 30,
  },
  haircut: {
    top: 370,
    left: 33,
    width: 78,
    height: 26,
    fontSize: FontSize.size_lg,
  },
  head: {
    left: 165,
    width: 56,
  },
  massage: {
    left: 280,
    width: 93,
  },
  trimming: {
    width: 107,
    left: 23,
  },
  grooming: {
    top: 370,
    left: 280,
    width: 98,
    height: 26,
    fontSize: FontSize.size_lg,
  },
  facial: {
    top: 370,
    left: 158,
    width: 78,
    height: 26,
    fontSize: FontSize.size_lg,
  },
  icon1: {
    borderRadius: 25,
  },
  image15: {
    left: 245,
    width: 110,
    height: 165,
  },
  image13: {
    left: 243,
    top: 210,
    width: 110,
    height: 160,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.mistyrose_100,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  vectorIcon: {
    height: "65.8%",
    width: "6.98%",
    top: "13.16%",
    right: "2.51%",
    bottom: "21.05%",
    left: "90.5%",
    position: "absolute",
  },
  searchLocationOr: {
    height: "63.16%",
    width: "62.57%",
    top: "18.42%",
    left: "7.82%",
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray_300,
  },
  rectangleParent: {
    height: "4.5%",
    width: "91.79%",
    top: "16.41%",
    right: "4%",
    bottom: "79.08%",
    left: "4.21%",
    position: "absolute",
  },
  menservicesChild: {
    top: -6,
    left: -2,
    backgroundColor: Color.coral,
    width: 428,
    height: 102,
    position: "absolute",
  },
  men: {
    top: 28,
    left: 111,
    color: Color.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 196,
    height: 46,
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  icon3: {
    height: "100%",
    width: "100%",
  },
  iconMenu: {
    left: "6.31%",
    top: "3.78%",
    right: "81.54%",
    bottom: "93.63%",
    width: "12.15%",
    height: "2.59%",
    position: "absolute",
  },
  categories: {
    top: 180,
    left: 9,
  },
  topProSalons: {
    top: 624,
    left: 7,
  },
  groupItem: {
    height: "109.87%",
    width: "26.18%",
    right: "74.88%",
    bottom: "-9.87%",
    left: "-1.06%",
    top: "0%",
    maxWidth: "100%",
    position: "absolute",
  },
  rehansSalonServices: {
    height: "56.76%",
    width: "72.5%",
    top: "2.47%",
    left: "27.5%",
    fontFamily: FontFamily.iBMPlexSansKRMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  image3Icon: {
    left: 8,
    borderRadius: Border.br_81xl,
    width: 75,
    height: 76,
  },
  groupInner: {
    left: 0,
    height: 20,
    width: 107,
  },
  text: {
    top: -2,
    left: 98,
    color: Color.coral,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
  },
  groupContainer: {
    top: 54,
    left: 100,
    width: 178,
    height: 24,
    position: "absolute",
  },
  sukkurDelhiMuslim: {
    height: "28.91%",
    width: "64.71%",
    top: "40.72%",
    left: "27.77%",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  groupParent: {
    height: "8.75%",
    width: "88.3%",
    top: "88.45%",
    right: "9.59%",
    bottom: "6.8%",
    left: "2.1%",
    position: "absolute",
  },
  menservices: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default MenServices;
