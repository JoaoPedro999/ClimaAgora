import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import styles from "../styles/styles";
import moment from "moment";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null); // State para armazenar dados climáticos atuais
  const [location, setLocation] = useState("Nova Odessa"); // State para armazenar o nome da localização
  const [forecastData, setForecastData] = useState(null); // State para armazenar dados da previsão do tempo
  const [errorMsg, setErrorMsg] = useState(null); // State para armazenar mensagens de erro
  const [loading, setLoading] = useState(true); // State para indicar se está carregando

  // Hook para identificar a localização atual do dispositivo
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation(`${latitude},${longitude}`);
      setLoading(false);
    })();
  }, []);

  // Hook para buscar dados climáticos e da previsão do tempo
  useEffect(() => {
    if (!location || typeof location !== "string") return;

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
        setWeatherData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados climáticos:", error);
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
        setForecastData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados da previsão do tempo:", error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [location]);

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

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Renderiza a interface do usuário com os dados climáticos e da previsão do tempo
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
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

export default Homepage;
