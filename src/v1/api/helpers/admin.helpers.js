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