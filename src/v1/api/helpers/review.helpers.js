const merchantModel = require('../model/merchant.models');
const clientModel = require('../model/client.model');


module.exports = {
    addRating: async ( clientId, reviewData) => {
        try {
            const clientData = await clientModel.findOne({ clientId })
            const formmetedData = {
                clientId: clientId,
                clientName: `${clientData.firstName} ${clientData.lastName}`,
                clientProfileImage: reviewData.clientProfileImage,
                rating: reviewData.rating,
                review: reviewData.review
            }
            const merchantData = await merchantModel.findOne({ merchantId:reviewData.merchantId })
            if (!merchantData) {
                return false
            }
            if (!merchantData.overAllRating) {
                merchantData.overAllRating = reviewData.rating
            }
            let overAllRating = (merchantData.overAllRating + reviewData.rating) / 2
            merchantData.overAllRating = Math.floor(overAllRating)
            merchantData.reviewList.push(formmetedData)
            return await merchantData.save() ? true : false
        } catch (error) {
            return false
        }
    },
    getRating: async (merchantId) => {
        try {
            const merchantData = await merchantModel.find({ merchantId }).select('-_id overAllRating reviewList')
            return merchantData[0] ? merchantData : [];
        } catch (error) {
            return false
        }
    }
}