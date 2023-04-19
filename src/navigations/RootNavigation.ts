import { Deshana } from "../client/Interface";

export type RootNavigation = {
    Splash: undefined;
    Auth: undefined;
    Main: undefined;
    Drawer: undefined;
    Home: undefined;
    Program:undefined;
    About:undefined;
    Calendar:undefined;
    Tab: {program_id: string};
    Search:undefined;
    SermonsList: {program_id: string};
    Video: {video_id: string};
    Audio: {deshana: Deshana};
};