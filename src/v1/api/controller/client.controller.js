const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant, clientByUniqueId, addClient, checkLogin, editClient } = require('../helpers/client.helpers')
const { addBooking, getClientBooking, bookingdetailsById } = require('../helpers/booking.helpers')


module.exports = {
    registerClient: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const checker = await clientByUniqueId(req.body.email);
            if (checker) {
                return badRequest(res, "client already registered")
            }
            const token = await addClient(req.body);
            token ? success(req, "user created successfully", token) : badRequest(req, "bad request");
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
            const clientData = await clientByUniqueId(tokenData.clientId);
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
            return updatedInfo ? success(req, "profile updated") : badRequest(req, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
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
        } catch {
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
            return bookingData ? success(res, "booking done", bookingData) : badRequest(res, "bad request");
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
            const bookingData = await bookingdetailsById(bookingId);
            return bookingData ? success(res, "booking data", bookingData) : badRequest(res, "bad request");
        } catch {
            unknownError(res, "unknow error ")
        }
    }
}