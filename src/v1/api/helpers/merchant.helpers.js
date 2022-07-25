const merchantModel = require('../model/merchant.models');
const { randomBytes } = require('crypto');
const { encryption, generateMerchantToken } = require('../middleware/authToken');

module.exports = {
    addMerchant: async (merchantData) => {
        try {
            const encryptedPassword = await encryption(merchantData.password)
            const merchantId = randomBytes(4).toString('hex')
            const buisnessId = randomBytes(4).toString('hex')
            
            const formattedData = {
                merchantId: merchantId,
                firstName: merchantData.firstName,
                lastName: merchantData.lastName,
                email: merchantData.email,
                password: encryptedPassword,
                mobileNum: merchantData.mobileNum,
                buisness:merchantData.buisness,
                isLogin: true,
                gender:merchantData.gender,
                buisnessId:buisnessId
                

            }
            console.log("++============+++++=================++++",formattedData);
            // console.log("++++++++++++_____________________+++++++++++",merchantData);
            const token = await generateMerchantToken(formattedData)
            // console.log(token);
            const saveData = await merchantModel(formattedData);
            return saveData.save() ? token : false
        } catch (error) {
            return false
        }
    },
    merchantById: async (merchantId) => {
        try {
            const merchantData = await merchantModel.findOne({ merchantId });
            console.log(merchantData);
            return merchantData ? merchantData : false;
        } catch (error) {
            return false
        }
    },
    allMerchant: async () => {
        try {
            const merchantData = await merchantModel.find();
            return merchantData[0] ? merchantData : false;
        } catch (error) {
            return false
        }
    },
   
}