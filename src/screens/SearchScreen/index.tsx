import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import Client from "../../client/Client";
import DownloadCard from "../../component/Cards/DownloadCard";
import "../../assest/i18n/i18n";
import EmptyCard from "../../component/Cards/EmptyCard";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Deshana } from "../../client/Interface";
import { RootNavigation } from "../../navigations/RootNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
type searchScreenProp = StackNavigationProp<RootNavigation, "Search">;
function SearchScreen() {
  const navigation = useNavigation<searchScreenProp>();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<any>([]);
  const { t } = useTranslation();
  const changeValue = async (text: string) => {
    setText(text);
    setIsLoading(false);
    let response = await Client.search(text);
    if (response.search?.success) {
      setSearch(response.search.result as []);
    }
    setIsLoading(false);
  };
  const Result = ({ result }: { result: Deshana }) => (
    <DownloadCard result={result} isFavorite={false} navigation={navigation} isDownload={false} />
  );
  const EmptyListMessage = () => {
    return (
      <View>
        {search.length == 0 && (
          <EmptyCard title={t("sorry")} body={t("message")} />
        )}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#000" }}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              width: "93%",
              left: 5,
              right: 5,
              margin: 10,
            }}
          >
            <Ionicons
              name="ios-search"
              size={20}
              color="#8E8E93"
              style={{ marginLeft: 6, marginTop: 13 }}
            />
            <TextInput
              placeholder={t("topic")}
              placeholderTextColor="#8E8E93"
              style={styles.serchInPutTxt}
              clearButtonMode={"while-editing"}
              onChangeText={(newText) => changeValue(newText)}
              defaultValue={text}
            />
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <FlatList
            style={{ marginBottom: 40 }}
            data={search}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Result result={item} />}
            nestedScrollEnabled={true}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SearchScreen;