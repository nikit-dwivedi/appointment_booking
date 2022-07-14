const buisnessModel = require('../model/merchantBuisnessRegistration.model')
const {randomBytes} = require('crypto')


module.exports = {
    addBuissness: async (buissnessData)=>{
        try{
            const buisnessId = randomBytes(4).toString('hex')
            const buissnessFormattedData = {
                merchantId:merchantId,
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
            console.log(saveData); 
            return saveData.save()

          
        }catch(err){
            return false
        }
    },
    updateBuissness: async(buissnessUpdate)=>{
        try{
            const updateFormattedData = {
                profilePic:updateFormattedData.profilePic,
                biussnessPhoto:updateFormattedData.biussnessPhoto,
                buisnessName:updateFormattedData.buisnessName,
                designation:updateFormattedData.designation,
                avalaibility:updateFormattedData.avalaibility,
                description:updateFormattedData.description,
                location:updateFormattedData.location,
                basePrice:updateFormattedData.basePrice,
            }
            const updatedData = await merchantBuisnessModel.findByIdAndUpdate({id,updateFormattedData})
            return updatedData

        }catch(err){
            return false
        }
    }
}