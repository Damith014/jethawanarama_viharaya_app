import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./styles";
import { Deshana } from "../../../client/Interface";
const bgImage = require("../../../assest/images/bg.png");
type Props = {
  deshana: Deshana;
  onPress: any;
  navigation: any;
};
export default function DeshanaCard({
  deshana,
  onPress,
  navigation,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.content_main}
      onPress={() =>
        navigation.navigate("Audio", {deshana: deshana})
      }
    >
      <ImageBackground style={styles.content} source={bgImage}>
        <View style={styles.content_sub}>
          <Text style={styles.content_header_text} numberOfLines={2}>
            {deshana.title}
          </Text>
          <Text style={styles.content_sub_text} numberOfLines={3}>
            {deshana.publishedDate + deshana.sermoniser}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
