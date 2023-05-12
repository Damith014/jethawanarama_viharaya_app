import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./styles";
import { Video } from "../../../client/Interface";
const bgImage = require("../../../assest/images/sample_1.png");

type Props = {
  video: Video;
  onPress: any;
  isLarge: boolean;
  navigation: any;
};

export default function VideoCard({
  video,
  onPress,
  isLarge,
  navigation,
}: Props) {
  
  function convert_time(duration: string): string {
    let matches = duration.match(/[0-9]+[HMS]/g);
    let hours = 0,
      minutes = 0,
      seconds = 0;
    matches?.forEach(function (part) {
      let unit = part.charAt(part.length - 1);
      let amount = parseInt(part.slice(0, -1));

      switch (unit) {
        case "H":
          hours = amount;
          break;
        case "M":
          minutes = amount;
          break;
        case "S":
          seconds = amount;
          break;
        default:
      }
    });
    if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }

  return (
    <TouchableOpacity
      style={isLarge ? styles.content_main1 : styles.content_main}
      onPress={() =>
        navigation.navigate("Video", {video_id: video.videoId})
      }
    >
      <ImageBackground
        style={styles.content}
        source={{ uri: video.thumbnail }}
        resizeMode="contain"
      >
        <View style={styles.content_sub}>
          <Text style={styles.content_header_text}>
            {convert_time(video.duration)}
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.content_sub_text} numberOfLines={2}>
        {video.title}
      </Text>
    </TouchableOpacity>
  );
}
