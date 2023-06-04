import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Animated, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import Client from "../../client/Client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadCard from "../../component/Cards/DownloadCard";
import EmptyCard from "../../component/Cards/EmptyCard";
import VideoCard from "../../component/Cards/VideoCard";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabNavigation } from "../../navigations/BottomTabNavigation";
import { Deshana, Video } from "../../client/Interface";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigation } from "../../navigations/RootNavigation";
type sermonsScreenRouteProp = RouteProp<BottomTabNavigation, "SermonsList">;
type mainScreenProp = StackNavigationProp<RootNavigation, "Main">;
function SermonsListScreen() {
  const route = useRoute<sermonsScreenRouteProp>();
  const navigation = useNavigation<mainScreenProp>();
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  let transformX = useRef(new Animated.Value(0)).current;
  const [audios, setAudio] = useState<any>([]);
  const [videos, setVideo] = useState<any>([]);
  const [titile, setTitle] = useState("");
  useEffect(() => {
    getLanguage().catch(error =>{});
    async function getLanguage() {
      try {
        let medium = await AsyncStorage.getItem("medium");
        if (medium == "audio") {
          setActive(false);
        } else {
          setActive(true);
        }
        setIsLoading(true);
        
        let response = await Client.sermons(
          medium ?? "audio",
          route.params?.program_id
        );
        if (response.status == 200) {
          setAudio(response.sermon?.deshana as []);
          setVideo(response.sermon?.videos as []);
          setTitle(response.sermon?.title as string);
        } else {
          setAudio([]);
          setVideo([]);
          setTitle("");
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (active) {
      Animated.timing(transformX, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transformX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);
  const DeshanaItem = ({ deshana }: { deshana: Deshana }) => (
    <DownloadCard result={deshana} isFavorite={false} navigation={navigation} isDownload={true} />
  );
  const VideoItem = ({ video }: { video: Video }) => (
    <VideoCard
      video={video}
      onPress={undefined}
      isLarge={false}
      navigation={navigation}
    />
  );
  const EmptyListMessage = () => {
    return (
      <View>
        {!isLoading && <EmptyCard title={t("sorry")} body={t("message")} />}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.content_sub}>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#000" }}
        />
        <Text style={styles.content_title}>{titile}</Text>
        {active && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              style={{ marginBottom: 30 }}
              data={videos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <VideoItem video={item} />}
              nestedScrollEnabled={true}
              numColumns={2}
              ListEmptyComponent={EmptyListMessage}
            />
          </View>
        )}
        {!active && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              style={{ marginBottom: 40 }}
              data={audios}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <DeshanaItem deshana={item} />}
              nestedScrollEnabled={true}
              ListEmptyComponent={EmptyListMessage}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
export default SermonsListScreen;