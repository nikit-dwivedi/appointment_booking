//---------------------------------modules------------------------------//
const { validationResult } = require("express-validator");
//-------------------------------middleware-----------------------------//
//--------------------------------helpers-------------------------------//
const { addAdmin, addCategory, addTestimonyData, loginCheck } = require("../helpers/admin.helpers");
const { unknownError, success, badRequest, created } = require("../helpers/response.helper");
const { allMerchant, merchantById, addFeaturedMerchant, removeFeaturedMerchant } = require("../helpers/merchant.helpers");
const { getAllBooking, getMerchantBooking, bookingdetailsByIndividualId } = require("../helpers/booking.helpers");
const { allClient, clientById } = require("../helpers/client.helpers");
//------------------------------functions-------------------------------//
module.exports = {
  addAdmin: async (req, res) => {
    try {
      const token = await addAdmin(req.body);
      created(res, "admin added", token);
    } catch (error) {
      console.log(error);
      return unknownError(res, "unknown error")
    }
  },
  login: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      }
      const { email, password } = req.body;
      const token = await loginCheck(email, password);
      return token ? success(res, "successfully login", token) : badRequest(res, "invalid credentials")
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
  bookingList: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const bookingData = await getAllBooking();
      return bookingData ? success(res, "booking list", bookingData) : badRequest(res, "no booking found", [])
    } catch (error) {
      return unknownError(res, "unknown error")
    }
  },
  getMerchantBookingList: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request")
      }
      const { merchantId } = req.body
      const merchantBookingList = await getMerchantBooking(merchantId);
      return merchantBookingList ? success(res, "booking list", merchantBookingList) : badRequest(res, "no booking found", [])
    } catch (error) {
      return unknownError(res, "unknown error")
    }
  },
  getIndividualBooking: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request")
      }
      const { bookingId } = req.params;
      const bookingData = await bookingdetailsByIndividualId(bookingId);
      return bookingData ? success(res, "booking list", bookingData) : badRequest(res, "no booking found", []);
    } catch (error) {
      console.log(error);
      return unknownError(res, "unknown error")
    }
  },
  getClientList: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const clientList = await allClient()
      return clientList ? success(res, "client list", clientList) : badRequest(res, "bad request");
    } catch (error) {
      return unknownError(res, "unknown error")
    }
  },
  IndividualClient: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return badRequest(res, "bad request");
      }
      const { clientId } = req.params;
      const clientData = await clientById(clientId)
      return clientData ? success(res, "client data", clientData) : badRequest(res, "no client found");
    } catch (error) {
      return unknownError(res, "unknown error");
    }
  }
};