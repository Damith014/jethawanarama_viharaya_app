import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
const error_message = require("../../../assest/images/image_error.png");
type Props = {
  title: string;
  body: string;
}; 
export default function EmptyCard({ title, body }: Props) {
  return (
    <View style={styles.content_main}>
      <Image style={styles.content} source={error_message} />
      <View style={styles.content_sub}>
        <Text style={styles.content_header_text} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.content_sub_text} numberOfLines={3}>
          {body}
        </Text>
      </View>
    </View>
  );
}
