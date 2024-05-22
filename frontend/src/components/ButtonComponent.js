import { TouchableOpacity } from "react-native";
import styles from "../styles/styles";

export default function BtnComponent({ onPress, children }) {
  return (
    //Botão para salvar a localização
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
