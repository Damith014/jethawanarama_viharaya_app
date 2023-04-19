import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    btnContainer:{
        backgroundColor:'#FF8546',
        borderRadius:10,
        textAlign:"center",
        alignItems:'center',
        justifyContent:'center',
        width:'20%',
    },
    txt:{
        fontWeight:'700',
        fontSize:14,
        color:'#FFFFFF'
    },
    serchInPutTxt:{
      width:'90%',
      fontWeight:"400",
      fontSize:14,
      color:'#000000',
      marginLeft:8,
      minHeight:36,
      
    },
    serchTxt:{
      fontWeight:'700',
      fontSize:14,
      color:'#FFFFFF',
     
    },
});