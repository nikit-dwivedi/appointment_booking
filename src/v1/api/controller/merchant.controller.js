const merchantModel = require('../model/merchant.models')
const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant, addBuissness } = require('../helpers/merchant.helpers')




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
                return badRequest(res, "merchant already registerd");
            }
            const saveData = await addMerchant(req.body);
            console.log("================>",req.body);
            return saveData ? success(res, "merchant registered successfully", saveData) : badRequest(res, "bad request");
        } catch (err) {
            return unknownError(res, "unknown error");
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
                return badRequest(res, "invalid email or password");
            }
            if (await checkEncryption(password, merchant.password)) {
                const token = await generateMerchantToken(merchant)
                merchant.isLogin = true
                merchant.save()
                return success(res, "login successful", token);
            }
            return badRequest(res, "invalid email or password");
        } catch (err) {
            return unknownError(res, "unknown error")
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
            return userData ? success(res, "success", userData) : badRequest(res, "user not found");
        } catch (error) {
            return unknownError(res, "unknown error");
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
            return badRequest(res, "you need to login first")
        } catch (err) {
            res.send(err.message)
        }

    },
    editRegister: async (req, res) => {
        try {
            console.log("----------------------");
            const errors = validationResult(req)
            console.log("+=_________=+");
            if (!errors.isEmpty()) {
                console.log("----------------");
                return badRequest(res, "bad request")
            }
            //  const buissness = await addBuissness(req.body)
            // console.log("+++++++++++++++++++++++++",req.body)
            console.log("__________+");
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                mobileNum: req.body.mobileNum,
                 buisness:{
                  profilePic:req.body.profilePic,
                  buisnessPhoto:req.body.buisnessPhoto,
                     availability:{
                        monday:req.body.monday,
                        tuesday:req.body.tuesday,
                        wednesday:req.body.wednesday,
                        thursday:req.body.thursday,
                        friday:req.body.friday,
                        staurday:req.body.staurday,
                        sunday:req.body.sunday,
                        
                 },
                     description:req.body.description,
                     location:req.body.location,
                     basePrice:req.body.basePrice,
                     buisnessType:req.body.buisness,
                     buisnessSubType:req.body.buisnessSubType,
                },
              


                }
               
                  //addBuissness:req.body.addBuissness
            
            // const buisness = {
            //     profilePic:req.body.profilePic,
            //     buisnessPhoto:req.body.buisnessPhoto,
            //     description:req.body.description,
            //     location:req.body.location,
            //     basePrice:req.body.basePrice,
            //     buisnessType:req.body.buisness,
            //     buisnessSubType:req.body.buisnessSubType
            // }
            // const availaibility = {
            //     monday:req.body.monday,
            //     tuesday:req.body.tuesday,
            //     wednesday:req.body.wednesday,
            //     thursday:req.body.thursday,
            //     friday:req.body.friday,
            //     staurday:req.body.staurday,
            //     sunday:req.body.sunday
            // }
            console.log("+===============================+", data);
            const tokenData = parseJwt(req.headers.authorization)
                  console.log("HHHHHHHHHHOOOOOOOOOOOOOOOOOOOOOOOO000000OP{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}",tokenData);
            const merchantData = await merchantModel.findOneAndUpdate({ merchantId:tokenData.merchantId},data,{new:true })
            console.log("+++++++++++++++++====================+++++++++++==",merchantData);
            if (merchantData == null) {
                return badRequest(res, "merchant not found")
            }
            else {
                console.log(merchantData);
                return success(res, "details update sucessfully", merchantData)
            }

        } catch (err) {
            res.send(err.messgae)
        }
    },
    getAllMerchant: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "badrequest")
            }
            const allMerchant = await merchantModel.find()
            console.log(allMerchant);
            res.send({ status: true, statusCode: "200", subcode: "success", data: allMerchant })

        } catch (err) {
            console.log(err);
            res.send(err.message)
        }

    },
     //buissnessRegister: async (req, res) => {
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