import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image, TextInput,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const WomenServices = () => {
  const navigation = useNavigation();

  return (


    <View style={styles.womenservices}>
      <Text style={[styles.nailExtension, styles.textFlexBox]}>
        Nail Extension
      </Text>
      <Text style={[styles.hairStyling, styles.facialTypo]}>Hair Styling</Text>
      <Text style={[styles.facial, styles.facialTypo]}>{`Facial
`}</Text>
      <Text style={[styles.partyMakeup, styles.facialTypo]}>Party Makeup</Text>
      <Text style={[styles.bridal, styles.facialTypo]}>Bridal</Text>
      <Text style={[styles.haircut, styles.facialTypo]}>{`Haircut
`}</Text>

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
    <Ionicons name="search" size={20} color="black" style={{left:1}}
    />
     <TextInput style={{fontSize:15, left: 5}} placeholder="Search location or salon"/>
    
      
      </View>

      <TouchableOpacity
        style={[styles.image16, styles.imageLayout]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-16.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.image17}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-17.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.image19, styles.imagePosition1]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-19.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.image18, styles.imagePosition]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-18.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.image20, styles.imagePosition1]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-20.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.image21, styles.imagePosition]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/image-21.png")}
        />
      </TouchableOpacity>
   
        
  
        
      
      <View style={[styles.womenservicesChild, styles.groupInnerPosition]} />
      <Text style={styles.women}>Women</Text>
      
      <TouchableOpacity
        style={styles.iconMenu}
        activeOpacity={0.1}
        onPress={() => navigation.navigate("SideBar2")}
      >
       
        <Image
       //   style={[styles.icon6, styles.iconLayout]}
         // contentFit="cover"
         // source={require("../assets/-icon-menu.png")}
        /> 
      </TouchableOpacity>
     
      <Text style={[styles.categories, styles.categoriesTypo]}>
        Categories:
      </Text>
      <Text style={[styles.topProSalons, styles.categoriesTypo]}>
        Top Pro Salons:
      </Text>
      <View style={[styles.groupParent, styles.groupParentPosition]}>
        <View style={[styles.ellipseParent, styles.groupParentPosition]}>
          <Image
            style={[styles.groupItem, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-5.png")}
          />
          <Text style={styles.mariasSalonServices}>Maria’s Salon Services</Text>
          <Image
            style={[styles.image1Icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/image-22.png")}
          />
        </View>
        <View style={styles.groupContainer}>
          <View style={{flexDirection: 'row', top: -5, left: -8}}>
        <Ionicons name="star-sharp" size={20} color="#FF7851"  />
        <Ionicons name="star-sharp" size={20} color="#FF7851"  />
        <Ionicons name="star-sharp" size={20} color="#FF7851"  />
        <Ionicons name="star-sharp" size={20} color="#FF7851"  />
        <Ionicons name="star-sharp" size={20} color="#FF7851"  />
        </View>
          <Text style={[styles.text, styles.textFlexBox]}>5.0(100)</Text>
        </View>
        <Text style={[styles.sukkurDelhiMuslim, styles.textFlexBox]}>
          Sukkur, Delhi Muslim Society
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starIcon:{
    marginTop: 680, 
    left: 0
    

  },
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  facialTypo: {
    height: 26,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  imageLayout: {
    width: 110,
    left: 5,
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  imagePosition1: {
    height: 155,
    top: 420,
    position: "absolute",
  },
  imagePosition: {
    left: 245,
    position: "absolute",
  },
  groupParentPosition: {
    left: "0%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupInnerPosition: {
    left: 0,
    position: "absolute",
  },
  categoriesTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    textAlign: "center",
    color: Color.black,
    position: "absolute",
  },
  nailExtension: {
    height: 35,
    width: 139,
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    left: 18,
    top: 380,
  },
  hairStyling: {
    left: 17,
    top: 590,
    height: 26,
    width: 139,
  },
  facial: {
    top: 590,
    left: 160,
    width: 56,
  },
  partyMakeup: {
    left: 250,
    width: 138,
    top: 590,
    height: 26,
  },
  bridal: {
    left: 280,
    width: 98,
    //height: 90,
    top: 380,
  },
  haircut: {
    left: 156,
    width: 78,
    top: 380,
  },
  icon: {
    borderRadius: 10,
  },
  image16: {
    top: 210,
    height: 155,
    position: "absolute",
  },
  image17: {
    left: 125,
    top: 210,
    width: 100,
    height: 162,
    position: "absolute",
  },
  image19: {
    width: 110,
    left: 7,
    //top: 170,
  },
  image18: {
    top: 210,
    //left: 10,
    width: 100,
    height: 155,
  },
  image20: {
    left: 125,
    width: 100,
  },
  image21: {
    top: 420,
    width: 100,
    height: 155,
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
    bottom: "0%",
    right: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
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
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  rectangleParent: {
    height: "4.5%",
    width: "91.79%",
    top: "17.28%",
    right: "5.4%",
    bottom: "78.22%",
    left: "2.8%",
    position: "absolute",
  },
  womenservicesChild: {
    backgroundColor: Color.coral,
    width: 428,
    height: 102,
    top: 0,
  },
  women: {
    top: 28,
    left: 103,
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
  icon6: {
    height: "100%",
    width: "100%",
  },
  iconMenu: {
    left: "5.14%",
    top: "5.08%",
    right: "82.71%",
    bottom: "92.33%",
    width: "12.15%",
    height: "2.59%",
    position: "absolute",
  },
  categories: {
    top: 180,
    left: 12,
  },
  topProSalons: {
    top: 620,
    left: 6,
  },
  groupItem: {
    height: "109.87%",
    width: "25.13%",
    right: "74.87%",
    bottom: "-9.87%",
    left: "0%",
    position: "absolute",
    top: "0%",
    maxWidth: "100%",
  },
  mariasSalonServices: {
    height: "56.76%",
    width: "72.49%",
    top: "2.47%",
    left: "27.51%",
    fontFamily: FontFamily.iBMPlexSansKRMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  image1Icon: {
    height: "93.85%",
    width: "20.83%",
    top: "3.08%",
    right: "79.17%",
    bottom: "3.08%",
    borderRadius: Border.br_81xl,
    left: "0%",
    position: "absolute",
  },
  ellipseParent: {
    bottom: "0%",
    right: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  groupInner: {
    top: 2,
    width: 107,
    height: 20,
  },
  text: {
    left: 98,
    color: Color.coral,
    top: -2,
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
    width: "64.7%",
    top: "40.72%",
    left: "27.78%",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.black,
    textAlign: "left",
  },
  groupParent: {
    height: "8.75%",
    width: "88.32%",
    top: "88.37%",
    right: "11.68%",
    bottom: "7.88%",
  },
  womenservices: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default WomenServices;
