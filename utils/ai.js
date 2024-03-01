
const OpenAI = require('openai');
const fs = require('fs');
require("dotenv").config();

console.log(process.env.OPEN_AI_KEY1, 'API Key 확인');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY1
});


const getRestaurantFromAI = async (date, country, city, weather, kind) => {
  try {
    // 요청할 정보 형식을 텍스트로 명시적으로 기술
    const promptText = `As a guide who knows the best restaurants in ${city}, ${country}, provide detailed recommendations. For each restaurant, include its name, location, address, a brief description, and its coordinates (latitude and longitude). The information should be structured in a clear, concise format without using order numbers.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: promptText },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest: Based on the above information, please provide information on 5 good restaurants.` },
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error creating chat completion:', error);
  }
}




//----------------------------------------------------

const getRestaurantFromAI = async (date, country, city, weather, kind) => {
  try {
    // 요청할 정보 형식을 텍스트로 명시적으로 기술


    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a guide who knows the best restaurants in ${city}, ${country}.` },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest: Request: Without order numbers, please provide information on 5 good restaurants including the restaurant's name, location, address, description, latitude, and longitude. ` },
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error creating chat completion:', error);
  }
}






 module.exports = { getFromAIAndSaveAsJSON ,getRestaurantFromAI };