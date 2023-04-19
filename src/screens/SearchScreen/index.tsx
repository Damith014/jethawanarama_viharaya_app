import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
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
  const [isAdvance, setAdvance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const { t } = useTranslation();

  const changeValue = async (text: string) => {
    setText(text);
    setIsLoading(false);
    var response = await Client.search(text);
    if (response.search?.success) {
      setSearch(response.search.result as []);
    }
    setIsLoading(false);
  };
  const Result = ({ result }: { result: Deshana }) => (
    <DownloadCard result={result} isFavorite={true} navigation={navigation} />
  );

  const advanceClicked = (value: boolean) => {
    setAdvance(value);
  };
  const EmptyListMessage = ({}) => {
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
        <View>
          <TouchableOpacity onPress={() => advanceClicked(!isAdvance)}>
            <Text style={{ textAlign: "right", marginRight: 14 }}>
              {t("advanced_search")}
            </Text>
          </TouchableOpacity>
        </View>
        {isAdvance ? (
          <View style={{ marginTop: 20, padding: 16 }}>
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ marginRight: 14 }}>{t("date_of_sermon")}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </View>
            </TouchableOpacity>
            <View style={{ height: 0.5, backgroundColor: "#C6C6C8" }}></View>
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ marginRight: 14 }}>{t("preacher")}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </View>
            </TouchableOpacity>
            <View style={{ height: 0.5, backgroundColor: "#C6C6C8" }}></View>
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ marginRight: 14 }}>{t("programme")}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </View>
            </TouchableOpacity>
            <View style={{ height: 0.5, backgroundColor: "#C6C6C8" }}></View>
          </View>
        ) : (
          <></>
        )}
        <View style={{ marginTop: 20, padding: 16 }}>
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