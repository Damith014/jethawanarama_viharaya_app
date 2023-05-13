import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import Client from "../../client/Client";
import Spinner from "react-native-loading-spinner-overlay";
import "../../assest/i18n/i18n";
import EmptyCard from "../../component/Cards/EmptyCard";
import MainCard from "../../component/Cards/MainCard";
import { Deshanas, Videos } from "../../client/Interface";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigation } from "../../navigations/RootNavigation";
import { useNavigation } from "@react-navigation/native";
const bgImage = require("../../assest/images/no_data.png");
type homeScreenProp = StackNavigationProp<RootNavigation, "Home">;
function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudio] = useState<any>([]);
  const [videos, setVideo] = useState<any>([]);
  const [noData, setNoData] = useState(false);
  const { t } = useTranslation();
  let transformX = useRef(new Animated.Value(0)).current;
  let transformX1 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getLanguage().catch(error=>{});
    async function getLanguage() {
      let language = await AsyncStorage.getItem("semo_language");
      if (language == "lk") {
        setActive(false);
      } else {
        setActive(true);
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
    if (active1) {
      Animated.timing(transformX1, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transformX1, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    getDashboardData();
    async function getDashboardData() {
      setIsLoading(true);
      let response = await Client.dashboard();
      if (response.status == 200) {
        setNoData(false);
        setAudio(response.dashboard?.deshana as []);
        setVideo(response.dashboard?.videos as []);
      } else {
        setAudio([]);
        setVideo([]);
        setNoData(true);
      }
      setIsLoading(false);
    }
  }, [active, active1]);
  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 58],
  });
  const rotationX1 = transformX1.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 58],
  });
  const changedLanguage = async (language: boolean) => {
    setAudio([]);
    setVideo([]);
    try {
      if (language) {
        await AsyncStorage.setItem("semo_language", "en");
      } else {
        await AsyncStorage.setItem("semo_language", "lk");
      }
    } catch (error) {
      console.log(error);
    }
    setActive(language);
    setIsLoading(true);
    let response = await Client.dashboard();
    if (response.status == 200) {
      setNoData(false);
      setAudio(response.dashboard?.deshana as []);
      setVideo(response.dashboard?.videos as []);
    } else {
      setAudio([]);
      setVideo([]);
      setNoData(true);
    }
    setIsLoading(false);
  };
  const changedMedium = async (medium: boolean) => {
    try {
      if (medium) {
        await AsyncStorage.setItem("medium", "video");
      } else {
        await AsyncStorage.setItem("medium", "audio");
      }
    } catch (error) {
      console.log(error);
    }
    setActive1(medium);
  };
  const DeshanaItem = ({ deshana }: { deshana: Deshanas }) => (
    <MainCard
      deshana={deshana}
      onPress={undefined}
      isAudio={true}
      isVideo={false}
      navigation={navigation}
    />
  );
  const VideoItem = ({ video }: { video: Videos }) => (
    <MainCard
      video={video}
      onPress={undefined}
      isAudio={false}
      isVideo={true}
      navigation={navigation}
    />
  );
  const EmptyListMessage = ({}) => {
    return (
      <View>
        {!isLoading && <EmptyCard title={t("sorry")} body={t("message")} />}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.content_sub}>
        <View style={styles.content_header}>
          <Spinner
            visible={isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#000" }}
          />
          <View style={{ flex: 1 }}>
            <Text>{t("language_of_sermons")}</Text>
            <View
              style={{
                flexDirection: "row",
                position: "relative",
                height: 30,
                borderRadius: 8,
                backgroundColor: "#7676801F",
                width: 110,
                marginTop: 9,
                marginLeft: 0,
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  height: 25,
                  top: 2,
                  bottom: 3,
                  borderRadius: 7,
                  width: 50,
                  transform: [
                    {
                      translateX: rotationX,
                    },
                  ],
                  backgroundColor: "#FFFFFF",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => changedLanguage(false)}
              >
                <Text>සිං</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => changedLanguage(true)}
              >
                <Text>Eng</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text>{t("mode_of_sermon_delivery")}</Text>
            <View
              style={{
                flexDirection: "row",
                position: "relative",
                height: 30,
                borderRadius: 8,
                backgroundColor: "#7676801F",
                width: 110,
                marginTop: 9,
                marginLeft: 0,
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  height: 25,
                  top: 2,
                  bottom: 3,
                  borderRadius: 7,
                  width: 50,
                  transform: [
                    {
                      translateX: rotationX1,
                    },
                  ],
                  backgroundColor: "#FFFFFF",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => changedMedium(false)}
              >
                <Text>{t("audio")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => changedMedium(true)}
              >
                <Text>{t("video")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {noData ? (
            <ImageBackground style={{ height: 300 }} source={bgImage} />
          ) : (
            <View>
              {!active1 && (
                <FlatList
                  style={{ marginBottom: 50 }}
                  data={audios}
                  keyExtractor={(item) => item.categoryAlias}
                  renderItem={({ item }) => <DeshanaItem deshana={item} />}
                  nestedScrollEnabled={true}
                  ListEmptyComponent={EmptyListMessage}
                />
              )}
              {active1 && (
                <FlatList
                  style={{ marginBottom: 50 }}
                  data={videos}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <VideoItem video={item} />}
                  nestedScrollEnabled={true}
                  ListEmptyComponent={EmptyListMessage}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;