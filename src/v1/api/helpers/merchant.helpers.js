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
                merchantType: merchantData.merchantType,
                buisness:merchantData.buisness,
                isLogin: true
            }
            const token = await generateMerchantToken(formattedData)
            console.log(token);
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
    allMerchant: async () => {
        try {
            const merchantData = await merchantModel.find();
            return merchantData[0] ? merchantData : false;
        } catch (error) {
            return false
        }
    },
    addBuissness: async (buissnessData)=>{
        try{
            const buisnessId = randomBytes(4).toString('hex')
            const buissnessFormattedData = {
                // merchantId:buissnessData.merchantId,
                profilePic:buissnessData.profilePic,
                buisnessPhoto:buissnessData.biussnessPhoto,
                buisnessName:buissnessData.buisnessName,
                designation:buissnessData.designation,
                avalaibility:buissnessData.avalaibility,
                description:buissnessData.description,
                location:buissnessData.location,
                basePrice:buissnessData.basePrice,
                clientId:buissnessData.clientId,
                buisnessId:buisnessId
            }
            
            console.log(buissnessFormattedData);
            // const saveData = await merchantModel(buissnessFormattedData)
            // console.log("============================",saveData); 
            // return saveData.save()
      
          
        }catch(err){
            console.log(err)
            return false
        }
    }
}