import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import Client from "../../../client/Client";
import EmptyCard from "../../../component/Cards/EmptyCard";
import "../../../assest/i18n/i18n";
import { BottomTabNavigation } from "../../../navigations/BottomTabNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Information } from "../../../client/Interface";
import Spinner from "react-native-loading-spinner-overlay/lib";

const header = require("../../../assest/images/header_two.png");
const body = require("../../../assest/images/body_three.png");
const windowWidth = Dimensions.get("window").width;
type tabScreenRouteProp = RouteProp<BottomTabNavigation, "Image">;
function ImageScreen() {
  const route = useRoute<tabScreenRouteProp>();
  const program_id = route.params.program_id as string;
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [information, setInformation] = useState<Information | null>();
  useEffect(() => {
    getInformation().catch(error => {})
    async function getInformation() {
      setIsLoading(true);
      let response = await Client.information(program_id);
      if (response.status == 200) {
        setIsLoading(false);
        setInformation(response.information);
      } else {
        setIsLoading(false);
      }
    }
  }, []);
  const ImageItem = ({ photo }: { photo: string }) => (
    <View style={{ flex: 1, padding: 5 }}>
      <Image
        source={{ uri: photo }}
        style={{ height: 200, width: windowWidth / 2.3 }}
      ></Image>
    </View>
  );
  const EmptyListMessage = ({}) => {
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
            data={information?.photos ?? []}
            numColumns={1}
            renderItem={({ item }) => <ImageItem photo={item} />}
            nestedScrollEnabled={true}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </View>
    </View>
  );
}
export default ImageScreen;