const merchantModel = require('../model/merchant.models');
const { randomBytes } = require('crypto');
const { encryption, generateMerchantToken } = require('../middleware/authToken');

module.exports = {
    addMerchant: async (merchantData) => {
        try {
            const encryptedPassword = await encryption(merchantData.password)
            const merchantId = randomBytes(4).toString('hex')
            const formattedData = {
                merchantId: merchantId,
                firstName: merchantData.firstName,
                lastName: merchantData.lastName,
                email: merchantData.email,
                password: encryptedPassword,
                mobileNum: merchantData.mobileNum,
                gender: merchantData.gender,
                merchantPhoto: merchantData.merchantPhoto,
                availability: merchantData.availability,
                description: merchantData.description,
                location: merchantData.location,
                basePrice: merchantData.basePrice,
                merchantType: merchantData.merchantType,
                merchantSubType: merchantData.merchantSubType
            }
            console.log("++============+++++=================++++", formattedData);
            const token = await generateMerchantToken(formattedData)
            const saveData = await merchantModel(formattedData);
            return saveData.save() ? token : false
        } catch (error) {
            return false
        }
    },
    merchantById: async (merchantId) => {
        try {
            const merchantData = await merchantModel.findOne({ merchantId });
            return merchantData ? merchantData : false;
        } catch (error) {
            return false
        }
    },
    merchantCategoryList: async () => {
        try {
            const categoryList = await merchantModel.find().select('merchantType -_id');
            const categorySet = new Set(categoryList)
            console.log(categoryList);
            return categoryList ? categorySet : false
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    allMerchantByCategory: async (category) => {
        try {
            let filter = { 'buisness.buisnessType': category }
            const merchantData = await merchantModel.find(filter);
            return merchantData[0] ? merchantData : false;
        } catch (error) {
            return false
        }
    },
    addBuissness: async (merchantId, buissnessData) => {
        try {
            const buissnessFormattedData = {
                buisnessPhoto: buissnessData.biussnessPhoto,
                avalaibility: buissnessData.avalaibility,
                description: buissnessData.description,
                location: buissnessData.location,
                basePrice: buissnessData.basePrice,
            }
            console.log(buissnessFormattedData);
            const saveData = await merchantModel.findOneAndUpdate(merchantId, buissnessFormattedData)
            return saveData.save()
        } catch (err) {
            console.log(err)
            return false
        }
    },
    
}