
const OpenAI = require('openai');
const fs = require('fs');
require("dotenv").config();

console.log(process.env.OPEN_AI_KEY1, 'API Key 확인');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY1
});


const getFromAIAndSaveAsJSON = async (date, country, city, weather, kind) => {
  try {


    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a travel guide for ${city}, ${country}.` },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest: Based on the above information, please provide 4 travel destinations with location, address, description, latitude, and longitude included. Please provide the information in Korean.` },
      ]
    });

   

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error creating chat completion:', error);
   
  }
}






//----------------------------------------------------

const getRestaurantFromAI = async (date, country, city, weather, kind) => {
  try {


    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a guide who knows the best restaurants in ${city}, ${country}.` },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest: Based on the above information, please provide 5 good restaurant with restaurant's name, location, address, description, latitude, and longitude included. Please provide the information in Korean.` },
      ]
    });

   

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error creating chat completion:', error);
   
  }
}






 module.exports = { getFromAIAndSaveAsJSON ,getRestaurantFromAI };