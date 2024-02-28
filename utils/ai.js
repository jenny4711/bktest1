// const OpenAI = require('openai');

// const fs = require('fs')
// require("dotenv").config()
// console.log(process.env.OPEN_AI_KEY1,'!!!!!!!!!@@@@')
// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY1
// });

// const getFromAI = async (date,country,city,weather,kind) => {
 
  
//   try {
    
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: `You are a travel guide for ${city}, ${country}.` },
//         { 
//           role: 'user', 
//           content: `Date: ${date}
//           Interests: ${kind}
//           Weather: ${weather}
//           Location: ${city}, ${country}
//           Request: Based on the above information, please provide 4 travel destinations with location, address, description, latitude, and longitude included. Please provide the information in Korean.`
//         },
//       ],
//       functions: [{
//         name: "tour",
//         description: "get infomation of location.please speak in Korean.",
//         parameters: {
//           type: "object",
//           properties: {
//             location: {
//               type: "string",
//               description: "The location,e.g.경복궁."
//             },
//             address: {
//               type: "string",
//               description: `address of the location,e.g.대한민국 서울특별시 종로구 사직로 161.`
//             },
//             latitude: {
//               type: "string",
//               description: "The latitude of the Location,e.g.37.579617"
//             },
//             longigude: {
//               type: "string",
//               description: "The longigude of the Location,e.g.126.977041"
//             },
//             description: {
//               type: "string",
//               description: "The explain of the Location"
//             },
//             videoUrl:{
//               type:"string",
//               description:"Please provide currently available video of the location in youtube.",
//             }
//           },
//           required: ["location", "address", "latitude", "longigude", " description","imgeUrl"]
//         }
//       }],
//       function_call:"auto"
//     });
  
// console.log('result',response.choices[0].message.content,'data')
// const res = response.choices[0].message
// let completionArguments;
// if(!res.content ){
//   const functionCallName = res.function_call.name;
//   console.log(functionCallName,'name!!!!!!!!!')
//   if(functionCallName === "tour"){
//   completionArguments =JSON.parse(res.function_call.arguments)
//     console.log(completionArguments,'arg!!!!!!!!!!!!!!!!!!!!!!!!!')
//   }
// }
//     return completionArguments



//   } catch (error) {
//     console.error('Error creating chat completion:', error);
//   }
// };

//----------------------------------------------------





// const OpenAI = require('openai');
// const fs = require('fs');
// require("dotenv").config();
// console.log(process.env.OPEN_AI_KEY1, '!!!!!!!!!@@@@');

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY1
// });

// const getFromAI = async (date, country, city, weather, kind) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: `You are a travel guide for ${city}, ${country}.` },
//         { 
//           role: 'user', 
//           content: `Date: ${date}
//           Interests: ${kind}
//           Weather: ${weather}
//           Location: ${city}, ${country}
//           Request: Based on the above information, please provide 4 travel destinations with location, address, description, latitude, and longitude included. Please provide the information in Korean.`
//         },
//       ]
//     });

//     // Log the result for debugging
//     console.log('Result', response.choices[0].message.content, 'Data');

//     // Parse the result and extract travel destinations information
//     // Assuming that the model returns the information in a structured format
//     // You might need to adjust the parsing logic based on the actual output format
//     const destinations = []; // This array will hold the extracted travel destinations
//     const regexPattern = /location: (.*?), address: (.*?), latitude: (.*?), longitude: (.*?), description: (.*?)(?=, location|$)/g;
//     let match;
//     while ((match = regexPattern.exec(response.choices[0].message.content))) {
//       destinations.push({
//         location: match[1].trim(),
//         address: match[2].trim(),
//         latitude: match[3].trim(),
//         longitude: match[4].trim(),
//         description: match[5].trim(),
//       });
//     }

//     if (destinations.length > 0) {
//       console.log(destinations, 'Destinations Extracted!');
//       return destinations;
//     } else {
//       console.error('No destinations extracted, please check the response and adjust the parsing logic.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error creating chat completion:', error);
//     return null;
//   }
// };

// module.exports = { getFromAI };




const OpenAI = require('openai');
const fs = require('fs');
require("dotenv").config();

console.log(process.env.OPEN_AI_KEY1, 'API Key 확인');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY1
});

// 여행 명소 정보를 요청하고 JSON 파일로 저장하는 함수
const getFromAIAndSaveAsJSON = async (date, country, city, weather, kind) => {
  try {


    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a travel guide for ${city}, ${country}.` },
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest: Based on the above information, please provide 4 travel destinations with location, address, description, latitude, and longitude included. Please provide the information in Korean.` },
      ]
    });

    // API 응답을 객체 배열로 변환 (여기서는 응답 형식에 따라 파싱 로직을 조정해야 할 수 있음)
    const destinations = parseResponseToObjects(response.choices[0].message.content);

    return destinations
  } catch (error) {
    console.error('Error creating chat completion:', error);
   
  }
}
const parseResponseToObjects = (responseContent) => {
  // 이 예시에서는 응답 형식과 일치하는 간단한 파싱 로직을 구현합니다.
  // 실제 응답 형식에 따라 로직을 조정해야 할 수 있습니다.
  
  // 예시 응답 문자열: "location: 경복궁, address: 서울특별시 종로구 사직로 161, latitude: 37.579617, longitude: 126.977041, description: 대한민국의 대표적인 궁궐 중 하나입니다."
  const regexPattern = /location: (.*?), address: (.*?), latitude: (.*?), longitude: (.*?), description: (.*?)(,|$)/g;
  let match;
  const destinations = [];

  while ((match = regexPattern.exec(responseContent))) {
    destinations.push({
      location: match[1].trim(),
      address: match[2].trim(),
      latitude: match[3].trim(),
      longitude: match[4].trim(),
      description: match[5].trim(),
    });
  }

  return destinations;
};



// 함수 실행



 module.exports = { getFromAIAndSaveAsJSON  };