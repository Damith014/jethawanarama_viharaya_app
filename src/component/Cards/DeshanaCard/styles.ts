import {StyleSheet,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    content_main:{
        marginRight:20,
        width:(windowWidth/2.6) - 15, 
    },
    content: {
        height:100,
    },
    content_sub:{
        padding:10
    },
    content_header_text:{
        fontSize:14,
        fontWeight:'bold',
        color:"#000000",
        lineHeight:18
    },
    content_sub_text:{
        fontSize:12,
        fontWeight:'400',
        color:"#000000",
        lineHeight:16
    },
  });