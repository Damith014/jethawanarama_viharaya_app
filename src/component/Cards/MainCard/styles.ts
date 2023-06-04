import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    content_header_text:{
        fontSize:24,
        lineHeight:35,
        fontWeight:'400',
        color:'#6F6F6F',
        width:'50%'
    },
    content_header_text_right:{
        fontSize:14,
        lineHeight:35,
        textAlign:'right',
        fontWeight:'700',
        color:'#000',
        width:'50%',
        textDecorationLine: 'underline',
    },
    content_sub_text:{
        fontSize:14,
        lineHeight:18,
        fontWeight:'400',
        marginTop:5,
        marginBottom:10,
        color:'#6F6F6F'
    },
  });