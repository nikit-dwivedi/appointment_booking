//---------------------------------modules------------------------------//
const { validationResult } = require("express-validator");
//-------------------------------middleware-----------------------------//
const { parseJwt, generateAdminToken, encryption, checkEncryption, } = require("../middleware/authToken");
//--------------------------------helpers-------------------------------//
const { addAdmin, getAdminByEmail, addCategory, addTestimony, addTestimonyData } = require("../helpers/admin.helpers");
const { unknownError, success, badRequest, created } = require("../helpers/response.helper");
const { allMerchant, merchantById, addFeaturedMerchant, removeFeaturedMerchant } = require("../helpers/merchant.helpers");
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
      }
      const { email, password } = req.body;
      const data = { email: email, userId: "userno1", };
      const token = await generateAdminToken(data);
      success(res, "successfully login", token);
    } catch (error) {
      unknownError(res, "unknown error");
    }
  },

  getAllMerchant: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      }
      const userData = await allMerchant();
      userData ? success(res, "success", userData) : badRequest(res, "bad request");
    } catch (error) {
      unknownError(res, "unknown error");
    }
  },

  addNewCategory: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const saveCategory = await addCategory(req.body);
      return saveCategory ? success(res, "category added") : badRequest(res, "category not added");

    } catch (error) {
      return unknownError(res, "unknow error")
    }
  },

  getMerchantById: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      }
      const { merchantId } = req.params;
      const merchantData = await merchantById(merchantId);
      merchantData ? success(res, "merchant details", merchantData) : badRequest(res, "merchant not found");
    } catch (error) {
      unknownError(res, "Unknown error");
    }
  },
  makeMerchantFeatured: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const { merchantId } = req.body;
      const changeData = await addFeaturedMerchant(merchantId);
      return changeData ? success(res, "success") : badRequest(res, "bad request");

    } catch (error) {
      return unknownError(res, "unknown error");
    }
  },
  removeMerchantFeatured: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const { merchantId } = req.body;
      const changeData = await removeFeaturedMerchant(merchantId);
      return changeData ? success(res, "success") : badRequest(res, "bad request");

    } catch (error) {
      return unknownError(res, "unknown error");
    }
  },
  addTestimony: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const saveData = await addTestimonyData(req.body)
      return saveData ? success(res, "success") : badRequest(res, "bad request");

    } catch (error) {
      return unknownError(res, "unknown error")
    }
  }
};
