import React, { useEffect, useState } from "react";
import { Text, View, Image, BackHandler } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import Button from "../../component/Button";
import "../../assest/i18n/i18n";
import Client from "../../client/Client";
import { RootNavigation } from "../../navigations/RootNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
type languageScreenProp = StackNavigationProp<RootNavigation, "Auth">;
function LanguageScreen() {
  const navigation = useNavigation<languageScreenProp>();
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  let language_props = [
    { label: "සිංහල", value: "lk" },
    { label: "English", value: "en" },
  ];
  const goHome = async () => {
    // setIsLoading(true);
    await Client.refreshToken();
    await Client.accessToken();
    let response = await Client.menu();
    if (response.status == 200) {
      setIsLoading(false);
      AsyncStorage.setItem("menu", JSON.stringify(response.menu));
      navigation.replace("Drawer");
    } else {
      setIsLoading(false);
    }
  };
  const selectLanguage = async (language: string) => {
    try {
      i18n
        .changeLanguage(language)
        .then(async () => {
          await AsyncStorage.setItem("language", language);
          await AsyncStorage.setItem("semo_language", language);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#000" }}
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoMain}
          source={require("../../assest/images/main_logo.png")}
        />
        <Image
          style={styles.logoSub}
          source={require("../../assest/images/text_logo.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>ඔබේ භාෂාව තෝරන්න</Text>
        <Text>Select your Language</Text>
        <View style={styles.radioContainer}>
          <RadioForm
            radio_props={language_props}
            initial={0}
            buttonSize={10}
            buttonOuterSize={20}
            labelStyle={styles.labelContainer}
            onPress={(value) => selectLanguage(value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={() => void goHome()} label="Start" isAbout={false} />
        </View>
      </View>
    </View>
  );
}
export default LanguageScreen;