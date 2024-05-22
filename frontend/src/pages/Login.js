import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../styles/styles";

export default function App() {
  const iconPassword = require("../assets/images/iconpassword.png");
  const icon = require("../assets/images/iconlogin.png");
  const iconUser = require("../assets/images/iconuser.png");

  return (
    <View style={styles.general}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={icon} />
        </View>

        <Text style={styles.Title}>Login</Text>

        <View style={styles.areaInputs}>
          <Image style={styles.icon} source={iconUser} />
          <TextInput
            style={styles.Input}
            placeholder="Usuário"
            keyboardType="text"
          />
        </View>

        <View style={styles.areaInputs}>
          <Image style={styles.iconsenha} source={iconPassword} />
          <TextInput
            style={styles.Input}
            placeholder="Senha"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.TouchableOpacity}>
          <Text style={styles.txt}>LOGAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
