import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import Spinner from "react-native-loading-spinner-overlay";
import { Deshana } from "../../../client/Interface";

const download = require("../../../assest/icons/download.png");
const favorite = require("../../../assest/icons/favorite.png");
const favorite_red = require("../../../assest/icons/red_heart.png");

type Props = {
  result: Deshana;
  isFavorite: boolean;
  navigation: any;
};
export default function DownloadCard({
  result,
  isFavorite,
  navigation,
}: Props) {
  const [isfavo, setFavorite] = useState(false);
  const [isDownloading, setIsDownlading] = useState(false);

  useEffect(() => {
    getFavorite();
    async function getFavorite() {
      try {
        let json = await AsyncStorage.getItem("favorite");
        let favorites = JSON.parse(json ?? "");
        if (favorites != null || favorites != "" || favorites.length != 0) {
          favorites.forEach((element: any) => {
            if (element == result) {
              setFavorite(true);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const favoriteClicked = async () => {
    let deleted = false;
    try {
      let json = await AsyncStorage.getItem("favorite");
      let favorites = JSON.parse(json ?? "");
      if (favorites == null || favorites == "" || favorites.length == 0) {
        setFavorite(true);
        await AsyncStorage.setItem("favorite", JSON.stringify([result.id]));
      } else {
        favorites.forEach((element: any) => {
          let index = favorites.indexOf(result.id);
          if (index > -1) {
            favorites.splice(index, 1);
            setFavorite(false);
            AsyncStorage.setItem("favorite", JSON.stringify(favorites));
            deleted = true;
          }
        });
        if (!deleted) {
          favorites.push(result.id);
          setFavorite(true);
          await AsyncStorage.setItem("favorite", JSON.stringify(favorites));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const downloadClicked = async () => {
    requestToPermissions(result.mediaUrl);
  };

  const requestToPermissions = async (url: any) => {
    try {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Music",
            message: "App needs access to your Files... ",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startDownload(url);
        }
      } else if (Platform.OS == "ios") {
        startDownload(url);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const startDownload = (url: string) => {
    setIsDownlading(true);
    let filename = url.replace(/^.*[\\\/]/, "");
    RNFetchBlob.config({
      fileCache: true,
      appendExt: "mp3",
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: filename,
        path: RNFetchBlob.fs.dirs.DownloadDir + `${filename}`,
        description: "Downloading the file",
      },
    })
      .fetch("GET", url)
      .then((res: { data: any; path: () => any }) => {
        setIsDownlading(false);
        if (Platform.OS === "ios") {
          RNFetchBlob.ios.openDocument(res.data);
        } else {
          RNFetchBlob.android.actionViewIntent(res.path());
        }
      });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        !isFavorite &&
        navigation.navigate("Audio", {deshana: result})
      }}
    >
      {isDownloading && (
        <Spinner
          visible={isDownloading}
          textContent={"Downloading..."}
          textStyle={{ color: "#000" }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "black",
              opacity: 0.5,
              padding: 32,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsDownlading(false)}
              style={{
                flex: 1,
                marginTop: 36,
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
            <ActivityIndicator size="large" style={{ flex: 4 }} />
          </View>
        </Spinner>
      )}
      <View style={{ flexDirection: "row", height: 70 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.content_header_text}>{result.title}</Text>
          <Text style={styles.content_sub_text}>{result.publishedDate + " | " + result.sermoniser}</Text>
        </View>
        <View style={styles.content_image}>
          {isFavorite && (
            <TouchableOpacity onPress={() => favoriteClicked()}>
              {isfavo ? (
                <Image
                  source={favorite_red}
                  style={styles.content_favorite_image}
                ></Image>
              ) : (
                <Image
                  source={favorite}
                  style={styles.content_favorite_image}
                ></Image>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => downloadClicked()}>
            <Image source={download}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}