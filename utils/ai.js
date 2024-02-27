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
        { role: 'system', content: `너는  ${city}${country} 여행 가이드야.` },
        { role: 'user', content: ` 날짜: ${date}

        관심사: ${kind}
        
        날씨: ${weather}
        지역:${city} ,${country}
        
        요청: 위에 정보를 바탕으로 여행 할곳 3개 만들어주시는데 location, address, description, latitude ,longitude 가포함되어 합니다.한국말로 알려주세요.`},
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
            },
            videoUrl:{
              type:"string",
              description:"Please provide currently available video of the location in youtube.",
            }
          },
          required: ["location", "address", "latitude", "longigude", " description","imgeUrl"]
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