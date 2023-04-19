import { StyleSheet, Dimensions } from 'react-native';
export const styles = StyleSheet.create({
      content_main: {
            marginRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
      },
      content: {
            resizeMode: 'contain',
            height: 150,
            width: 150
      },
      content_sub: {
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
      },
      content_header_text: {
            fontSize: 20,
            fontWeight: 'bold',
            color: "#000000",
            marginTop: 20,
            opacity: 0.8
      },
      content_sub_text: {
            fontSize: 18,
            fontWeight: '400',
            color: "#000000",
            marginTop: 5,
            opacity: 0.8
      },
});