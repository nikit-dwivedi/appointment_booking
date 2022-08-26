const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError, created } = require('../helpers/response.helper')
const { addClient, checkLogin, editClient, clientByEmail, clientById } = require('../helpers/client.helpers')
const { addBooking, getClientBooking, bookingdetailsById, clientBookingdetailsById } = require('../helpers/booking.helpers')
const { allMerchantByCategory, merchantCategoryList, getAvalableSlot, getFeaturedMerchant, getTestimony } = require('../helpers/merchant.helpers')
const { addRating } = require('../helpers/review.helpers')
const { payment } = require('../helpers/transaction.helper')


module.exports = {
    registerClient: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const checker = await clientByEmail(req.body.email);
            if (checker) {
                return badRequest(res, "client already registered")
            }
            const token = await addClient(req.body);
            return token ? success(res, "user created successfully", token) : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    clientLogin: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { email, password } = req.body;
            const token = await checkLogin(email, password);
            return token ? success(res, "login success", token) : badRequest(res, "invalid credentials")
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    getClientById: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const clientData = await clientById(tokenData.clientId);
            return clientData ? success(res, "success", clientData) : badRequest(res, "bad request");
        } catch (error) {
            return badRequest(res, "bad request");
        }
    },
    editClientInfo: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const updatedInfo = await editClient(tokenData.clientId, req.body);
            return updatedInfo ? success(res, "profile updated") : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    homeScreen: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const data = {
                categoryList: await merchantCategoryList(),
                feturedMerchant: await getFeaturedMerchant(),
                testomony: await getTestimony()
            }
            return data.categoryList ? success(res, "success", data) : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    getAllMerchantByCategory: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { category } = req.params
            const merchantList = await allMerchantByCategory(category);
            return merchantList ? success(res, "all merchant list", merchantList) : success(res, "no merchant found", []);
        } catch (error) {
            return unknownError(res, "unknown error")
        }
    },
    bookAppointment: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const bookingData = await addBooking(req.body, tokenData.clientId);
            return bookingData ? success(res, "booking done", bookingData) : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    allBoooking: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const bookingData = await getClientBooking(tokenData.clientId);
            return bookingData ? success(res, "booking done", bookingData) : success(res, "no booking found", []);
        } catch {
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
            const { clientId } = parseJwt(req.headers.authorization)
            const bookingData = await clientBookingdetailsById(bookingId, clientId);
            return bookingData ? success(res, "booking data", bookingData) : badRequest(res, "bad request");
        } catch {
            unknownError(res, "unknow error ")
        }
    },
    availableSlot: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { merchantId, date } = req.body
            const check = await getAvalableSlot(merchantId, date);
            return check ? success(res, "available slots", check) : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    addReviewOfMerchant: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const token = parseJwt(req.headers.authorization);
            const review = await addRating(token.clientId, req.body);
            return review ? created(res, "review added") : badRequest(res, "review not added")
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
    makePayment: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const token = parseJwt(req.headers.authorization);
            const paymentDetails = await payment(token.clientId, req.body, "booking");
            return paymentDetails ? success(res, "payment success", paymentDetails) : badRequest(res, "payment failed");
        } catch (error) {
            return unknownError(res, "unknown error")
        }
    }
}