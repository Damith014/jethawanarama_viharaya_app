import React from "react";
import { SafeAreaView, Image, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { styles } from "./styles";
const logo = require('../../assest/images/main_logo.png')

const NavigationMenu = (props: any) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={logo} style={styles.sideMenuProfileIcon} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
export default NavigationMenu;
