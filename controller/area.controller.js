const {getFromAI,showImage} =require('../utils/ai')
const areaController={}

areaController.makeResult=async(req,res)=>{
  try{
    const {date,city,country,weather,kind}=req.body;
    console.log(req.body,'mainsssssssss')
    let result = await getFromAI(date,city,country,weather,kind)
    let image= await getFromAI(city)
    
console.log(image,'result')
    res.status(200).json({data:result})
  }catch(error){
console.log(error,'error!!!!!!!!!!!!')
}
}

module.exports=areaController