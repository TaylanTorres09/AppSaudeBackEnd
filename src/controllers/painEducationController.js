const painEducationModel = require('../database/models/painEducation.model');

module.exports = {
    createNews: async(req, res) => {
        try {
            const newPainEducation = new painEducationModel(req.body);
            const painEducation = newPainEducation.save();

            res.send({ painEducation });
        } catch (error) {
            console.log(error)
        }
    },


    allNews: async(req, res) => {
        try {
            const results = await painEducationModel.find();
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }

    },

    updateNews: async(req, res) => {},

    deleteNews: async(req, res) => {},



    updateImage: async(req, res) => {},

    deleteImage: async(req, res) => {},
}