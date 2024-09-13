let POST = require('../Models/post')

exports.PostCreate = async function (req, res, next) {
    try {

        console.log(req.file);
        if (!req.file) throw new Error('Images upload failed');

        req.body.imageUrl = req.file.originalname;

        let PostCreate = await POST.create(req.body)

        res.status(200).json({
            status: "Success",
            message: "POST Create SuccessFully!",
            data: PostCreate

        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }

}

exports.FindData = async function (req, res, next) {
    try {

        let PostData = await POST.find().populate("user").populate("likes").populate("comments.user")

        res.status(200).json({
            status: "Success",
            message: "POST Found SuccessFully!",
            data: PostData

        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }

}

exports.FindId = async function (req, res, next) {
    try {

        let PostFind = await POST.findById(req.params.id)

        res.status(200).json({
            status: "Success",
            message: "POST Find SuccessFully!",
            data: PostFind

        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.PostDelete = async function (req, res, next) {
    try {

        await POST.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "Success",
            message: "POST Delete SuccessFully!",
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.PostUpdate = async function (req, res, next) {
    try {

        console.log(req.file);
        if (!req.file) throw new Error('Images upload failed');

        req.body.imageUrl = req.file.originalname;

        console.log(req.body);

        let PostUpdate = await POST.findByIdAndUpdate(req.params.id, req.body, { new: true })

        console.log(PostUpdate);

        res.status(200).json({
            status: "Success",
            message: "POST Update SuccessFully!",
            data: PostUpdate
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}
