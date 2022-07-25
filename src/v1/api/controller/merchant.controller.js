const merchantModel = require('../model/merchant.models')
const { validationResult } = require('express-validator')
const bookindAppoinment = require('../model/booking')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant} = require('../helpers/merchant.helpers')
const { changeBookingStatus } = require('../helpers/booking.helpers')
    





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
            const data = req.body
            const finaldata = {
                monday:req.body.monday,
                tuesday:req.body.tuesday,
                wednesday:req.body.wednesday,
                thursday:req.body.thursday,
                friday:req.body.friday,
                staurday:req.body.staurday,
                sunday:req.body.sunday

            }
            const tokenData = parseJwt(req.headers.authorization);
            const editMerchant = await merchantModel.findOneAndUpdate({merchantId:tokenData.merchantId},data,{new:true})
            return editMerchant ?  success(res,"details update sucessfully",editMerchant): badRequest(res,"bad Request ")

        }catch(err){
            res.send(err.message)
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
            return allmerchant ? success(res,"all merchanr",allMerchant):badRequest(res,"something went wrong")

        } catch (err) {
            console.log(err);
            res.send(err.message)
        }

    },
    changeBooking: async(req,res)=>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return badRequest(res,"bad Request")
            }
            const data ={
                bookingId:req.body.bookingId,
                status:req.body.status
            }
            console.log(data);
                const changeBookingStatus = await bookindAppoinment.findByIdAndUpdate(data.bookingId,data,{new:true})
                console.log(changeBookingStatus.id);
                if(data.bookingId===changeBookingStatus.id){
            return changeBookingStatus ? success(res,"bookin status change successfully",changeBookingStatus):badRequest(res,"bad Request")
            }
            else{
                return badRequest(res,"pls emnter valid id")
            }
        }catch(err){
            return badRequest(res,"something went  wrong")
                 }
    },
  

    
}