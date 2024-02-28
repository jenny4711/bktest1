
const areaController={}
const {createObj}=require('../utils/createObj')
const {getFromAIAndSaveAsJSON} = require('../utils/ai')
areaController.makeResult=async(req,res)=>{
  try{
    const {date,city,country,weather,kind}=req.body;
    console.log(req.body,'mainsssssssss')
    // let result = await getFromAI(date,city,country,weather,kind)
    let result =await getFromAIAndSaveAsJSON(date,city,country,weather,kind);
//     const tipsArray = result.split('\n').map(tip => tip.trim()).filter(tip => tip.length > 0);
//     const resultObj=createObj(tipsArray)
// console.log(resultObj,'result!!!!!!!!!!!dddd')
    


    res.status(200).json({data:result})
  }catch(error){
console.log(error,'error!!!!!!!!!!!!')
}
}

module.exports=areaController