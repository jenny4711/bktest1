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
        { role: 'user', content: `Date: ${date}\nInterests: ${kind}\nWeather: ${weather}\nLocation: ${city}, ${country}\nRequest: Based on the above information, please provide 5 good restaurant with location, address, description, latitude, and longitude included. Please provide the information in Korean.` },
      ]
    });

   

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error creating chat completion:', error);
   
  }
}






 module.exports = { getFromAIAndSaveAsJSON ,getRestaurantFromAI };