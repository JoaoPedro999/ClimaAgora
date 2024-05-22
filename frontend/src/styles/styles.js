import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ABC7EB",
  },

  secondaryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 30,
    flexDirection: "row",
  },

  forthContainer: {
    backgroundColor: "#B6D6F2",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  thirdcontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 30,
    height: "32%",
    backgroundColor: "#85AEDD",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    marginBottom: 10,
  },

  //texto da localização
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },

  // Estilização do texto para a temperatura e condição no Drawer
  weatherCond: {
    fontSize: 16,
    color: "#555",
  },
  weatherTitle: {
    fontSize: 16,
  },

  forecastContainer: {
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 30,
    height: 280,
    backgroundColor: "#B6D6F2",
    borderRadius: 24,
    padding: 15,
    margin: 20,
  },

  forecastItem: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },

  forecastDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 16,
    marginBottom: 5,
  },
  forecastCond: {
    fontSize: 14,
    color: "#555",
  },

  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  forecastTitle: {
    textAlign: "center",
    marginBottom: 5,
    padding: 30,
    height: 50,
    backgroundColor: "#B6D6F2",
    borderRadius: 24,
    padding: 15,
    margin: 20,
    fontSize: 18,
    marginBottom: 5,
  },

  //estilização do texto que mostra a temperatura em graus
  temp: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#2D3748",
  },

  //estilização do texto que mostra o nome da cidade pesquisada
  city: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 30,
  },

  //estilização da condição "clear" ou "haze"
  cond: {
    fontSize: 18,
    color: "#2D3748",
  },

  //estilização da caixa de texto
  input: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#EDF2F7",
    width: "96%",
    marginBottom: 20,
    marginTop: 30,
    marginLeft: "2%",
  },

  //estilização do botão "Salvar Localização"
  btn: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#85AEDD",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 50,
    marginLeft: "25%",
  },

  //Estilização para o drawer
  drawerSection: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#06138F",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  //Estilização do card que mostra a umidade do ar
  umidade: {
    width: 150,
    height: 120,
    backgroundColor: "#85AEDD",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    marginBottom: 10,
    borderRadius: 24,
  },

  //Estilização do card que mostra a velocidade do vento
  vento: {
    width: 150,
    height: 120,
    backgroundColor: "#85AEDD",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    borderRadius: 24,
    marginBottom: 10,
  },

  cartao: {
    color: "black",
    paddingTop: 5,
    fontSize: 20,
  },

  FlatList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  //estilização das imagens
  wimage: {
    width: 180,
    height: 150,
  },

  areaInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    position: "absolute",
    top: -50,
    left: "50%",
    marginLeft: -30,
    zIndex: 1,
  },

  //config do input
  Input: {
    width: "80%",
    letterSpacing: 1,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    borderColor: "#000",
    margin: 10,
  },

  //Estilização do botão de login
  TouchableOpacity: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#85AEDD",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
