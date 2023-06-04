import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { RootNavigation } from "./RootNavigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import InformationScreen from "../screens/Tab/InformationScreen";
import "../assest/i18n/i18n";
import SermonsScreen from "../screens/Tab/SermonsScreen";
import ImageScreen from "../screens/Tab/ImagesScreen";
const BottomTab = createBottomTabNavigator<BottomTabNavigation>();
type tabScreenRouteProp = RouteProp<RootNavigation, "Tab">;
type tabScreenProp = StackNavigationProp<RootNavigation, "Tab">;
const Stack = createStackNavigator<BottomTabNavigation>();
function InformationScreenStack() {
  const route = useRoute<tabScreenRouteProp>();
  const program_id = route.params.program_id as string;
  return (
    <Stack.Navigator
      initialRouteName="Information"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Information"
        initialParams={{ program_id: program_id }}
        component={InformationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function ImageScreenStack() {
  const route = useRoute<tabScreenRouteProp>();
  const program_id = route.params.program_id as string;
  return (
    <Stack.Navigator
      initialRouteName="Image"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Image"
        initialParams={{ program_id: program_id }}
        component={ImageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function SermonScreenStack() {
  const route = useRoute<tabScreenRouteProp>();
  const program_id = route.params.program_id as string;
  return (
    <Stack.Navigator
      initialRouteName="Sermons"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Sermons"
        initialParams={{ program_id: program_id }}
        component={SermonsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function BottomTabStack() {
  const navigation = useNavigation<tabScreenProp>();
  const route = useRoute<tabScreenRouteProp>();
  const program_id = route.params.program_id as string;
  const { t } = useTranslation();
  return (
    <BottomTab.Navigator>
      <>
        <BottomTab.Screen
          name="Information"
          component={InformationScreenStack}
          initialParams={{ program_id: program_id }}
          options={{
            headerTintColor: "#FFFFFF",
            title: `${t("programs")}`,
            headerTransparent: true,
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => navigation.navigate("Search")}
            //     style={{ marginRight: 15 }}
            //   >
            //     <Ionicons name="ios-search" size={20} color="#FFFFFF" />
            //   </TouchableOpacity>
            // ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            ),
            tabBarLabel: `${t("details")}`,
            tabBarIcon: ({ color, size }) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Image"
          component={ImageScreenStack}
          initialParams={{ program_id: program_id }}
          options={{
            headerTintColor: "#FFFFFF",
            title: `${t("programs")}`,
            headerTransparent: true,
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => navigation.navigate("Search")}
            //     style={{ marginRight: 15 }}
            //   >
            //     <Ionicons name="ios-search" size={20} color="#FFFFFF" />
            //   </TouchableOpacity>
            // ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            ),
            tabBarLabel: `${t("image")}`,
            tabBarIcon: ({ color, size }) => (
              <Icon name="image" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Sermons"
          component={SermonScreenStack}
          initialParams={{ program_id: program_id }}
          options={{
            headerTintColor: "#FFFFFF",
            title: `${t("programs")}`,
            headerTransparent: true,
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => navigation.navigate("Search")}
            //     style={{ marginRight: 15 }}
            //   >
            //     <Ionicons name="ios-search" size={20} color="#FFFFFF" />
            //   </TouchableOpacity>
            // ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            ),
            tabBarLabel: `${t("sermon")}`,
            tabBarIcon: ({ color, size }) => (
              <Icon name="folder-video" color={color} size={size} />
            ),
          }}
        />
      </>
    </BottomTab.Navigator>
  );
}
export default BottomTabStack;