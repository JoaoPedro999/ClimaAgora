import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ABC7EB",
  },

  secondaryContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
    flexDirection: "row",
  },

  //Localizações salvas
  forthContainer: {
    backgroundColor: "#B6D6F2",
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  //Container Home/Salve sua Localização
  thirdcontainer: {
    padding: 30,
    height: "30%",
    backgroundColor: "#85AEDD",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
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

  //Tabela "Previsão para os próximos dias"
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

  //Texto dentro da tabela "Previsão para os próximos dias"
  forecastDate: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  forecastTemp: {
    fontSize: 16,
    marginBottom: 5,
  },

  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //Texto e container "Previsão para os próximos dias"
  forecastTitle: {
    textAlign: "center",
    marginBottom: 5,
    padding: 30,
    height: 60,
    backgroundColor: "#B6D6F2",
    borderRadius: 24,
    padding: 15,
    margin: 20,
    fontSize: 18,
    marginBottom: 5,
  },
  //Texto do clima e grau
  tempContainer: {
    alignItems: "flex-start",
    left: "5%",
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

  //estilização da caixa de texto "Pesquisar Localização"
  input: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#EDF2F7",
    width: "96%",
    marginBottom: 15,
    marginTop: 25,
    marginLeft: "2%",
  },

  //estilização do botão "Salvar Localização"
  btn: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#EDF2F7",
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
    width: "40%",
    height: 120,
    backgroundColor: "#85AEDD",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
    marginBottom: 5,
    borderRadius: 20,
  },

  //Estilização do card que mostra a velocidade do vento
  vento: {
    width: "40%",
    height: 120,
    backgroundColor: "#85AEDD",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    borderRadius: 20,
    marginBottom: 5,
  },

  cartao: {
    color: "black",
    paddingTop: 10,
    fontSize: 20,
  },

  //Estilização para a area dos cards
  FlatList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  //estilização das imagens
  wimage: {
    width: 180,
    height: 160,
  },

  iconContainer: {
    position: "absolute",
    top: -50,
    left: "50%",
    marginLeft: -30,
    zIndex: 1,
  },
});

export default styles;
