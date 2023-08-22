var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    dogName: { type: String, required: true },
    dogBreed: { type: String, required: false },
    dogAge: { type: Number, required: false },
    dogWeight: { type: Number, required: false },
    feedingSchedule: {
        breakfast: { type: Number, required: false },
        lunch: { type: Number, required: false },
        dinner: { type: Number, required: false },
    },
    pottySchedule: {
        morning: { type: Number, required: false },
        afternoon: { type: Number, required: false },
        night: { type: Number, required: false },
    },
    trainingList: [
                    { training: { type: String, required: false },
                      checked: { type: Boolean, required: false } }
                    ],
    userID: { type: mongoose.Schema.Types.ObjectId, unique: false, required: false },
    
    
});

var DogProfile = mongoose.model('DogProfile', postSchema);

module.exports = DogProfile;
