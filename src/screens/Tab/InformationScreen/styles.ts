import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get("window").width;
export const styles=StyleSheet.create({
    container:{
        flex: 10, backgroundColor: "#ffff"
    },
    view:{
        flex: 1,
        marginHorizontal: 16,
        paddingTop: 15,
        width: windowWidth - 32,
        borderRadius: 6,
        backgroundColor: "#ffff",
    },
    text_title:{
        marginTop: 32,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "400",
        color: "#6F6F6F",
    },
    text_sub:{
        textAlign: "justify",
        fontSize: 14,
        fontWeight: "400",
        color: "#474747",
        marginTop: 15,
        lineHeight: 20
    },
    image: {
        resizeMode: 'contain',
        height: 200,
        width:'100%',
        // backgroundColor:"#474747"
    }
});