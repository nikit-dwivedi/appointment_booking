const bookingModel = require('../model/booking');
const { clientById } = require('./client.helpers');
const { merchantById } = require('./merchant.helpers');

module.exports = {
    addBooking: async (bookingData, clientId) => {
        try {
            const clientData = await clientById(clientId)
            const merchantData = await merchantById(bookingData.merchantId)
            const formatedData = {
                clientId: clientId,
                clientName: bookingData.clientName,
                clientNumber: bookingData.clientNumber,
                clientEmail: clientData.email,
                merchantId: bookingData.merchantId,
                merchantName: `${merchantData.firstName} ${merchantData.lastName}`,
                merchantNumber: merchantData.mobileNum,
                merchnatLocation: merchantData.location,
                amount: bookingData.amount,
                date: bookingData.date,
                time: bookingData.time,
            }
            const saveData = await bookingModel(formatedData);
            return await saveData.save() ? saveData._id : false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    getClientBooking: async (clientId) => {
        try {
            const bookingData = await bookingModel.find({ clientId });
            return bookingData[0] ? bookingData : false;
        }
        catch (error) {
            return false
        }
    },
    getMerchantBooking: async (merchantId) => {
        try {
            const bookingData = await bookingModel.find({ merchantId }).select('-__v')
            return bookingData[0] ? bookingData : false;
        } catch {
            return false;
        }
    },
    getbusinessBooking: async (businessId) => {
        try {
            const bookingData = await bookingModel.find({ businessId });
            return bookingData[0] ? bookingData : false;
        } catch {
            return false;
        }
    },
    changeBookingStatus: async (bookingId, status) => {
        try {
            const statusChange = await bookingModel.findByIdAndUpdate(bookingId, { status });
            return statusChange ? true : false;
        } catch {
            return false
        }
    },
    markBookingDone: async (bookingId) => {
        try {
            const statusChange = await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true });
            return statusChange ? true : false;
        } catch {
            return false
        }
    },
    clientBookingdetailsById: async (bookingId, clientId) => {
        try {
            const bookingData = await bookingModel.findOne({ $and: [{ _id: bookingId, clientId }] });
            return bookingData ? bookingData : false;
        } catch (error) {
            return false
        }
    },
    merchantBookingdetailsById: async (bookingId, merchantId) => {
        try {
            const bookingData = await bookingModel.findOne({ $and: [{ _id: bookingId, merchantId }] });
            return bookingData ? bookingData : false;
        } catch (error) {
            return false
        }
    },
    bookingdetailsByIndividualId: async (bookingId) => {
        try {
            const bookingData = await bookingModel.findById(bookingId);
            return bookingData ? bookingData : false;
        } catch (error) {
            return false
        }
    },
    changeAvailability: async (merchantId, bodyData) => {
        const formatedData = {

        }
    },
    getAllBooking: async () => {
        try {
            const bookingData = await bookingModel.find().select('-__v');
            return bookingData ? bookingData : false;
        } catch (error) {
            return false
        }
    }
}