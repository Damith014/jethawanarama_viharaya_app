import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get("window").width;
export const styles=StyleSheet.create({
    container:{
        flex: 10, backgroundColor: "#ffff"
    },
    view:{
        flex: 1,
        marginHorizontal: 16,
        top: -40,
        paddingTop: 15,
        width: windowWidth - 32,
        borderRadius: 6,
        position: "absolute",
        backgroundColor: "#ffff",
        height: 200,
    },
    text_title:{
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
    }
});