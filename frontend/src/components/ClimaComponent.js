import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import axios from "axios";
import BtnComponent from "./ButtonComponent";
import styles from "../styles/styles";
import moment from "moment";
import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const WeatherComponent = ({ addLocation }) => {
  const [weatherData, setWeatherData] = useState(null); // State para armazenar dados climáticos atuais
  const [location, setLocation] = useState("Londres"); // State para armazenar o nome da localização
  const [forecastData, setForecastData] = useState(null); // State para armazenar dados da previsão do tempo

  // Função para salvar uma localização no Firestore
  const saveLocation = async () => {
    try {
      const locationsCollection = collection(db, "locations"); // Referência à coleção 'locations'
      await addDoc(locationsCollection, {
        name: location, // Adiciona o nome da localização
      });
      addLocation(location); // Chama a função passada por props para adicionar a localização
    } catch (error) {
      console.error("Erro ao salvar a localização:", error); // erro
    }
  };

  // useEffect para buscar dados climáticos e da previsão do tempo quando a localização muda
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: location,
              appid: "f389eea64f8256b7f985d868e3a3de38",
              units: "metric",
            },
          }
        );
        setWeatherData(response.data); // Atualiza o state com dados climáticos
      } catch (error) {
        console.error("Erro ao obter dados climáticos:", error); // erro
      }
    };
    // Função para buscar a previsão do tempo para os próximos 5 dias
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              q: location,
              appid: "f389eea64f8256b7f985d868e3a3de38",
              units: "metric",
            },
          }
        );
        setForecastData(response.data); // Atualiza o state com dados da previsão do tempo
      } catch (error) {
        console.error("Erro ao obter dados da previsão do tempo:", error); // erro
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [location]); // Dependência do useEffect para disparar quando 'location' muda

  // Função para mudar a localização
  const LocationChange = (text) => {
    setLocation(text);
  };

  // Função para obter o ícone do clima com base na condição
  const WeatherImage = (condition) => {
    switch (condition) {
      case "Clouds":
        return require("../assets/images/Cloud.png");
      case "Clear":
        return require("../assets/images/Clear.png");
      case "Rain":
        return require("../assets/images/Rain.png");
      case "Thunderstorm":
        return require("../assets/images/Thunderstorm.png");
      case "Haze":
      case "Fog":
      case "Mist":
        return require("../assets/images/Haze.png");
      default:
        return null;
    }
  };

  // Função para renderizar a previsão do tempo para os próximos 5 dias
  const renderForecast = () => {
    if (!forecastData) return null;

    const groupedForecasts = {};
    // Agrupa a previsão do tempo por data
    forecastData.list.forEach((forecast) => {
      const date = moment(forecast.dt_txt).format("YYYY-MM-DD");
      if (!groupedForecasts[date]) {
        groupedForecasts[date] = {
          date: moment(forecast.dt_txt).format("dddd"),
          minTemp: forecast.main.temp,
          maxTemp: forecast.main.temp,
          condition: forecast.weather[0].main,
        };
      } else {
        if (forecast.main.temp < groupedForecasts[date].minTemp) {
          groupedForecasts[date].minTemp = forecast.main.temp;
        }
        if (forecast.main.temp > groupedForecasts[date].maxTemp) {
          groupedForecasts[date].maxTemp = forecast.main.temp;
        }
      }
    });

    const forecasts = Object.values(groupedForecasts);

    return forecasts.map((forecast, index) => (
      <View key={index} style={styles.forecastItem}>
        <Image
          source={WeatherImage(forecast.condition)}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Text style={styles.forecastDate}>{forecast.date}</Text>
        <Text style={[styles.forecastTemp, { marginLeft: 15 }]}>
          ⬇️ {forecast.minTemp.toFixed()}°C | {forecast.maxTemp.toFixed()}°C ⬆️
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.search}>
          <TextInput
            placeholder="Pesquisar Localização"
            placeholderTextColor={"black"}
            style={styles.input}
            onChangeText={LocationChange}
          />
        </View>

        {weatherData && (
          <View style={styles.thirdcontainer}>
            <Text style={styles.city}>{location}</Text>
            <View style={styles.secondaryContainer}>
              <View style={styles.tempContainer}>
                <Text style={styles.temp}>
                  {weatherData.main.temp.toFixed()}°C
                </Text>
                <Text style={styles.cond}>{weatherData.weather[0].main}</Text>
              </View>

              <Image
                source={WeatherImage(weatherData.weather[0].main)}
                style={styles.wimage}
              />
            </View>
          </View>
        )}

        <BtnComponent styles={styles.btn} onPress={saveLocation}>
          <Text>Salvar Localização</Text>
        </BtnComponent>

        {weatherData && (
          <View style={styles.FlatList}>
            <View style={styles.umidade}>
              <Image source={require("../assets/images/drop.png")} />
              <Text style={styles.cartao}>{weatherData.main.humidity}%</Text>
            </View>
            <View style={styles.vento}>
              <Image source={require("../assets/images/wind.png")} />
              <Text style={styles.cartao}>{weatherData.wind.speed} Km/H</Text>
            </View>
          </View>
        )}

        <Text style={styles.forecastTitle}>
          Previsão para os próximos dias:
        </Text>

        <View style={styles.forecastContainer}>{renderForecast()}</View>
      </ScrollView>
    </View>
  );
};

export default WeatherComponent;
