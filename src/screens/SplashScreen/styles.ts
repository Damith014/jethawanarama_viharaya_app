import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    
    container:{
        flex:1 ,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#FFFFFF"

    },
    logoMain:{
        width:188,
        height:252
    },
    logoSub:{
        width:245,
        height:80
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
  },
});