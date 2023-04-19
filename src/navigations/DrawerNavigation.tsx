import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import NavigationMenu from "./Menu"
import MainScreen from "../screens/MainScreen";
import { RootNavigation } from "./RootNavigation";
import HomeScreen from "../screens/HomeScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import AboutScreen from "../screens/AboutScreen";
import ProgramScreen from "../screens/ProgramScreen";
import { t } from "i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootNavigation>();

function MainScreenStack() {
  return (
    <Stack.Navigator 
    initialRouteName="Main"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: `${t('home')}`,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Home"
    screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: `${t('sermons')}`,
        }}
      />
    </Stack.Navigator>
  );
}

function ProgramScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="Program"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Program"
        component={ProgramScreen}
        options={{
          title: `${t('programs')}`,
          headerRight: () => (
            // navigation.navigate("SearchScreen")
            <TouchableOpacity onPress={() => undefined} style={{ marginRight: 15 }}>
              <Ionicons name="ios-search" size={20} color='rgba(60, 60, 67, 0.6)' />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function AboutScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: `${t('contact_us')}`,
        }}
      />
    </Stack.Navigator>
  );
}


function DrawerNavigation() {
  return(
    <Drawer.Navigator
      screenOptions={{ headerShown: true}}
      drawerContent={(props) => <NavigationMenu {...props} />}
    >
      <Drawer.Screen
        name={t('home')}
        component={MainScreenStack}
      />
      <Drawer.Screen
        name={t('sermons')}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name={t('programs')}
        component={ProgramScreenStack}
      />
      <Drawer.Screen
        name={t('contact_us')}
        component={AboutScreenStack}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
