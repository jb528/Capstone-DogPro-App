var express = require('express');
var ensureAuthenticated = require('../../auth/auth').ensureAuthenticated;
var router = express.Router();
var DogProfile = require('../../models/profile');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); // you can configure the destination folder



router.use(ensureAuthenticated);

router.get('/', function (req, res) {
    DogProfile.find({ userID: req.user._id })
    .then(profile => {
        res.render('profiles/profile', { profile: profile });
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/add', function (req, res) {
     DogProfile.find({ userID: req.user._id })
    .then(profile => {
        res.render('profiles/add', { profile: profile });
    })
    .catch(err => {
        console.log(err);
    });
});

router.post('/add', upload.single('profilePic'), function (req, res) {
    console.log(req.body);
    console.log("File path:", req.file.path);
   
    var filePath = req.file.path;

    var newProfile = new DogProfile({
        profilePicturePath: filePath,
        dogName: req.body.dogName,
        dogBreed: req.body.dogBreed,
        dogAge: req.body.dogAge,
        dogWeight: req.body.dogWeight,
        feedingSchedule: {
            breakfast: req.body.feedingSchedule.breakfast,
            lunch: req.body.feedingSchedule.lunch,
            dinner: req.body.feedingSchedule.dinner,
        },
        pottySchedule: {
            morning: req.body.pottySchedule.morning,
            afternoon: req.body.pottySchedule.afternoon,
            night: req.body.pottySchedule.night,
        },
        trainingList: req.body.trainingList,
        userID: req.user._id,
        
    });

    console.log("New profile:", newProfile);

    newProfile.save()
        
    .then(post => {
        console.log(post);
        res.json({ success: true, message: "Dog profile saved successfully." });
    })
    .catch(err => {
        console.log(err);
        res.json({ success: false, message: "There was an error saving the dog profile." });
    });
});

router.get('/:profileID', function (req, res) {
    DogProfile.findById(req.params.profileID)
        .then(profile => {
            res.render('profiles/detailedprofile', { profile: profile });
        })
        .catch(err => {
            // Handle error here
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/edit/:profileID', function (req, res) {
    DogProfile.findById(req.params.profileID)
        .then(profile => {
            res.render('profiles/editprofile', { profile: profile });
        })
        .catch(err => {
            // Handle error here
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/update', upload.single('profilePic'), async function (req, res) {
    console.log("File path:", req.file.path);
    try {
        // Check if trainingList is an array or not, if it's not make it an array
        if (!Array.isArray(req.body.trainingList)) {
            req.body.trainingList = [req.body.trainingList];
        }
        var trainingItems = req.body.trainingList || [];
        var filePath = req.file.path;
        

        // Create the new values.
        const newValues = {
            profilePicturePath: filePath,
            dogName: req.body.dogName,
            dogBreed: req.body.dogBreed,
            dogAge: req.body.dogAge,
            dogWeight: req.body.dogWeight,
            feedingSchedule: {
                breakfast: req.body.feedingSchedule.breakfast,
                lunch: req.body.feedingSchedule.lunch,
                dinner: req.body.feedingSchedule.dinner
            },
            pottySchedule: {
                morning: req.body.pottySchedule.morning,
                afternoon: req.body.pottySchedule.afternoon,
                night: req.body.pottySchedule.night
            },
            trainingList: trainingItems
        };

        console.log("updated profile:", newValues);
        // Use findOneAndUpdate to update the document directly.
        const profile = await DogProfile.findOneAndUpdate(
            { _id: req.body.profileId }, // find a document with this filter
            newValues, // document to insert when nothing was found
            { new: true, upsert: true, runValidators: true }, // options
        );
        
        res.json({ success: true, message: 'Profile updated successfully' }); 
    } catch (err) {
        console.log("error updating profile: ");
        res.status(500).send(err);
    }
});

router.delete('/delete/:profileID', async function (req, res) {
    try {
        const deletedProfile = await DogProfile.findByIdAndRemove(req.params.profileID);

        if (deletedProfile) {
            res.json({ success: true, message: 'Profile deleted successfully' });
        } else {
            res.json({ success: false, message: 'Profile not found' });
        }
    } catch (err) {
        console.log("error deleting profile: ", err);
        res.status(500).send(err);
    }
});



module.exports = router;