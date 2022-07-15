//const merchantRegisterModel = require('../model/merchantBuisnessRegistration.model')
const buisnessModel = require('../model/merchantBuisnessRegistration.model')
const { validationResult } = require('express-validator')
const {parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addBuissness ,updateBuissness} = require('../helpers/merchantbuisness.helper')


module.exports ={
    buissnessRegister: async(req,res) =>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return badRequest(res,"bad request")
            } 
            console.log("======================NOO================================");
            const {merchantId} = req.body
            console.log(merchantId);
            const tokenData = parseJwt(req.headers.authorization)
            console.log("=+++++++++++++++=",tokenData);
            const buissnessCheck = await buisnessModel.findOne({ merchantId:tokenData. merchantId })
            console.log("---------------------------",buissnessCheck);
            if(buissnessCheck){
                console.log(buissnessCheck)
                badRequest(res,"buisness already exist")
            }
            else{
            const saveData =  await addBuissness(req.body);
            console.log(saveData);
            console.log("==========================",saveData);
            saveData? success(res,"merchant register successfully",saveData):badRequest(res, "bad request")
            }                                  
        }catch(err){
            console.log(err);
            unknownError(res,"unknown error")
        }
    },
  getAll : async (req,res)  =>{
    try{
        const errors = validationResult(req)
            if(!errors.isEmpty()){
                return badRequest(res,"badrequest")
            }
            const buissness = await buisnessModel.find()
            console.log();
            res.send(buissness)
        
    }catch(err){
        console.log(err.message)
    }
  },
 updateRegistration: async(req,res)=>{
       try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return badRequest(res,"bad request")
        }
        const data = {
                profilePic:req.body.profilePic,
                biussnessPhoto:req.body.biussnessPhoto,
                buisnessName:req.body.buisnessName,
                designation:req.body.designation,
                avalaibility:req.body.avalaibility,
                description:req.body.description,
                location:req.body.location,
                basePrice:req.body.basePrice,
        }
        console.log(data);
        const tokenData = parseJwt(req.headers.authorization)
        console.log("+______________________+",tokenData);
        const buisnessData = await buisnessModel.findOneAndUpdate({merchantId:tokenData.merchantId},data,{new:true})
        console.log(tokenData.merchantId);
        console.log(buisnessData);
       if(buisnessData==null){
        badRequest(res,"buissness not found")
       }
       else{
        console.log(buisnessData);
        success(res,"details update sucessfully",buisnessData)
       }

      }catch(err){
        console.log(err);
            unknownError(res,"unknown error")
              
        }
    },
    getBuisnessById: async (req,res)=>{
        try{
            const error = validationResult(req)
            if(!error.isEmpty()){
                badRequest(res,"bad request")
            }
            const tokenData = parseJwt(req.headers.authorization)
            const userData = await buisnessModel.findOne({ merchantId: tokenData.merchantId });
            userData ? success(res, "success", userData) : badRequest(res, "user not found");

        }catch(error){
            unknownError(res,"unknown error")
        }
    }
    
}