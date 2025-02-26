const { KycModel } = require("../../../models/kyc");
const { NotifModel } = require("../../../models/notif");
const { TicketModel } = require("../../../models/ticket");
const createError = require("http-errors");
const nodemailer = require('nodemailer');
module.exports = new class AdminController {
    // ----------- notif
    async createNotif(req, res, next) {
        try {
            const { date, type, userID, title, descri } = req.body;
            const result = NotifModel.create({ date, type, userID, title, descri });
            if (!result) throw { status: 400, message: "can not add notif" }
            return res.status(201).json({
                status: 201,
                success: true,
                message: "create notif",
                result
            })
        } catch (error) {
            next(error);
        }
    }
    async showAllNotif(req, res, next) {
        try {
            const result = await NotifModel.find();
            if (!result) throw createError.NotFound("Notif Not Found");
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showOneNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const result = await NotifModel.find({ _id: notifId });
            if (!result) throw { status: 404, message: "can not found notif" }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showOneNotifOfUser(req, res, next) {
        try {
            const userID = req.user._id;
            const result = await NotifModel.find({ userID: userID });
            if (result.length === 0) throw { status: 404, message: "can not found notif" }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async updateNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const notif = await NotifModel.find({ _id: notifId });
            if (notif === 0) throw { status: 404, message: "can not found notif" }
            let fields = ["date", "type", "userID", "title", "descri"];
            let badValues = ["", " ", null, NaN, undefined, -1];
            let data = { ...req.body };
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            const result = await NotifModel.updateOne({ _id: notifId }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "update notif done",
                    result
                })
            }
            throw { status: 400, message: "can not update notif" }
        } catch (error) {
            next(error);
        }
    }
    async removeNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const result = await NotifModel.find({ _id: notifId });
            if (result === 0) throw { status: 404, message: "can not found notif" }
            const deleteNotif = await NotifModel.deleteOne({ _id: notifId });
            if (deleteNotif.deletedCount == 0) throw { status: 400, message: "can not delete notif" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "delete notif done"
            })

        } catch (error) {
            next(error);
        }
    }
    // ---------- Ticket

    async createTicket(req, res, next) {
        try {
            const userID = req.user._id;
            const { email, topic, department, releventRobot, statustick, importTick, text, parentID } = req.body;
            const result = await TicketModel.create({ userID, email, topic, department, releventRobot, statustick, importTick, text, parentID });
            if (!result) throw { status: 400, message: "can not add ticket" }
            return res.status(201).json({
                status: 201,
                success: true,
                message: "create ticket",
                result

            })
        } catch (error) {
            next(error);
        }
    }
    async showAllTicket(req, res, next) {
        try {

            // const result = await TicketModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "tickets",
            //             localField: "_id",
            //             foreignField: "parentID",
            //             as: "childeren"
            //         }
            //     }, {
            //         $project: {
            //             __v: 0,
            //             "childeren.__v": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parentID: undefined
            //         }
            //     }
            // ])


            const result = await TicketModel.aggregate([
                {
                    $graphLookup: {
                        from: "tickets",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parentID",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "childeren"
                    }
                }, {
                    $project: {
                        __v: 0,
                        "childeren.__v": 0,
                        "childeren.parent": 0
                    }
                },
                {
                    $match: {
                        parentID: undefined
                    }
                }
            ])

            //const result = await TicketModel.find({parentID : undefined});
            if (result.length === 0) throw { status: 404, message: "can not found ticket" }
            for (const resa of result) {
                resa.image = req.protocol + "://" + req.get("host") + "/" + (resa.image.replace(/[\\\\]/gm, "/"));
            }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showAllParentTicket(req, res, next) {
        try {
            const userID = req.user._id;
            const parentID = req.params.id;
            const result = await TicketModel.find({parentID:undefined,userID});
            if (result.length === 0) throw { status: 404, message: "can not found ticket" }
            for (const resa of result) {
                resa.image = req.protocol + "://" + req.get("host") + "/" + (resa.image.replace(/[\\\\]/gm, "/"));
            }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showOneTicket(req, res, next) {
        try {
            const userID = req.user._id;
            const ticketId = req.params.id;
            const result = await TicketModel.findOne({ _id: ticketId, userID });
            if (!result) throw { status: 404, message: "can not found ticket" }
            if (result['image'] !== '')
                result[0]['image'] = req.protocol + "://" + req.get("host") + "/" + (result[0]['image'].replace(/[\\\\]/gm, "/"));
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showOneTicketOfUser(req, res, next) {
        try {
            const userID = req.user._id;
            const result = await TicketModel.aggregate([
                {
                    $graphLookup: {
                        from: "tickets",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parentID",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "childeren"
                    }
                }, {
                    $project: {
                        __v: 0,
                        "childeren.__v": 0
                    }
                },                {
                    $match: {
                        userID: userID
                    }
                }
            ]);            
            //const result = await TicketModel.find({ userID });
            if (result.length === 0) throw { status: 404, message: "can not found ticket" }
            for (const resa of result) {
                resa.image = req.protocol + "://" + req.get("host") + "/" + (resa.image.replace(/[\\\\]/gm, "/"));
            }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async updateTicket(req, res, next) {
        try {
            const userID = req.user._id
            const ticketId = req.params.id;
            const ticke = await TicketModel.findOne({ _id: ticketId, userID });
            if (!ticke) throw { status: 404, message: "can not found ticke" }
            let fields = ["email", "topic", "department", "releventRobot", "importTick", "statustick", "text"];
            let badValues = ["", " ", null, NaN, undefined, -1];
            let data = { ...req.body };
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            const result = await TicketModel.updateOne({ _id: ticketId, userID }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "update ticke done-- " + ticketId
                })
            }
            throw { status: 400, message: "can not update ticke" }
        } catch (error) {
            next(error);
        }
    }
    async removeTicket(req, res, next) {
        try {
            const userID = req.user._id;
            const ticketId = req.params.id;
            const result = await TicketModel.findOne({ _id: ticketId, userID });
            if (!result) throw { status: 404, message: "can not found ticket" }
            const deleteNotif = await TicketModel.deleteOne({ _id: ticketId, userID });
            if (deleteNotif.deletedCount === 0) throw { status: 400, message: "can not delete ticket" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "delete ticket done"
            })

        } catch (error) {
            next(error);
        }
    }
    async uploadTicketImage(req, res, next) {
        try {
            const { image } = req.body;
            const userID = req.user._id;
            const ticketId = req.params.id;
            const pakages = await TicketModel.find({ _id: ticketId });
            if (!pakages) throw { status: 404, message: "can not found KYC" }
            const result = await TicketModel.updateOne({ _id: ticketId, userID }, { $set: { image } });
            if (result.modifiedCount == 0) throw { status: 400, message: "can not upload img" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "upload img done"
            })
        } catch (error) {
            next(error)
        }
    }

    // ---------- Kyc

    async createKyc(req, res, next) {
        try {
            const userName = JSON.stringify(req.user.username);
            const { name, image } = req.body;
            const result = KycModel.create({ username: userName, name, image });
            if (!result) throw { status: 400, message: "can not add kyc" }
            return res.status(201).json({
                status: 201,
                success: true,
                message: "create kyc"
            })
        } catch (error) {
            next(error);
        }
    }
    async showAllKyc(req, res, next) {
        try {
            const result = await KycModel.find();
            if (!result) throw { status: 404, message: "can not found ticket" }
            for (const resa of result) {
                resa.image = req.protocol + "://" + req.get("host") + "/" + (resa.image.replace(/[\\\\]/gm, "/"));
            }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showOneKyc(req, res, next) {
        try {
            const kycId = req.params.id;
            const result = await KycModel.find({ _id: kycId });
            if (!result) throw { status: 404, message: "can not found ticket" }
            result[0]['image'] = req.protocol + "://" + req.get("host") + "/" + (result[0]['image'].replace(/[\\\\]/gm, "/"));
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async showOneKycOfUser(req, res, next) {
        try {
            const userName = JSON.stringify(req.user.username);
            const result = await KycModel.find({ username: userName });
            if (!result) throw { status: 404, message: "can not found ticket" }
            for (const resa of result) {
                resa.image = req.protocol + "://" + req.get("host") + "/" + (resa.image.replace(/[\\\\]/gm, "/"));
            }
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async updateKyc(req, res, next) {
        try {
            const kycId = req.params.id;
            const ticke = await KycModel.find({ _id: kycId, username: JSON.stringify(req.user.username) });
            if (!ticke) throw { status: 404, message: "can not found kyc" }
            let fields = ["name"];
            let badValues = ["", " ", null, NaN, undefined, -1];
            let data = { ...req.body };
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            const result = await KycModel.updateOne({ _id: kycId, username: JSON.stringify(req.user.username) }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "update kyc done-- " + kycId
                })
            }
            throw { status: 400, message: "can not update kyc" }
        } catch (error) {
            next(error);
        }
    }
    async removeKyc(req, res, next) {
        try {
            const kycId = req.params.id;
            const result = await KycModel.find({ _id: kycId, username: JSON.stringify(req.user.username) });
            if (!result) throw { status: 404, message: "can not found kyc" }
            const deleteNotif = await KycModel.deleteOne({ _id: kycId, username: JSON.stringify(req.user.username) });
            if (deleteNotif.deletedCount == 0) throw { status: 400, message: "can not delete kyc" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "delete kyc done"
            })

        } catch (error) {
            next(error);
        }
    }
    async uploadKycImage(req, res, next) {
        try {
            const { image } = req.body;
            const kycId = req.params.id;
            const pakages = await KycModel.find({ _id: kycId });
            if (!pakages) throw { status: 404, message: "can not found KYC" }
            const result = await KycModel.updateOne({ _id: kycId, username: JSON.stringify(req.user.username) }, { $set: { image } });
            if (result.modifiedCount == 0) throw { status: 400, message: "can not upload img" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "upload img done"
            })
        } catch (error) {
            next(error)
        }
    }

    //send Email



    async sendEmail(req, res, next) {
        let code = 123456;
        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'davodbasiri95@outlook.com',
                pass: 'Mehdi123456789'
            }
        });
        var mailOptions = {
            from: 'davodbasiri95@outlook.com',
            to: 'davodbasiri95@gmail.com',
            subject: 'FxTrader account security code',
            html: `<h1>Security code</h1><p>Please use the following security code for the FxTrader account da**5@outlook.com.</p><p>Security code : ${code}</p>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                throw createError.InternalServerError.message('Can Not Send Message')
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "mail Send ",
                    data: info.response
                })
            }
        });
    }


}
