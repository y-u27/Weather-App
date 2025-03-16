import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  console.log(apiKey);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiCall = async () => {
    console.log("都市検索:", city);

    //空の状態で検索しないようにする
    if (!city.trim()) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},JP&appid=${apiKey}&units=metric&lang=ja`
      );
      //データ保存
      setWeather(response.data);
    } catch (error) {
      console.error("天気情報取得エラー", error);
      setWeather(null);
    }
  };

  return (
    <>
      <VStack spacing={6} p={8} align="center">
        {/* ヘッダー */}
        <Text fontSize="2xl" fontWeight="bold">
          天気予報アプリ
        </Text>

        {/* 検索ボックス */}
        <HStack>
          <Input
            placeholder="都市名を入力"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            w="250px"
            borderRadius="md"
            boxShadow="sm"
          />
          <Box>
            <Button colorScheme="blue" onClick={apiCall}>
              検索
            </Button>
          </Box>
        </HStack>

        {/* 天気情報カード */}
        {weather && (
          <Card w="300px" p={4} boxShadow="lg" borderRadius="md">
            <CardBody textAlign="center">
              <Text fontSize="xl" fontWeight="bold">
                {weather.name}
              </Text>
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                w="50px"
                m="auto"
              />
              <Text fontSize="4xl" fontWeight="bold">
                {weather.main.temp}
              </Text>
              <Text color="gray.500">{weather.weather[0].description}</Text>
            </CardBody>
          </Card>
        )}
      </VStack>
    </>
  );
};

export default WeatherApp;
