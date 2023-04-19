import { StyleSheet, Dimensions } from 'react-native';
export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content_sub: {
        padding: 0
    },
    content_image: {
        resizeMode: 'contain',
        height: 170,
        opacity: 0.8
    },
    content_text: {
        color: '#FFFFFF',
        padding: 15,
        flex: 1,
        fontWeight: '500',
        fontSize: 14
    },
    content_text1: {
        color: '#000000',
        padding: 10,
        fontWeight: '500',
        fontSize: 14
    },
    content_text2: {
        color: '#000000',
        padding: 10,
        fontWeight: '700',
        fontSize: 14,
        marginBottom:15
    }
});