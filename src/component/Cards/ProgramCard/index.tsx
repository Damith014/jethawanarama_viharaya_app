import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Program } from "../../../client/Interface";
type Props = {
  program: Program;
  onPress: any;
  isLeft: boolean;
};
export default function ProgramCard({ program, onPress, isLeft }: Props) {
  const image = { uri: program?.coverImage ?? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"};
  if (isLeft) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", flex: 2, marginBottom: 30 }}
      >
        <View style={{ flexDirection: "row", flex: 2 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.content_header_text}>{program?.title}</Text>
            <Text style={styles.content_sub_text} numberOfLines={4}>{program?.description}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <ImageBackground
              resizeMode= "contain"
              source={image}
              style={{ height: 100 }}
            ></ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", flex: 2, marginBottom: 30 }}
      >
        <View style={{ flexDirection: "row", flex: 2 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <ImageBackground
              resizeMode="contain"
              source={image}
              style={{ height: 100 }}
            ></ImageBackground>
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.content_header_text}>{program?.title}</Text>
            <Text style={styles.content_sub_text} numberOfLines={4}>{program?.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}