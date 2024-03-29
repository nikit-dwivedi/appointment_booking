const merchantModel = require('../model/merchant.models')
const { validationResult } = require('express-validator')
const bookindAppoinment = require('../model/booking')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant, merchantCategoryList, merchantByEmail, merchantById, editMerchant } = require('../helpers/merchant.helpers')
const { changeBookingStatus, markBookingDone, getMerchantBooking, merchantBookingdetailsById } = require('../helpers/booking.helpers')
const { getRating } = require('../helpers/review.helpers')






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
            console.log(req.body);
            const saveData = await addMerchant(req.body);
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
            const merchant = await merchantByEmail(email)
            if (!merchant) {
                return badRequest(res, "invalid email or password");
            }
            if (await checkEncryption(password, merchant.password)) {
                const token = generateMerchantToken(merchant)
                merchant.isLogin = true
                merchant.save()
                return success(res, "login successful", token);
            }
            return badRequest(res, "invalid email or password");
        } catch (err) {
            return unknownError(res, "unknown error")
        }
    },
    getMerchantCategory: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const categoryList = await merchantCategoryList();
            return categoryList ? success(res, "success", categoryList) : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },

    getMerchantById: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization)
            const merchantData = await merchantById(tokenData.merchantId);
            return merchantData ? success(res, "success", merchantData) : badRequest(res, "user not found");
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
            const merchantData = await merchantById(tokenData.merchantId);
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
    editMerchantDetails: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const { merchantId } = parseJwt(req.headers.authorization);
            const editedData = await editMerchant(merchantId, req.body);
            return editedData ? success(res, "details update sucessfully") : badRequest(res, "bad Request ")
        } catch (err) {
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
            return allmerchant ? success(res, "all merchanr", allMerchant) : badRequest(res, "something went wrong")

        } catch (err) {
            console.log(err);
            res.send(err.message)
        }

    },
    changeStatus: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad Request")
            }
            const { bookingId, status } = req.body
            if (status == "rejected") {
                await markBookingDone(bookingId, status);
            }
            const changeStatus = await changeBookingStatus(bookingId, status)
            return changeStatus ? success(res, "bookin status change successfully") : badRequest(res, "bad Request")
        } catch (err) {
            return badRequest(res, "something went  wrong")
        }
    },
    bookingComplete:async(req,res)=>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad Request")
            }
            const { bookingId } = req.body
            const changeStatus = await markBookingDone(bookingId);
            return changeStatus ? success(res, "bookin status change successfully") : badRequest(res, "bad Request")
        } catch (err) {
            return badRequest(res, "something went  wrong")
        }
    },
    merchantBooking: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const tokenData = parseJwt(req.headers.authorization)
            const bookingList = await getMerchantBooking(tokenData.merchantId)
            return bookingList ? success(res, "booking list", bookingList) : badRequest(res, "no booking found", []);
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    bookingDetails: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { bookingId } = req.params;
            const { merchantId } = parseJwt(req.headers.authorization)
            const bookingData = await merchantBookingdetailsById(bookingId, merchantId);
            return bookingData ? success(res, "booking data", bookingData) : badRequest(res, "bad request");
        } catch {
            unknownError(res, "unknow error ")
        }
    },
    getRatingOfMerchant: async (req, res) => {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const token = parseJwt(req.headers.authorization)
            const reviewList = await getRating(token.merchantId)
            return reviewList ? success(res, "here are the list", reviewList) : badRequest(res, "bad request")
        }
        catch (error) {
            return unknownError(res, "unknown error")
        }
    }
}