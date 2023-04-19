import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/screens/SplashScreen';
import { RootNavigation } from './src/navigations/RootNavigation';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import AuthStack from './src/navigations/AuthStack';
import CalendarScreen from './src/screens/CalendarScreen';
import BottomTabStack from './src/navigations/BottomTabStack';
import SearchScreen from './src/screens/SearchScreen';
import SermonsListScreen from './src/screens/SermonsListScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from "i18next";
import VideoScreen from './src/screens/Player/VideoScreen';
import AudioScreen from './src/screens/Player/AudioScreen';
import { Deshana } from './src/client/Interface';

const Stack = createStackNavigator<RootNavigation>();
type sermonsScreenRouteProp = RouteProp<RootNavigation,"SermonsList">;
type videoScreenRouteProp = RouteProp<RootNavigation,"Video">;
type audioScreenRouteProp = RouteProp<RootNavigation,"Audio">;
type sermonsScreenProp = StackNavigationProp<RootNavigation, "SermonsList">;
type audioScreenProp = StackNavigationProp<RootNavigation, "Audio">;
function CalendarScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function SearchScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: true,
           headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        title: `${t('search')}`,
        headerTintColor: '#6F6F6F',}}
      />
    </Stack.Navigator>
  );
}

function AudioScreenStack() {
  const route = useRoute<audioScreenRouteProp>();
  const deshana = route.params.deshana as Deshana;
  const navigation = useNavigation<audioScreenProp>();
  return (
    <Stack.Navigator
      initialRouteName="Audio"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Audio"
        component={AudioScreen}
        initialParams={{ deshana: deshana }}
        options={{ headerShown: true ,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#6F6F6F',
          title: `${t('listen')}`,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ marginRight: 15 }}>
              <Ionicons name="ios-search" size={20} color='rgba(60, 60, 67, 0.6)' />
            </TouchableOpacity>
          ),}}
      />
    </Stack.Navigator>
  );
}

function VideoScreenStack() {
  const route = useRoute<videoScreenRouteProp>();
  const video_id = route.params.video_id as string;
  
  return (
    <Stack.Navigator
      initialRouteName="Video"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        initialParams={{ video_id: video_id }}
        options={{ headerShown: true ,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFFFFF',
          title: '',}}
      />
    </Stack.Navigator>
  )
}

function SermonsListScreenStack() {
  const route = useRoute<sermonsScreenRouteProp>();
  const program_id = route.params.program_id as string;
  const navigation = useNavigation<sermonsScreenProp>();
  return (
    <Stack.Navigator
      initialRouteName="SermonsList"
    >
      <Stack.Screen
        name="SermonsList"
        component={SermonsListScreen}
        initialParams={{ program_id: program_id }}
        options={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#6F6F6F',
          title: `${t('sermons')}`,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ marginRight: 15 }}>
              <Ionicons name="ios-search" size={20} color='rgba(60, 60, 67, 0.6)' />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  )
}
function App(){
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreenStack}
          />
          <Stack.Screen
            name="Tab"
            component={BottomTabStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            options={{ headerShown: false }}
            component={SearchScreenStack}
          />
          <Stack.Screen
            name="SermonsList"
            component={SermonsListScreenStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Video"
            component={VideoScreenStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Audio"
            component={AudioScreenStack}
            options={{ headerShown: false }}
          />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
export default App;
