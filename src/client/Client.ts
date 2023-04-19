import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { About, Dashboard, Information, Menu, Programs, Response, Search, Sermon } from "./Interface";

const baseURL = () => {
  const apiUrl = "https://www.jethavanaramaviharaya.org/";
  return apiUrl;
};
const setRefreshToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("refreshToken", token);
  } catch (error) {
    console.log(error);
  }
};
const setInstance = async (token: string) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
  } catch (error) {
    console.log(error);
  }
};

const handleTokenResponse = (response: any) => {
  if (response && response.status === 200) {
    if (response.data.refreshToken != null) {
      setRefreshToken(response.data.refreshToken);
    } else if (response.data.accessToken != null) {
      setInstance(response.data.accessToken);
    }
  }
  return {
    refreshToken: response && response.data ? response.data.refreshToken : null,
    accessToken: response && response.data ? response.data.accessToken : null,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleMenuResponse = (response: any) => {
  return {
    menu: response.data as Menu,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleProgramsResponse = (response: any) => {
  return {
    programs: response.data as Programs,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleAboutResponse = (response: any) => {
  return {
    about: response.data as About,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleContactResponse = (response: any) => {
  return {
    response: response.data as Response,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleDashboardresponse = (response: any) => {
  return {
    dashboard: response.data as Dashboard,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleInformationresponse = (response: any) => {
  return {
    information: response.data as Information,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleSearchresponse = (response: any) => {
  return {
    search: response.data as Search,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};

const handleDeshanresponse = (response: any) => {
  return {
    sermon: response.data as Sermon,
    status: response && response.status ? response.status : 500,
    error: response && response.data ? response.data.error : "",
  };
};


const handleError = (errorObject: any) => {
  return {
    menu: null,
    programs: null,
    about: null,
    response: null,
    dashboard: null,
    information: null,
    search: null,
    sermon:null,
    status: errorObject.response.status,
    message: errorObject.response.data.message,
  };
};

const Client = {
  // Get refresh token
  refreshToken: () => {
    const payload = {
      Username: "api@jethavanaramaviharaya.org",
      Password: "Jfll9983Fnj23$g",
    };
    let url = `${baseURL()}api/v2/account/login`;
    return axios
      .post(url, payload)
      .then(handleTokenResponse)
      .catch(handleError);
  },

  // Get access token
  accessToken: async () => {
    var token = "";
    try {
      token = (await AsyncStorage.getItem("refreshToken")) as string;
    } catch (error) {}
    let url = `${baseURL()}api/v2/account/getaccesstoken`;
    return axios
      .get(url, { headers: { refreshToken: token } })
      .then(handleTokenResponse)
      .catch(handleError);
  },
  
  // Get Menu
  menu: async () => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/dashboard/menu`;
    return axios
      .get(url, { headers: { accessToken: token } })
      .then(handleMenuResponse)
      .catch(handleError);
  },

  //Get Programs
  program:async () => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/programs`;
    console.log(url);
    
    return axios
      .get(url, { headers: { accessToken: token } })
      .then(handleProgramsResponse)
      .catch(handleError);
  },

  //Get About
  about:async () => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/contact`;
    return axios
      .get(url, { headers: { accessToken: token } })
      .then(handleAboutResponse)
      .catch(handleError);
  },

  //Post contact
  contact:async (data: any) => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/contact/send`;
    return axios
      .post(url,data, { headers: { accessToken: token } })
      .then(handleContactResponse)
      .catch(handleError);
  },

  //Get dashboard
  dashboard:async () => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("semo_language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/dashboard`;
    return axios
      .get(url,{ headers: { accessToken: token } })
      .then(handleDashboardresponse)
      .catch(handleError);
  },

  //Get dashboard
  information:async (program_id: string) => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/programs/${program_id}`;
    return axios
      .get(url,{ headers: { accessToken: token } })
      .then(handleInformationresponse)
      .catch(handleError);
  },

  //Get search
  search:async (key: string) => {
    var token = "";
    var language = "";
    try {
      token = (await AsyncStorage.getItem("accessToken")) as string;
      language = (await AsyncStorage.getItem("language")) as string;
    } catch (error) {
      console.log("error");
    }
    let url = `${baseURL()}api/v2/mobile/${language}/search?keywords=${key}`;
    return axios
      .get(url,{ headers: { accessToken: token } })
      .then(handleSearchresponse)
      .catch(handleError);
  },

  //Get Deshana
  deshana:async(type: string, id: string)=>{
      var token = '';
      var language = '';
      try{
          token = (await AsyncStorage.getItem('accessToken')) as string;
          language = (await AsyncStorage.getItem('semo_language')) as string;
      }catch(error){}
      let url = `${baseURL()}api/v2/mobile/${language}/deshana/${type}/${id}`;
      return axios
        .get(url,{headers:{'accessToken':token}})
        .then(handleDeshanresponse)
        .catch(handleError);
  },
};

export default Client;