import React from "react";
import {
  StatusBar,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";

const header = require("../../../assest/images/header_two.png");
const body = require("../../../assest/images/body_three.png");
const windowWidth = Dimensions.get("window").width;

function SermonsScreen() {
  return (
    <ScrollView style={{ flex: 10, backgroundColor: "#ffff" }}>
      <ImageBackground source={header} style={{ height: 100 }}>
        <StatusBar translucent barStyle="light-content" />
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={body}
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
        ></View>
      </View>
    </ScrollView>
  );
}
export default SermonsScreen;
