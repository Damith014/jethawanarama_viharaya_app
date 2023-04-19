import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:"#FFFFFF"

    },
    logoContainer:{
        flex:0.6,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#FFFFFF"
    },
    textContainer:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    labelContainer:{
        fontSize: 15, 
        color: '#8A8A8E'
    },
    radioContainer:{
        marginTop:50
    },
    buttonContainer:{
        marginTop:90
    },
    logoMain:{
        width:108,
        height:146,
    },
    logoSub:{
        width:142,
        height:46
    }
});