import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StatusBar,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import EmptyCard from "../../../component/Cards/EmptyCard";
import { BottomTabNavigation } from "../../../navigations/BottomTabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Client from "../../../client/Client";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Deshana } from "../../../client/Interface";
import DownloadCard from "../../../component/Cards/DownloadCard";
const header = require("../../../assest/images/header_two.png");
const body = require("../../../assest/images/body_three.png");
const windowWidth = Dimensions.get("window").width;
type tabScreenRouteProp = RouteProp<BottomTabNavigation, "Image">;
type sermonsScreenRouteProp = RouteProp<BottomTabNavigation, "Sermons">;
function SermonsScreen() {
  const route = useRoute<tabScreenRouteProp>();
  const navigation = useNavigation<sermonsScreenRouteProp>();
  const program_id = route.params.program_id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudio] = useState<any>([]);
  const { t } = useTranslation();
  useEffect(() => {
    getDeshana().catch((error) => {});
    async function getDeshana() {
      try {
        let medium = await AsyncStorage.getItem("medium");
        setIsLoading(true);
        let response = await Client.deshana(medium ?? "audio", program_id);
        if (response.status == 200) {
          setAudio(response.sermon?.deshana as []);
        } else {
          setAudio([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const DeshanaItem = ({ deshana }: { deshana: Deshana }) => (
    <DownloadCard
      result={deshana}
      isFavorite={false}
      navigation={navigation}
      isDownload={true}
    />
  );
  const EmptyListMessage = () => {
    return <EmptyCard title={t("sorry")} body={t("message")} />;
  };
  return (
    <View style={{ flex: 10, backgroundColor: "#ffff" }}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#000" }}
      />
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
            top: -62,
            paddingTop: 15,
            width: windowWidth - 32,
            borderRadius: 6,
            position: "absolute",
            backgroundColor: "#ffffff",
            height: "110%",
          }}
        >
          <FlatList
            style={{ marginBottom: 50 }}
            data={audios ?? []}
            numColumns={1}
            renderItem={({ item }) => <DeshanaItem deshana={item} />}
            nestedScrollEnabled={true}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </View>
    </View>
  );
}
export default SermonsScreen;