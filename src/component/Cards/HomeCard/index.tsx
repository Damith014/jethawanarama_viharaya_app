import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Program } from "../../../client/Interface";
type Props = {
  program: Program;
  onPress: any;
};
export default function HomeCard({ program, onPress }: Props) {
  const image = { uri: program.coverImage ?? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"};
  return (
    <>
    {program.id != 1000 &&
        <TouchableOpacity
          onPress={onPress}
          style={{ flexDirection: "row", flex: 2, marginBottom: 30 }}
        >
          <View style={{ marginTop: 20 }}>
            <ImageBackground
              source={image}
              style={styles.content_image_sub}
              imageStyle={{ borderRadius: 5 }}
            ></ImageBackground>
            <Text style={styles.content_sub_header}>{program.title}</Text>
            <Text style={styles.content_sub_title}>{program.description}</Text>
          </View>
        </TouchableOpacity>
    }
    </>
  );
}
