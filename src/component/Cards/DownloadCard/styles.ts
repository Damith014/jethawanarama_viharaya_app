import {StyleSheet,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    
    content_header_text:{
        fontSize:14,
        fontWeight:'bold',
        color:"#000000",
        lineHeight:18
    },
    content_sub_text:{
        fontSize:12,
        fontWeight:'400',
        color:"#7B7B7B",
        lineHeight:16,
        marginTop:3
    },
    content_image:{
        flex:.2,
        justifyContent: 'center',
        flexDirection:'row',
    },
    content_favorite_image:{
        marginRight:10,
        marginTop:5
    }
  });