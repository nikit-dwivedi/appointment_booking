const transactionModel = require('../model/transaction.model');
const { initPayment } = require("../service/paymet.service");

module.exports = {
    payment: async (clientId, bodyData, type) => {
        try {
            const paymentData = await initPayment(bodyData.email, bodyData.name, bodyData.amount);
            if (paymentData) {
                const formattedData = {
                    clientId: clientId,
                    merchantId: bodyData.merchantId,
                    amount: bodyData.amount,
                    type: type,
                    paymentId: paymentData.customer,
                    paymentIntent: paymentData.paymentIntent,
                    ephemeralKey: paymentData.ephemeralKey,
                    publishableKey:paymentData.publishableKey
                }
                const saveData = await transactionModel(formattedData);
                return await saveData.save() ? saveData : false;
            }
        } catch (error) {
            return false
        }
    },
    getClientTransaction: async (clientId) => {
        try {
            const transactionData = await transactionModel.find({ clientId }).select('-__v');
            return transactionData[0] ? transactionData : false;
        } catch (error) {
            return false;
        }
    },
    getMerchantTransaction: async (merchantId) => {
        try {
            const transactionData = await transactionModel.find({ merchantId }).select('-__v');
            return transactionData[0] ? transactionData : false;
        } catch (error) {
            return false;
        }
    },
    getTransactionById: async (TransactionId) => {
        try {
            const TransactionData = await transactionModel.findById(TransactionId).select('-__v');
            return TransactionData ? TransactionData : false;
        } catch (error) {
            return false
        }
    }
}