import {StyleSheet,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    content_main:{
        marginRight:20,
        width:(windowWidth/2.6) - 15, 
    },
    content_main1:{
        marginRight:20,
        width:(windowWidth/2.3), 
    },
    content: {
        height:100,
        justifyContent:'flex-end',
        resizeMode: 'contain',
    },
    content_sub:{
        padding:5,
        justifyContent:'center',
    },
    content_header_text:{
        fontSize:10,
        width:45,
        paddingRight:3,
        paddingLeft:3,
        color:"#FFFFFF",
        lineHeight:18,
        textAlign:'right',
        backgroundColor:'#000000',
        alignSelf: 'flex-end', 
    },
    content_sub_text:{
        fontSize:14,
        fontWeight:'700',
        color:"#000000",
        lineHeight:16,
        marginTop:6
    },
  });