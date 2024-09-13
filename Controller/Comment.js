let COMMENT = require('../Models/comment')

exports.CommentCreate = async function (req, res, next) {
    try {

        let CommentCreate = await COMMENT.create(req.body)

        res.status(200).json({
            status: "Success",
            message: "Comment Create SuccessFully!",
            data: CommentCreate

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

        let CommentData = await COMMENT.find().populate("user").populate("post")

        res.status(200).json({
            status: "Success",
            message: "Comment Found SuccessFully!",
            data: CommentData

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

        let CommentFind = await COMMENT.findById(req.params.id)

        res.status(200).json({
            status: "Success",
            message: "Comment Find SuccessFully!",
            data: CommentFind

        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.CommentDelete = async function (req, res, next) {
    try {

        await COMMENT.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "Success",
            message: "Comment Delete SuccessFully!",
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.CommentUpdate = async function (req, res, next) {
    try {

        console.log(req.body);
        let CommentUpdate = await COMMENT.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log(CommentUpdate);

        res.status(200).json({
            status: "Success",
            message: "Comment Update SuccessFully!",
            data: CommentUpdate
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}
