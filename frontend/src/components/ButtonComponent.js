import { TouchableOpacity } from "react-native";

export default function BtnComponent({ onPress, children, styles }) {
  return (
    <TouchableOpacity style={styles} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
