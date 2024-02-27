const {getFromAI,showImage} =require('../utils/ai')
const areaController={}

areaController.makeResult=async(req,res)=>{
  try{
    const {date,city,country,weather,kind}=req.body;
    console.log(req.body,'mainsssssssss')
    let result = await getFromAI(date,city,country,weather,kind)
   let img =await showImage(result.location)
    
console.log(result.location,'result')
console.log(img,'img!!!!!!!!')
    res.status(200).json({data:result,img})
  }catch(error){
console.log(error,'error!!!!!!!!!!!!')
}
}

module.exports=areaController