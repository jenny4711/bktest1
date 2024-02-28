// const {getFromAI} =require('../utils/ai')
const areaController={}
const {getFromAIAndSaveAsJSON} = require('../utils/ai')
areaController.makeResult=async(req,res)=>{
  try{
    const {date,city,country,weather,kind}=req.body;
    console.log(req.body,'mainsssssssss')
    // let result = await getFromAI(date,city,country,weather,kind)
    let result =await getFromAIAndSaveAsJSON('2024-02-27', 'South Korea', 'Seoul', 'Sunny', 'Culture');
console.log(result,'result!!!!!!!!!!!dddd')
    


    res.status(200).json({data:result})
  }catch(error){
console.log(error,'error!!!!!!!!!!!!')
}
}

module.exports=areaController