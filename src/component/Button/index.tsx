import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
  isAbout: boolean;
  onPress: () => void;
};

export default function Button({ label, isAbout, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isAbout ? styles.buttonContainer1 : styles.buttonContainer}
    >
      <Text style={styles.textContainer}>{label}</Text>
    </TouchableOpacity>
  );
}
