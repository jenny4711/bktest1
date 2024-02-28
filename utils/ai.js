
const OpenAI = require('openai');
const fs = require('fs');
require("dotenv").config();

console.log(process.env.OPEN_AI_KEY1, 'API Key 확인');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY1
});


const getFromAIAndSaveAsJSON = async (date, country, city, weather, kind) => {
  try {
    const form={
      name:"여행명소 의 이름",
      address:"여행명소 의 주소",
      description:"여행명소 의 설명",
      latitude:"위도",
      longitude:"경도"
     }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a travel guide for ${city}, ${country}.` },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest:알려드린 정보를 바탕으로 , 추천 여행 명소 5곳의 정보를 ${form} 같이 한국어로 알려주세요.` },
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
   const form={
    name:"레스토랑 의 이름",
    address:"레스토랑 의 주소",
    description:"레스토랑 의 설명",
    latitude:"위도",
    longitude:"경도"
   }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a guide who knows the best restaurants in ${city}, ${country}.` },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest:차례 번호 없이, ${form} 같이 좋은 레스토랑 5곳의 정보를 한국어로 알려주세요.` },
      ]
    });

   

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error creating chat completion:', error);
   
  }
}






 module.exports = { getFromAIAndSaveAsJSON ,getRestaurantFromAI };