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
            return await saveData.save() ? token : false
        } catch (err) {
            return false
        }
    },
    clientByEmail: async (email) => {
        try {
            const clientData = await clientModel.findOne({ email });
            return clientData ? clientData : false;
        } catch (error) {
            return false
        }
    },
    clientById: async (clientId) => {
        try {
            const clientData = await clientModel.findOne({ clientId });
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
                gender: clientData.gender,
                dob: clientData.dob,
            };
            const updatedData = await clientModel.findOneAndUpdate({ clientId }, formattedData);
            return updatedData ? true : false;
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
        try {
            const clientData = await clientModel.findOne({ email });
            if (clientData) {
                const token = await generateUserToken(clientData);
                const passwordCheck = await checkEncryption(password, clientData.password);
                await clientModel.findOneAndUpdate({ clientId: clientData.clientId }, { status: true });
                return passwordCheck ? token : false;
            }
            return false;
        }
        catch (error) {
            return false
        }
    }
}