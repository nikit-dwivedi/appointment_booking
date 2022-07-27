const merchantModel = require('../model/merchant.models');
const categoryModel = require('../model/merchantCategory.model')
const bookingModel = require('../model/booking');
const testimonyModel = require('../model/testimony.model')
const { randomBytes } = require('crypto');
const { encryption, generateMerchantToken } = require('../middleware/authToken');
const { sort } = require('../service/funtions');

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
                merchantPhoto: merchantData.merchantPhoto,
                availability: merchantData.availability,
                gender: merchantData.gender,
                description: merchantData.description,
                location: merchantData.location,
                basePrice: merchantData.basePrice,
                merchantType: merchantData.merchantType,
                merchantSubType: merchantData.merchantSubType
            }
            const token = await generateMerchantToken(formattedData)
            const saveData = await merchantModel(formattedData);
            return saveData.save() ? token : false
        } catch (error) {
            return false
        }
    },
    merchantByEmail: async (email) => {
        try {
            const merchantData = await merchantModel.findOne({ email });
            return merchantData ? merchantData : false;
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
            const categoryList = await categoryModel.find().select('-_id -__v');
            return categoryList ? categoryList : false
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    addFeaturedMerchant: async (merchantId) => {
        try {
            const changeData = await merchantModel.findOneAndUpdate({ merchantId }, { isFeatured: true });
            return changeData ? true : false;
        } catch (error) {
            return false
        }
    },
    removeFeaturedMerchant: async (merchantId) => {
        try {
            const changeData = await merchantModel.findOneAndUpdate({ merchantId }, { isFeatured: false });
            return changeData ? true : false;
        } catch (error) {
            return false
        }
    },
    allMerchantByCategory: async (category) => {
        try {
            let filter = { merchantType: category }
            const merchantData = await merchantModel.find(filter);
            return merchantData[0] ? merchantData : false;
        } catch (error) {
            return false
        }
    },
    editMerchant: async (merchantId, bodyData) => {
        try {
            const FormattedData = {
                firstName: bodyData.firstName,
                lastName: bodyData.lastName,
                merchantPhoto: bodyData.merchantPhoto,
                description: bodyData.description,
                basePrice: bodyData.basePrice,
                location: bodyData.location,
            }
            const saveData = await merchantModel.findOneAndUpdate({ merchantId }, FormattedData)
            return saveData.save() ? true : false
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getAvalableSlot: async (merchantId, date) => {
        try {
            let dateData = new Date(date)
            let day = dateData.toString().split(" ")[0]
            const bookingData = await bookingModel.find({ merchantId, date }).select("time -_id")
            const { availability } = await merchantModel.findOne({ merchantId }).select(`availability.${day} -_id`)
            const bookedSlot = bookingData.map(({ time }) => time)
            const servingSlot = availability[`${day}`]
            const sortedArray = sort(bookedSlot, servingSlot)
            return sortedArray
        } catch (error) {
            return false
        }
    },
    getFeaturedMerchant:async()=>{
        try {
            const merchantData = await merchantModel.find({isFeatured:true}).select('merchantId firstName lastName merchantPhoto merchantType description -_id');
            return merchantData[0] ? merchantData : false;
        } catch (error) {
            return false
        }
    },
    getTestimony:async()=>{
        try {
            const merchantData = await testimonyModel.find().select('-_id -__v');
            return merchantData[0] ? merchantData : false;
        } catch (error) {
            return false
        }
    }
}
