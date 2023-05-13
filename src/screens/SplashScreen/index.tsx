import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { RootNavigation } from "../../navigations/RootNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
type splashScreenProp = StackNavigationProp<RootNavigation, 'Auth'>;
function SplashScreen() {
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation<splashScreenProp>();
  useEffect(() => {
    setTimeout(function () {
      setAnimating(false);
      AsyncStorage.setItem("language", 'lk');
      AsyncStorage.setItem("semo_language", 'lk');
      navigation.navigate("Auth");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoMain}
        source={require("../../assest/images/main_logo.png")}
      />
      <Image
        style={styles.logoSub}
        source={require("../../assest/images/text_logo.png")}
      />
      <ActivityIndicator
        animating={animating}
        color={"#000"}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;