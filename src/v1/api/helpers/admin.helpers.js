const { generateAdminToken } = require('../middleware/authToken');
const adminModel = require('../model/admin.model');
const categoryModel = require('../model/merchantCategory.model');
const testimonyModel = require('../model/testimony.model');

module.exports = {
    addCategory: async (bodyData) => {
        try {
            const formattedData = {
                name: bodyData.name,
                image: bodyData.image,
                description: bodyData.description,
            }
            const newCategory = await categoryModel(bodyData);
            return await newCategory.save() ? true : false;
        } catch (error) {
            return false
        }
    },
    addAdmin: async (bodyData) => {
        try {
            const encryptedPassword = await encryption(bodyData.password)
            const adminId = randomBytes(4).toString('hex')
            const formattedData = {
                adminId: adminId,
                name: bodyData.name,
                email: bodyData.email,
                password: encryptedPassword,
            }
            const token = generateAdminToken(formattedData)
            const saveData = await adminModel(formattedData);
            return saveData.save() ? token : false;
        } catch (error) {
            return false;
        }
    },
    addTestimonyData: async (bodyData) => {
        try {
            const formattedData = {
                name: bodyData.name,
                image: bodyData.image,
                review: bodyData.review,
            }
            const newCategory = await testimonyModel(formattedData);
            return await newCategory.save() ? true : false;
        } catch (error) {
            return false
        }
    }
}