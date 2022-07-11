const merchantModel = require('../model/merchantRegisteration.models');
const { randomBytes } = require('node:crypto');
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
                merchantType: merchantData.merchantType,
                isLogin: true
            }
            const token = await generateMerchantToken(formattedData)
            const saveData = await merchantModel(formattedData);
            return saveData.save() ? token : false
        } catch (error) {
            return false
        }
    }
}