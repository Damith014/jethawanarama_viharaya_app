import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    content_sub:{
        flex: 1, 
        padding: 16
    },
    content_header:{
        flexDirection: "row",
        height:50
    },
    switch_active:{
        color:'#515767',
        fontWeight:'800',
        fontSize:17
    },
    switch_deactive:{
        color:'#000000',
        fontWeight:'400',
        fontSize:16
    },
    content_title:{
        color:'#6F6F6F',
        fontWeight:'400',
        fontSize:18,
        marginBottom:10
    }
  });