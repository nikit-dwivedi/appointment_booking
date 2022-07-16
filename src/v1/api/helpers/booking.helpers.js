const bookingModel = require('../model/booking');

module.exports = {
    addBooking: async (bookingData,clientData) => {
        try {
            const formatedData = {
                businessId: bookingData.businessId,
                clientId: clientData.clientId,
                clientName: clientData.clientName,
                clientNumber: clientData.clientNumber,
                amount: bookingData.amount,
                date: bookingData.data,
                time: bookingData.time
            }
            const saveData = await bookingModel(formatedData);
            return saveData.save() ? saveData._id : false;
        }
        catch {
            return false;
        }
    },
    getClientBooking: async (clientId) => {
        try {
            const bookingData = await bookingModel.find({ clientId });
            return bookingData[0] ? bookingData : false;
        }
        catch {
            return false
        }
    },
    getMerchantBooking: async (merchantId) => {
        try {
            const bookingData = await bookingModel.find({ merchantId });
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
    changeBookingStatus: async (businessId, status) => {
        try {
            const statusChange = await bookingModel.findOneAndUpdate({ businessId }, { status });
            return statusChange ? true : false;
        } catch {
            return false
        }
    },
    markBookingDone: async (businessId) => {
        try {
            const statusChange = await bookingModel.findOneAndUpdate({ businessId }, { isCompleted: true });
            return statusChange ? true : false;
        } catch {
            return false
        }
    },
    bookingdetailsById: async (bookingId) => {
        try {
            const bookingData = await bookingModel.findById( bookingId );
            return bookingData ? bookingData : false;
        } catch {
            return false
        }
    },
}