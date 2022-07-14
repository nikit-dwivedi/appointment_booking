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
            const {merchantId} = req.body
            console.log(merchantId);
            const buissnessCheck = await buisnessModel.findOne({merchantId})
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
           const buissnessCheck = await buisnessModel.findOne({buisnessId})
           if(!buissnessCheck){
            badRequest(res,"pls register your buissness first")
        }
        else{
            const updateData = updateBuissness(req.body)
            success(res,"buissness details update successfully",updateData)
        }
      }catch(err){
            unknownError(res,"unknown error")
              
        }
    }
    
}