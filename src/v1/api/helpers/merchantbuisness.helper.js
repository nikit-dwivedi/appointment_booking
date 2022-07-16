const buisnessModel = require('../model/merchantBuisnessRegistration.model')
const {randomBytes} = require('node:crypto')


module.exports = {
    addBuissness: async (buissnessData)=>{
        try{
            const buisnessId = randomBytes(4).toString('hex')
            const buissnessFormattedData = {
                merchantId:buissnessData.merchantId,
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
            const saveData = await buisnessModel(buissnessFormattedData)
            console.log("============================",saveData); 
            return saveData.save()

          
        }catch(err){
            console.log(err)
            return false
        }
    },
}