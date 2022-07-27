const categoryModel = require('../model/merchantCategory.model');

module.exports = {
    addCategory: async (name) => {
        try {
            const newCategory = await categoryModel({ name });
            return await newCategory.save() ? true : false;
        } catch (error) {
            return false
        }
    }
}