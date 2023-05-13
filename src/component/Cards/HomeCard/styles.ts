import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    content_image_sub: {
        resizeMode: 'contain',
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
        marginTop:10,
        height:150,
        width: 250
    },
    content_sub_header: {
        color: '#000000',
        fontWeight: '800',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 5
    },
    content_sub_title: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 13,
        marginLeft: 10
    },
  });