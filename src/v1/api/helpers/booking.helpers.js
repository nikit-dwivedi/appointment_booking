const bookingModel = require('../model/booking');

module.exports = {
    addBooking: async (bookingData, clientId) => {
        try {
            const formatedData = {
                clientId: clientId,
                merchantId: bookingData.merchantId,
                clientName: bookingData.clientName,
                clientNumber: bookingData.clientNumber,
                amount: bookingData.amount,
                date: bookingData.date,
                time: bookingData.time
            }
            const saveData = await bookingModel(formatedData);
            return await saveData.save() ? saveData._id : false;
        }
        catch (error) {
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
    bookingdetailsById: async (bookingId, clientId) => {
        try {
            const bookingData = await bookingModel.findOne({ $and: [{ _id: bookingId }, { clientId }] });
            return bookingData ? bookingData : false;
        } catch (error) {
            return false
        }
    },
    changeAvailability: async (merchantId, bodyData) => {
        const formatedData = {

        }
    }
}