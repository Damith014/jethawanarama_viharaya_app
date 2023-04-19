import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"

    },
    logoContainer: {
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "#FFFFFF"
    },
    spinnerTextStyle: {
        color: '#000'
    },
    iconsContainer: {
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        marginBottom: 40
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30

    },
    btnContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        letterSpacing: 20
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginRight: 20

    },
    iconContainerS: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginRight: 20,
        marginTop:10

    },
    iconSubT: {
        fontWeight: "600",
        fontSize: 12,
        lineHeight: 17,
        color: "#86868A"
    },
    iconSub: {
        fontWeight: "700",
        fontSize: 12,
        lineHeight: 17,
        color: "#86868A"
    },
    iconSubTS: {
        fontWeight: "600",
        fontSize: 12,
        lineHeight: 17,
        color: "#86868A"
    },
    iconSubS: {
        fontWeight: "700",
        fontSize: 12,
        lineHeight: 17,
        color: "#86868A"
    },
    labelContainer: {
        fontSize: 15,
        color: '#8A8A8E'
    },
    radioContainer: {
        marginTop: 50
    },
    buttonContainer: {
        marginTop: 90
    },
    logoMain: {
        width: 150,
        height: 150,
    },
    logoSub: {
        width: 142,
        height: 46
    },
    title: {
        fontWeight: "400",
        fontSize: 24,
        lineHeight: 35,
        marginTop: 25,
        marginRight: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    subTitle: {
        color: "#7B7B7B",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
        marginTop: 5
    }
});