const OpenAI = require('openai');

const fs = require('fs')
require("dotenv").config()
console.log(process.env.OPEN_AI_KEY1,'!!!!!!!!!@@@@')
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY1
});

const getFromAI = async (date,country,city,weather,kind) => {
 
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `당신은  ${city}${country} 투어리스트입니다.` },
        { role: 'user', content: ` 날짜: ${date}

        관심사: ${kind}
        
        날씨: ${weather}
        지역:${city} ,${country}
        
        요청: 알려드린 정보를 바탕으로 여행 관련 관광지 3곳 이상 정보들 location, address, description, latitude ,longitude 가포함되어야 합니다.한국말로 알려주세요.`},
      ],
      functions: [{
        name: "tour",
        description: "get infomation of location.please speak in Korean.",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The location,e.g.경복궁."
            },
            address: {
              type: "string",
              description: `address of the location,e.g.대한민국 서울특별시 종로구 사직로 161.`
            },
            latitude: {
              type: "string",
              description: "The latitude of the Location,e.g.37.579617"
            },
            longigude: {
              type: "string",
              description: "The longigude of the Location,e.g.126.977041"
            },
            description: {
              type: "string",
              description: "The explain of the Location"
            }
          },
          required: ["location", "address", "latitude", "longigude", " description"]
        }
      }],
      function_call:"auto"
    });
  
console.log('result',response.choices[0].message.content,'data')
const res = response.choices[0].message
let completionArguments;
if(!res.content ){
  const functionCallName = res.function_call.name;
  console.log(functionCallName,'name!!!!!!!!!')
  if(functionCallName === "tour"){
  completionArguments =JSON.parse(res.function_call.arguments)
    console.log(completionArguments,'arg!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
}
    return completionArguments



  } catch (error) {
    console.error('Error creating chat completion:', error);
  }
};






module.exports={getFromAI}