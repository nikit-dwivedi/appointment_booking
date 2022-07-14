const clientModel = require('../model/client.model.js');
const { randomBytes } = require('node:crypto');
const { encryption, generateUserToken, checkEncryption } = require('../middleware/authToken');

module.exports = {
    addClient: async (clientData) => {
        try {
            const encryptedPassword = await encryption(clientData.password)
            const clientId = randomBytes(4).toString('hex')
            const formattedData = {
                clientId: clientId,
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                email: clientData.email,
                mobileNumber: clientData.mobileNumber,
                password: encryptedPassword,
                gender: clientData.gender,
                dob: clientData.dob,
            };
            const token = await generateUserToken(formattedData)
            const saveData = await clientModel(formattedData);
            return saveData ? token : false
        } catch (err) {
            return false
        }
    },
    clientByUniqueId: async (uniqueId) => {
        try {
            const clientData = await clientModel.findOne({ uniqueId });
            return clientData ? clientData : false;
        } catch (error) {
            return false
        }
    },
    editClient: async (clientId, clientData) => {
        try {
            const formattedData = {
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                email: clientData.email,
                mobileNumber: clientData.mobileNumber,
                gender: clientData.gender,
                dob: clientData.dob,
            };
            const clientData = await clientModel.findOneAndUpdate({ clientId }, formattedData);
            return clientData ? true : false;
        } catch (error) {
            return false
        }
    },
    changeLoginStatus: async (clientId, status) => {
        try {
            const clientData = await clientModel.findOneAndUpdate({ clientId }, { isLogin: status });
            return clientData ? true : false;
        } catch (error) {
            return false
        }
    },
    changeActiveStatus: async (clientId, status) => {
        try {
            const clientData = await clientModel.findOneAndUpdate({ clientId }, { isActive: status });
            return clientData ? true : false;
        } catch (error) {
            return false
        }
    },
    allClient: async () => {
        try {
            const clientData = await clientModel.find();
            return clientData[0] ? clientData : false;
        } catch (error) {
            return false
        }
    },
    checkLogin: async (email, password) => {
        const clientData = await clientByUniqueId(email);
        if (clientData) {
            const token = await generateUserToken(clientData);
            const passwordCheck = await checkEncryption(password, clientData.password);
            await changeLoginStatus(clientData.clientId, true);
            return passwordCheck ? token : false;
        }
        return false;
    }
}