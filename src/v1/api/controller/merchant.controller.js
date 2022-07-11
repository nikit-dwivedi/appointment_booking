const merchantModel = require('../model/merchantRegisteration.models')
const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { addMerchant } = require('../helpers/merchant.helpers')


module.exports = {
    merchantRegistration: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            } else {
                const { email } = req.body
                const merchantCheck = await merchantModel.findOne({ email })
                if (merchantCheck) {
                    badRequest(res, "merchant already registerd");
                } else {
                    const saveData = addMerchant(req.body);
                    if (saveData) {
                        success(res, "merchant registered successfully", saveData);
                    } else {
                        badRequest(res, "bad request");
                    }
                }
            }
        } catch (err) {
            unknownError(res, "unknown error");
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request")
            } else {
                const { email, password } = req.body
                const merchant = await merchantModel.findOne({ email })
                if (!merchant) {
                    badRequest(res, "invalid email or password");
                } else {
                    if (await checkEncryption(password, merchant.password)) {
                        const token = await generateMerchantToken(merchant)
                        merchant.isLogin = true
                        merchant.save()
                        success(res, "login successful", token);
                    } else {
                        badRequest(res, "invalid email or password");
                    }
                }
            }
        } catch (err) {
            unknownError(res, "unknown error")
        }
    },
    logout: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request")
            } else {
                const tokenData = parseJwt(req.headers.authorization)
                const merchantData = await merchantModel.findOne({ merchantId: tokenData.merchantId })
                if (merchantData.isLogin) {
                    merchantData.isLogin = false
                    merchantData.save()
                    success(res, "logout successful")
                } else {
                    badRequest(res, "you need to login first")
                }
            }

        } catch (err) {
            res.send(err.message)
        }
    },
    getUserById: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty) {
                badRequest(res, "bad request");
            } else {
                const tokenData = parseJwt(req.headers.authorization)
                const userData = await merchantModel.findOne({ merchantId: tokenData.merchantId });
                if (userData) {
                    success(res, "success", userData);
                } else {
                    badRequest(res, "user not found");
                }
            }
        } catch (error) {
            unknownError(res, "unknown error");
        }
    }

}