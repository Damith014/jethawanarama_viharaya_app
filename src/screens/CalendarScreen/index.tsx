import React from "react";
import { View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

function CalendarScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1, marginTop: 30 }}>
        <WebView
        style={{ flex: 1 }}
          source={{
            uri: "https://calendar.google.com/calendar/embed?src=en-gb.lk%23holiday%40group.v.calendar.google.com&ctz=Europe%2FLondon",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default CalendarScreen;