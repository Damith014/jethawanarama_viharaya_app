import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import DeshanaCard from "../DeshanaCard";
import VideoCard from "../VideoCard";
import "../../../assest/i18n/i18n";
import { Deshana, Deshanas, Video, Videos } from "../../../client/Interface";

type Props = {
  deshana?: Deshanas;
  video?: Videos;
  onPress: any;
  isAudio: boolean;
  isVideo: boolean;
  navigation: any;
};

export default function MainCard({
  deshana,
  video,
  onPress,
  isAudio,
  isVideo,
  navigation,
}: Props) {
  const { t } = useTranslation();

  const DeshanaItem = ({ deshana }: { deshana: Deshana }) => (
    <DeshanaCard
      deshana={deshana}
      onPress={undefined}
      navigation={navigation}
    />
  );
  const VideoItem = ({ video }: { video: Video }) => (
    <VideoCard
      video={video}
      onPress={undefined}
      navigation={navigation}
      isLarge={false}
    />
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SermonsList", { program_id: ((isAudio ? deshana?.categoryAlias : video?.id) ?? "").toString()})
          // navigation.navigate("Search")
        }
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.content_header_text}>
            {isAudio ? deshana?.category : video?.title}
          </Text>
          <Text style={styles.content_header_text_right}>{t("more")}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.content_sub_text} numberOfLines={3}>
        {isAudio ? deshana?.description : video?.description}
      </Text>
      {isAudio && (
        <View style={{ flexDirection: "row" }}>
          <FlatList
            style={{ marginBottom: 40 }}
            data={deshana?.deshana}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <DeshanaItem deshana={item} />}
            horizontal={true}
          />
        </View>
      )}
      {isVideo && (
        <View style={{ flexDirection: "row" }}>
          <FlatList
            style={{ marginBottom: 40 }}
            data={video?.videos}
            keyExtractor={item => item.videoId}
            renderItem={({ item }) => <VideoItem video={item} />}
            horizontal={true}
          />
        </View>
      )}
    </View>
  );
}