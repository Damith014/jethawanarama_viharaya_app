import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Share, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, useProgress, Capability } from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob'
import Spinner from 'react-native-loading-spinner-overlay';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Deshana } from '../../../client/Interface';
import { RootNavigation } from '../../../navigations/RootNavigation';

type audioScreenRouteProp = RouteProp<RootNavigation,"Audio">;
function AudioScreen(){
  const route = useRoute<audioScreenRouteProp>();
  const deshana = route.params.deshana as Deshana;
  const [isPlay, setIsPlay] = useState(false);
  const [isDownloading, setIsDownlading] = useState(false);
  const { position, duration } = useProgress(0, 0);
  var track = {
    url: deshana.mediaUrl,
    title: deshana.title,
    artist: deshana.sermoniser,
    album: '',
    genre: '',
    date: deshana.publishedDate,
    mediaLowUrl: deshana.mediaLowUrl,
    mediaLowSize: deshana.mediaLowSize,
  };

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    if (Platform.OS == "android") {
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause
        ]
      });
    } else {
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ]
      });
    }
    await TrackPlayer.reset();
  }

  const play = async (status: boolean) => {
    await TrackPlayer.add([track]);
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    };
    console.log('The player is ', state);
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    setIsPlay(status);
    if (status) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }
  const backward = () => {
    TrackPlayer.pause();
    TrackPlayer.seekTo(position - 10)
    TrackPlayer.play();
  }
  const forward = () => {
    TrackPlayer.pause();
    TrackPlayer.seekTo(position + 10)
    TrackPlayer.play();
  }
  const downloadpdf = () => {

  }
  const downloadmp3 = (url: string) => {
    requestToPermissions(url);
  }
  const requestToPermissions = async (url: string) => {
    try {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Music',
          message: 'App needs access to your Files... ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
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
    setIsDownlading(true)
    var filename = url.replace(/^.*[\\\/]/, '');
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: filename,
        path: RNFetchBlob.fs.dirs.DownloadDir + `${filename}`,
        description: 'Downloading the file',
      },
    })
      .fetch('GET', url)
      .then(res => {
        setIsDownlading(false);
        if (Platform.OS === "ios") {
          RNFetchBlob.ios.openDocument(res.data);
        } else {
          RNFetchBlob.android.actionViewIntent(res.path());
        }
      });
  };
  const share = async () => {
    try {
      const result = await Share.share({
        message:
        deshana.title + " | " + deshana.sermoniser + "\n" + deshana.mediaUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      // alert(error.message);
    }
  }
  const mbRound = (value: string) => {
    return ( Number(value) / (1024 * 1024)).toFixed(1);
  }

  const timeConvert = (d: number) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    if (h > 0) {
      return h + ":" + m + ":" + s;
    } else {
      return m + ":" + s;
    }


  }
  return (
    <View style={styles.container}>
      {isDownloading && <Spinner
        visible={true}
        textContent={'Downloading...'}
        textStyle={styles.spinnerTextStyle}
      >
        <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, padding: 32 }}>
          <TouchableOpacity onPress={() => setIsDownlading(false)} style={{ flex: 1, marginTop: 36, flexDirection: "column", alignItems: 'flex-end' }}><Text style={{ color: 'white' }}>Close</Text></TouchableOpacity>
          <ActivityIndicator size="large" style={{ flex: 4 }} />
        </View>
      </Spinner>}
      <View style={styles.logoContainer}>
        <Image style={styles.logoMain} source={require("../../../assest/images/music.png")} />
        <Text style={styles.title}>{deshana.title}</Text>
        <Text style={styles.subTitle}>{deshana.sermoniser}</Text>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => share()}>
            <View style={[styles.iconContainer, { marginTop: 10, marginRight: 20 }]}>
              <Icon name="share-variant" color="#86868A" size={44} />
              <Text style={styles.iconSub}></Text>
            </View>
          </TouchableOpacity>
          {deshana.pdfUrl != "" &&
            <TouchableOpacity onPress={() => downloadpdf()}>
              <View style={styles.iconContainer}>
                <Icon name="file-download-outline" color="#86868A" size={44} />
                <Text style={styles.iconSubT}>PDF</Text>
                <Text style={styles.iconSub}>{mbRound(deshana.pdfSize)} Kb</Text>
              </View>
            </TouchableOpacity>
          }
          {deshana.mediaLowUrl != "" &&
            <TouchableOpacity onPress={() => downloadmp3(deshana.mediaLowUrl)}>
              <View style={styles.iconContainerS}>
                <Ionicons name="download-outline" color="#86868A" size={34} />
                <Text style={styles.iconSubTS}>MP3</Text>
                <Text style={styles.iconSubS}>{mbRound(deshana.mediaLowSize)} Mb</Text>
              </View>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => downloadmp3(deshana.mediaUrl)}>
            <View style={styles.iconContainer}>
              <Ionicons name="download-outline" color="#86868A" size={44} />
              <Text style={styles.iconSubT}>MP3</Text>
              <Text style={styles.iconSub}>{mbRound(deshana.mediaSize)} Mb</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <View style={{ width: '100%' }}>
          <View style={{ marginRight: 15, marginLeft: 15 }}>
            <Slider
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={value => {
                TrackPlayer.pause();
                TrackPlayer.seekTo(value)
                TrackPlayer.play();
              }}
              minimumTrackTintColor="#FF0000"
              maximumTrackTintColor="#BCBCBC"
              style={{ width: '100%', height: 40, marginTop: -5 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ fontWeight: '400', fontSize: 9, fontStyle: 'normal' }}>{timeConvert(position)}</Text>
            <Text style={{ fontWeight: '400', fontSize: 9, fontStyle: 'normal' }}>{timeConvert(duration)}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => backward()}>
              <View style={styles.buttonsContainer}>
                <Ionicons name="ios-play-back-sharp" color="rgba(60, 60, 67, 0.6)" size={44} />
              </View>
            </TouchableOpacity>
            {!isPlay &&
              <TouchableOpacity onPress={() => play(true)}>
                <View style={styles.buttonsContainer}>
                  <Ionicons name="ios-play-sharp" color="rgba(60, 60, 67, 0.6)" size={44} />
                </View>
              </TouchableOpacity>
            }
            {isPlay &&
              <TouchableOpacity onPress={() => play(false)}>
                <View style={styles.buttonsContainer}>
                  <Ionicons name="ios-pause-sharp" color="rgba(60, 60, 67, 0.6)" size={44} />
                </View>
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => forward()}>
              <View style={styles.buttonsContainer}>
                <Ionicons name="ios-play-forward-sharp" color="rgba(60, 60, 67, 0.6)" size={44} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
export default AudioScreen;
