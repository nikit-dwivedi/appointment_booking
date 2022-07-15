//const merchantRegisterModel = require('../model/merchantBuisnessRegistration.model')
const buisnessModel = require('../model/merchantBuisnessRegistration.model')
const { validationResult } = require('express-validator')
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
            const buissnessCheck = await buisnessModel.findOne({ merchantId:tokenData. merchantId })
            if(buissnessCheck){
                badRequest(res,"buisness already exist")
            }
            else{
            const saveData = await addBuissness(req.body);
            console.log("==========================",saveData);
            saveData? success(res,"merchant register successfully",saveData):badRequest(res, "bad request")
            }                                  
        }catch(err){
            unknownError(res,"unknown error")
        }
    },
    updateRegistration: async(req,res)=>{
        try{
           const errors = validationResult(req)
           if(!errors.isEmpty()){
            return badRequest(res,"bed request")
           }
           const{buisnessId} = req.body
           const tokenData = parseJwt(req.headers.authorization)
           const buissnessCheck = await buisnessModel.findOne({buisnessId:tokenData.buisnessId})
           if(!buissnessCheck){
            badRequest(res,"pls register your buissness first")
        }
        else{
            const data = {
                profilePic:req.body.profilePic
            }
            success(res,"buissness details update successfully",updateData)
        }
      }catch(err){
            unknownError(res,"unknown error")
              
        }
    }
    
}