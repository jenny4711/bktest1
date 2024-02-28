
const areaController={}
const {createObj}=require('../utils/createObj')
const {getFromAIAndSaveAsJSON,getRestaurantFromAI} = require('../utils/ai')
areaController.makeResult=async(req,res)=>{
  try{
    const {date,city,country,weather,kind}=req.body;
    console.log(req.body,'mainsssssssss')
 
    let result =await getFromAIAndSaveAsJSON(date,city,country,weather,kind);
    let resultR =await getRestaurantFromAI(date,city,country,weather,kind);
    console.log(result,'result')
    console.log(resultR,'resultR')
    res.status(200).json({data:result,data2:resultR})
  }catch(error){
console.log(error,'error!!!!!!!!!!!!')
}
}

module.exports=areaController