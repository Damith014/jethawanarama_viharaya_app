import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get("window").width;
export const styles=StyleSheet.create({
    container:{
        flex: 10, backgroundColor: "#ffff"
    },
    view:{
        flex: 1,
        marginHorizontal: 16,
        top: -62,
        paddingTop: 15,
        width: windowWidth - 32,
        borderRadius: 6,
        position: "absolute",
        backgroundColor: "#ffffff",
        height: "110%",
      }
});