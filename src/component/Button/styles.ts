import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#007AFF",
    borderRadius: 24,
    textAlign: "center",
    height: 46,
    width: 151,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    fontWeight: "700",
    fontSize: 14,
    color: "#FFFFFF",
  },
  buttonContainer1: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    textAlign: "center",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
});
