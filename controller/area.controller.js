const {getFromAI} =require('../utils/ai')
const areaController={}

areaController.makeResult=async(req,res)=>{
  try{
    const {date,city,country,weather,kind}=req.body;
    console.log(req.body,'mainsssssssss')
    let result = await getFromAI(date,city,country,weather,kind)
    
console.log(result,'result')
    res.status(200).json({data:result})
  }catch(error){
console.log(error,'error!!!!!!!!!!!!')
}
}

module.exports=areaController