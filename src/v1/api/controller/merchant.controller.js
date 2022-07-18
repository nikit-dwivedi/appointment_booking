const merchantModel = require('../model/merchant.models')
const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant,addBuissness} = require('../helpers/merchant.helpers')




module.exports = {

    merchantRegistration: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { email } = req.body
            const merchantCheck = await merchantModel.findOne({ email })
            if (merchantCheck) {
                badRequest(res, "merchant already registerd");
            }
            const saveData = await addMerchant(req.body);
            saveData ? success(res, "merchant registered successfully",saveData) : badRequest(res, "bad request");
        } catch (err) {
            unknownError(res, "unknown error");
        }
    },

    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const { email, password } = req.body
            const merchant = await merchantModel.findOne({ email })
            if (!merchant) {
                badRequest(res, "invalid email or password");
            }
            if (await checkEncryption(password, merchant.password)) {
                const token = await generateMerchantToken(merchant)
                merchant.isLogin = true
                merchant.save()
                success(res, "login successful", token);
            }
            badRequest(res,"invalid email or password");
        } catch (err) {
            unknownError(res, "unknown error")
        }
    },

    getUserById: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization)
            const userData = await merchantModel.findOne({ merchantId: tokenData.merchantId });
            console.log(userData);
            userData ? success(res, "success", userData) : badRequest(res, "user not found");
        } catch (error) {
            unknownError(res, "unknown error");
        }
    },

    logout: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const tokenData = parseJwt(req.headers.authorization)
            const merchantData = await merchantModel.findOne({ merchantId: tokenData.merchantId })
            if (merchantData.isLogin) {
                merchantData.isLogin = false
                merchantData.save()
                success(res, "logout successful")
            }
            badRequest(res, "you need to login first")
        } catch (err) {
            res.send(err.message)
        }
       
    }, 
    editRegister: async(req,res)=>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return badRequest(res,"bad request")
            }
            const buisnessData = await addBuissness(req.body)
            console.log(buisnessData);
            const data = {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                password:req.body.password,
                mobileNum:req.body.mobileNum,
                merchantType:req.body.merchantType,
                buisnessData:buisnessData
                
                
                
            }
           console.log("+===============================+",data);
            const tokenData = parseJwt(req.headers.authorization)

            const merchantData = await merchantModel.findOneAndUpdate({merchantId:tokenData.merchantId},data,{new:true})
            console.log(merchantModel);
            if(merchantData==null){
                badRequest(res,"merchant not found")
            }
            else{
            console.log(merchantData);
            success(res,"details update sucessfully",merchantData)
            }

        }catch(err){
            res.send(err.messgae)
        }
    },
    getAllMerchant: async (req,res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return badRequest(res,"badrequest")
            }
            const allMerchant = await merchantModel.find()
            console.log(allMerchant);
            res.send({ status: true, statusCode: "200", subcode: "success", data:allMerchant })
            
        }catch(err){
            console.log(err);
          res.send(err)
        }
    
},
// buissnessRegister: async (req, res) => {
//     try {
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             return badRequest(res, "bad request")
//         }
//         // const { merchantId } = req.body
//         // console.log(merchantId);
//         const tokenData = parseJwt(req.headers.authorization)
//     const buissnessCheck = await merchantModel.findOneAndUpdate({merchantId:tokenData.merchantId}, addBuissness,{new:true})
//     console.log(buissnessCheck);
//     // console.log(addBuissness);
//         if (buissnessCheck==null) {
//             console.log(buissnessCheck);
//             return badRequest(res, "buisness not found")
//         }
//         else {
//             const saveData = await addBuissness(req.body);
//             success(res,"details update sucessfully",saveData,buissnessCheck)
//                 console.log(saveData);
//         }


//     } catch (err) {
//         console.log(err);
//         unknownError(res, "unknown error")
//     }
// },
// getBuisnessById: async (req, res) => {
//     try {
//         const error = validationResult(req)
//         if (!error.isEmpty()) {
//             badRequest(res, "bad request")
//         }
//         const tokenData = parseJwt(req.headers.authorization)
//         const userData = await merchantModel.findOne({ buisnessId: tokenData.merchantId });
//         userData ? success(res, "success", userData) : badRequest(res, "user not found");

//     } catch (error) {
//         unknownError(res, "unknown error")
//     }
// }

}