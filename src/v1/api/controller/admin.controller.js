//---------------------------------modules------------------------------//
const { validationResult } = require("express-validator");
//-------------------------------middleware-----------------------------//
const { parseJwt, generateAdminToken, encryption, checkEncryption, } = require("../middleware/authToken");
//--------------------------------helpers-------------------------------//
const { addAdmin, getAdminByEmail } = require("../helpers/admin.helpers");
const { unknownError, success, badRequest, created } = require("../helpers/response.helper");
//------------------------------functions-------------------------------//
module.exports = {
  addAdmin: async (req, res) => {
    const { email, password } = req.body;
    const data = { email: email, userId: "userno1" };
    const token = await generateAdminToken(data);
    created(res, "admin added", token);
  },

  login: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      } else {
        const { email, password } = req.body;
        const data = { email: email, userId: "userno1", };
        const token = await generateAdminToken(data);
        success(res, "successfully login", token);
      }
    } catch (error) {
      unknownError(res, "unknown error");
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      } else {
        const userData = await getAllUser();
        if (userData) {
          success(res, "success", userData);
        } else {
          badRequest(res, "bad request");
        }
      }
    } catch (error) {
      unknownError(res, "unknown error");
    }
  },
  allDetailOfUser: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      } else {
      }
    } catch (error) {
      unknownError(res, "Unknown error");
    }
  },
};
