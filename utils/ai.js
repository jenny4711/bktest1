const OpenAI = require('openai');
const OPEN_AI_KEY1 = process.env.OPEN_AI_KEY1;
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
        
        요청: country: ${country},city:${city}여행 관련 관광지 정보를 JSON 파일 형식으로 받을 수 있도록 해주세요. 각 관광지에는 장소, 주소, 설명, 이미지 URL이 포함되어야 합니다.`},
      ],
    });
  
    const data = {
      date: date,
      destination: city,
      interest: kind,
      suggested_spots: response.choices[0].message.content.split('\n'), // 개행을 기준으로 분리하여 배열로 변환
    };
    fs.writeFileSync('suggested_spots.json', JSON.stringify(data, null, 2));
    console.log('JSON file saved successfully.');
console.log('result',response.choices[0].message.content)
    return response.choices[0].message.content



  } catch (error) {
    console.error('Error creating chat completion:', error);
  }
};






module.exports={getFromAI}