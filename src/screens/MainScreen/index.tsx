import { t } from "i18next";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { ScrollView } from 'react-native-virtualized-view';
import Client from "../../client/Client";
import { Program } from "../../client/Interface";
import HomeCard from "../../component/Cards/HomeCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigation } from "../../navigations/RootNavigation";
const image_1 = require("../../assest/images/image_1.png");
const image_6 = require("../../assest/images/background_image.png");
type mainScreenProp = StackNavigationProp<RootNavigation, "Main">;
function MainScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [programs, setPrograms] = useState<any>([]);
  const navigation = useNavigation<mainScreenProp>();
  useEffect(() => {
    getProgram().catch(error => {});
    async function getProgram() {
      setIsLoading(true);
      let response = await Client.program();
      if (response.status == 200) {
        setIsLoading(false);
        setPrograms(response.programs?.programs as []);
      } else {
        setIsLoading(false);
      }
    }
  }, []);
  const Item = ({ program }: { program: Program }) => (
    <>
      {program != null &&
        <HomeCard
          program={program}
          onPress={() => {
            console.log(program.id.toString());
            navigation.navigate("Tab", { program_id: program.id.toString()});
          }}
      />
      }
    </>
  );
  return (
    // <SafeAreaView style={styles.content}>
      <ScrollView
        style={{ backgroundColor: "#FFFFFF", flex: 1 }}
        nestedScrollEnabled={true}
        horizontal ={false}
      >
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#000" }}
        />
        <ImageBackground style={{ width: "100%" }} source={image_6}>
          <View style={styles.content_sub}>
            <ImageBackground style={styles.content_image} source={image_1}>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <Text style={styles.content_text}></Text>
                <Text style={styles.content_text}>{t("home_title")}</Text>
              </View>
            </ImageBackground>
            <View style={{ padding: 10 }}>
              <Text style={styles.content_text1}>{t("home_title_two")}</Text>
              <Text style={styles.content_text2}>{t("home_title_three")}</Text>
              <FlatList
                style={{ marginBottom: 0 }}
                data={programs}
                keyExtractor={item => item?.id}
                renderItem={({ item }) => <Item program={item} />}
                nestedScrollEnabled={true}
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    // </SafeAreaView>
  );
}
export default MainScreen;