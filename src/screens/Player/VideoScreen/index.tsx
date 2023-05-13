import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { RootNavigation } from "../../../navigations/RootNavigation";
type videoScreenRouteProp = RouteProp<RootNavigation, "Video">;
function VideoScreen() {
  const route = useRoute<videoScreenRouteProp>();
  const [playing, setPlaying] = useState(true);
  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  return (
    <View
      style={{ backgroundColor: "black", flex: 1, justifyContent: "center" }}
    >
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={route.params.video_id}
        onChangeState={onStateChange}
      />
    </View>
  );
}
export default VideoScreen;