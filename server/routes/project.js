const express = require("express");
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const multer = require("multer");
const uploadCloud = require('../config/cloudinary.js');


//retrieve all

router.post("/home", (req, res, next) => {
    const userId = req.body.id;
    Project.find({ creator: userId })
        .then(projects => res.json(projects))
        .catch(e => next(e))
})

router.get('/', (req, res, next) => {

    Project.find({})
        .populate('petitions')
        .then(projects => res.json(projects))
        .catch(e => next(e))
});
router.get('/approve/:projectId/:userId', (req, res, next) => {

    Project.findByIdAndUpdate(req.params.projectId, { $pull: { petitions: req.params.userId } }, { new: true })
        .populate('petitions')
        .then(project => {
            Project.findByIdAndUpdate(req.params.projectId, { $push: { approved: req.params.userId } }, { new: true })
                .then(project2 => res.json(project2))
        })
        .catch(e => next(e))
});

router.get("/buscador/:text", (req, res, next) => {
    const text = req.params.text
    const rg = new RegExp(text, 'i')
    Project.find({ title: rg })
        .then(obj => {
            return res.status(200).json(obj)
        })
})

//create
router.post("/", uploadCloud.single('file'), (req, res, next) => {
    console.log(req.body.profile)
    const { title, description, profile } = req.body;
    const pic = req.file.url;
    const newProject = new Project({ title, description, profile, creator: req.body.user, pic });
    console.log(req.body)
    newProject.save()
        .then(object => {
            User.findByIdAndUpdate(req.body.user, { $push: { projects: object._id } })
                .then(user => {
                    console.log(user)
                    return res.json(object)
                })
        })
        .catch(e => next(e))
});
//retrieve detail
router.get('/:id', (req, res, next) => {
    Project.findById(req.params.id)
        .populate('approved')
        .populate('creator')
        .then(object => res.json(object))
        .catch(e => next(e))
})
router.put('/:id', (req, res, next) => {
    const { title, description, profile, petitions, approved } = req.body;
    const updates = { title, description, profile, petitions, approved }

    Project.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then(object => res.json(object))
        .catch(e => next(e))
})

router.post('/apply', (req, res, next) => {
    const id = req.body.id;
    const projectId = req.body.projectId;

    Project.findByIdAndUpdate({ _id: projectId }, { $push: { petitions: id } })
        .then(object => res.json(object))
        .catch(e => next(e))

})

router.get('/getUserProject/:id', (req, res, next) => {
    Project.find({ creator:req.params.id } )
        .then(projects => {
            console.log(projects)
             res.json(projects)
             })
    
        .catch(e => next(e))
})





module.exports = router;