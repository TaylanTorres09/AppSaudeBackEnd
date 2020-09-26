const painEducationModel = require('../database/models/painEducation.model');

module.exports = {
    createNews: async(req, res) => {
        try {
            const newPainEducation = new painEducationModel(req.body);
            const painEducation = newPainEducation.save();

            res.send({painEducation});
        } catch (error) {
            console.log(error)
        }
    },

    updateNews: async(req, res) => {},

    deleteNews: async(req, res) => {},

    allNews: async(req, res) => {},

    updateImage: async(req, res) => {},

    deleteImage: async(req, res) => {},
}