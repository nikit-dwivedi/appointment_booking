const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant, clientByUniqueId, addClient, checkLogin, editClient } = require('../helpers/client.helpers')


module.exports = {
    registerClient: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                badRequest(res, "bad request");
            }
            const checker = await clientByUniqueId(req.body.email);
            if (checker) {
                badRequest(res, "client already registered")
            }
            const token = await addClient(req.body);
            token ? success(req, "user created successfully", token) : badRequest(req, "bad request");
        } catch (error) {
            unknownError(res, "unknown error");
        }
    },
    clientLogin: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                badRequest(res, "bad request");
            }
            const { email, password } = req.body;
            const token = await checkLogin(email, password);
            token ? success(res, "login success", token) : badRequest(res, "invalid credentials")
        } catch (error) {
            unknownError(res, "unknown error");
        }
    },
    getClientById: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const clientData = await clientByUniqueId(tokenData.clientId);
            clientData ? success(res, "success", clientData) : badRequest(res, "bad request");
        } catch (error) {
            badRequest(res, "bad request");
        }
    },
    editClientInfo: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const updatedInfo = await editClient(tokenData.clientId, req.body);
            updatedInfo ? success(req, "profile updated") : badRequest(req, "bad request");
        } catch (error) {
            unknownError(res, "unknown error");
        }
    },
}