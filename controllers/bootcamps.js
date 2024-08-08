const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

//@desc    Get all bootcamps
//@route   GET /api/v1/bootcamps
//@access  Public
exports.getAllBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, results: bootcamps.length, data: bootcamps });
    } catch (e) {
        next(e);
    }
}

//@desc    Get bootcamp
//@route   GET /api/v1/bootcamps/:id
//@access  Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp with id of ${req.params.id} not foundd`, 404));
        }
        res.status(200).json({ success: true, data: bootcamp });
    } catch (e) {
        next(e);
    }
}

//@desc    Create bootcamp
//@route   POST /api/v1/bootcamps
//@access  Public
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (e) {
        next(e);
    }

}

//@desc    Update bootcamp
//@route   PUT /api/v1/bootcamps/:id
//@access  Public
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp with id of ${req.params.id} not foundd`, 404));
        }
        res.status(200).json({ success: true, data: bootcamp });
    } catch (e) {
        next(e);
    }

}

//@desc    Delete bootcamp
//@route   DELETE /api/v1/bootcamps/:id
//@access  Public
exports.deleteBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp with id of ${req.params.id} not foundd`, 404));
        }
        res.status(200).json({ success: true, message: `Bootcamp ID: ${req.params.id} has been deleted.` });
    } catch (e) {
        next(e);
    }

    res.status(200).json({ success: true, message: `Delete bootcamp ${req.params.id}` })
}