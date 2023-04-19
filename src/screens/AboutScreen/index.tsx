import { t } from "i18next";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Linking,
} from "react-native";
import Client from "../../client/Client";
import Button from "../../component/Button";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { About } from "../../client/Interface";

const whatsapp = require("../../assest/icons/social/whatsapp.png");
const viber = require("../../assest/icons/social/viber.png");
const skype = require("../../assest/icons/social/skype.png");
const google = require("../../assest/icons/social/google.png");
const facebook = require("../../assest/icons/social/facebook.png");
const youtube = require("../../assest/icons/social/youtube.png");
const podcast = require("../../assest/icons/social/podcast.png");

function AboutScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [about, setAbout] = useState<About | null>();

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    getAbout();
    async function getAbout() {
      setIsLoading(true);
      let response = await Client.about();
      if (response.status == 200) {
        setIsLoading(false);
        setAbout(response.about);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const send = async () => {
    if (
      data.name.trim() != "" &&
      data.phone.trim() != "" &&
      data.email.trim() != "" &&
      data.message.trim() != ""
    ) {
      setIsLoading(true);
      let response = await Client.contact(data);
      if (response.response?.success) {
        setIsLoading(false);
        setData({
          ...data,
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        Alert.alert("", response.response?.result.message ?? "", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        setIsLoading(false);
        Alert.alert("Error", response.response?.result.message ?? "", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } else {
      Alert.alert("Empty filed!", `${t("fill_data")}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const openLink = (type: string) => {
    let url: string = "";
    if (type == "podcast") {
      url = about?.result.social[2].url ?? "";
    } else if (type == "facebook") {
      url = about?.result.social[0].url ?? "";
    } else if (type == "youtube") {
      url = about?.result.social[1].url ?? "";
    } else if (type == "whatsapp") {
      url =
        "whatsapp://send?text=&phone=" +
        (about?.result.whatsAppNumber ?? "").replace(/ /g, "");
    } else if (type == "viber") {
      url =
        "viber://contact?number=" +
        (about?.result.vibre ?? "").replace(/ /g, "");
    } else if (type == "skype") {
      url = "skype:" + about?.result.skype ?? "";
    } else if (type == "map") {
      url = about?.result.mapLink ?? "";
    }
    Linking.openURL(url).catch((err) => console.error("Error", err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ padding: 15, backgroundColor: "#FFFFFF", flex: 1 }}>
        <View style={{ padding: 15, backgroundColor: "#FFFFFF", flex: 1 }}>
          <Spinner
            visible={isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#000" }}
          />
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              fontWeight: "400",
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            {about?.result.introduction}
          </Text>
          <View style={{ flexDirection: "row", flex: 2 }}>
            <View style={{ flex: 1, marginTop: 10 }}>
              <Text
                style={{ color: "#000000", fontWeight: "700", fontSize: 14 }}
              >
                {t("mobile_number")}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#000000",
                    marginTop: 10,
                    fontWeight: "400",
                    fontSize: 12,
                  }}
                >
                  {about?.result.phone[0]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#000000",
                    marginTop: 5,
                    fontWeight: "400",
                    fontSize: 12,
                  }}
                >
                  {about?.result.phone[1]}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => openLink("whatsapp")}>
                <Image
                  source={whatsapp}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("skype")}>
                <Image
                  source={skype}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("viber")}>
                <Image source={viber} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 25 }}>
            <Text style={{ color: "#000000", fontWeight: "700", fontSize: 14 }}>
              {t("email")}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#000000",
                  marginTop: 5,
                  fontWeight: "400",
                  fontSize: 12,
                }}
              >
                {about?.result.email}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginTop: 25 }}>
              <Text
                style={{ color: "#000000", fontWeight: "700", fontSize: 14 }}
              >
                {t("address")}
              </Text>
              <Text
                style={{
                  color: "#000000",
                  marginTop: 10,
                  fontWeight: "400",
                  fontSize: 12,
                }}
              >
                {about?.result.address.addressLine1}
              </Text>
              <Text
                style={{
                  color: "#000000",
                  marginTop: 5,
                  fontWeight: "400",
                  fontSize: 12,
                }}
              >
                {about?.result.address.addressLine2}
              </Text>
              <Text
                style={{
                  color: "#000000",
                  marginTop: 5,
                  fontWeight: "400",
                  fontSize: 12,
                }}
              >
                {about?.result.address.city}
              </Text>
              <Text
                style={{
                  color: "#000000",
                  marginTop: 5,
                  fontWeight: "400",
                  fontSize: 12,
                }}
              >
                {about?.result.address.info}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => openLink("map")}>
                <Image source={google} style={{ width: 35, height: 35 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("map")}>
                <Text
                  style={{
                    color: "#7B7B7B",
                    marginTop: 10,
                    fontWeight: "400",
                    fontSize: 12,
                  }}
                >
                  {t("see_map")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 25 }}>
            <Text style={{ color: "#000000", fontWeight: "700", fontSize: 14 }}>
              {t("social_media")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <TouchableOpacity onPress={() => openLink("facebook")}>
                <Image
                  source={facebook}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("youtube")}>
                <Image
                  source={youtube}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("podcast")}>
                <Image source={podcast} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              color: "#6F6F6F",
              marginTop: 20,
              fontWeight: "400",
              fontSize: 24,
            }}
          >
            {t("write_to_us")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              width: "100%",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder={t("your_name")}
              placeholderTextColor="#8E8E93"
              style={{
                width: "98%",
                fontWeight: "400",
                fontSize: 14,
                color: "#000000",
                marginLeft: 8,
                minHeight: 36,
              }}
              value={data.name}
              onChangeText={(val) =>
                setData({
                  ...data,
                  name: val,
                })
              }
              clearButtonMode={"always"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              width: "100%",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder={t("your_contact_number")}
              placeholderTextColor="#8E8E93"
              style={{
                width: "98%",
                fontWeight: "400",
                fontSize: 14,
                color: "#000000",
                marginLeft: 8,
                minHeight: 36,
              }}
              value={data.phone}
              onChangeText={(val) =>
                setData({
                  ...data,
                  phone: val,
                })
              }
              clearButtonMode={"always"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              width: "100%",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder={t("your_email")}
              placeholderTextColor="#8E8E93"
              style={{
                width: "98%",
                fontWeight: "400",
                fontSize: 14,
                color: "#000000",
                marginLeft: 8,
                minHeight: 36,
              }}
              value={data.email}
              onChangeText={(val) =>
                setData({
                  ...data,
                  email: val,
                })
              }
              clearButtonMode={"always"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              width: "100%",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder={t("your_message")}
              placeholderTextColor="#8E8E93"
              style={{
                width: "98%",
                fontWeight: "400",
                fontSize: 14,
                color: "#000000",
                marginLeft: 8,
                minHeight: 36,
              }}
              value={data.message}
              onChangeText={(val) =>
                setData({
                  ...data,
                  message: val,
                })
              }
              clearButtonMode={"always"}
              multiline={true}
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Button onPress={() => send()} label={t("send")} isAbout={true} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AboutScreen;
