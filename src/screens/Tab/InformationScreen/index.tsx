import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import Client from "../../../client/Client";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BottomTabNavigation } from "../../../navigations/BottomTabNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Information } from "../../../client/Interface";
const header = require("../../../assest/images/header.png");
const windowWidth = Dimensions.get("window").width;
type tabScreenRouteProp = RouteProp<BottomTabNavigation, "Information">;
function InformationScreen() {
  const route = useRoute<tabScreenRouteProp>();
  const program_id = route.params.program_id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState<Information | null>();
  useEffect(() => {
    getInformation().catch(error => {});
    async function getInformation() {
      setIsLoading(true);
      let response = await Client.information(program_id);
      if (response.status == 200) {
        setIsLoading(false);
        setInformation(response.information);
      } else {
        setIsLoading(false);
      }
    }
  }, []);
  return (
    <ScrollView style={{ flex: 10, backgroundColor: "#ffff" }}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#000" }}
      />
      <ImageBackground source={header} style={{ height: 100 }}>
        <StatusBar translucent barStyle="light-content" />
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri:
              information?.coverImage ??
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          }}
          style={{ height: 200 }}
        ></ImageBackground>
      </View>
      <View style={{ flex: 2 }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            top: -40,
            paddingTop: 15,
            width: windowWidth - 32,
            borderRadius: 6,
            position: "absolute",
            backgroundColor: "#ffff",
            height: 200,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "400",
              color: "#6F6F6F",
            }}
          >
            {information?.title ?? ""}
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontSize: 14,
              fontWeight: "400",
              color: "#474747",
              marginTop: 15,
            }}
          >
            {information?.description ?? ""}
          </Text>
          {/* <WebView
            style={{
              textAlign: "justify",
              fontSize: 14,
              fontWeight: "400",
              color: "#474747",
              marginTop: 15,
            }}
            originWhitelist={["*"]}
            source={{ html: information?.contents ?? "<div></div>" }}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
}
export default InformationScreen;