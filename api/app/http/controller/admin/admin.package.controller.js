const { PackageModel } = require("../../../models/products");
const { createLinckforFile } = require("../../../modules/function");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");

module.exports = new class PackageController {
    async creatPackage(req, res, next) {
        try {
            const { plan } = req.body;
            const result = await PackageModel.create({
                name: plan.name,
                type: plan.type,
                expireDate: plan.expireDate,
                price: plan.price,
                inventoryLimit: plan.inventoryLimit,
                dateVS: plan.dateVS,
                statusSupport: plan.statusSupport,
                statusVS: plan.statusVS,
                statusAccSt: plan.statusAccSt,
            });
            if (!result) throw createError.Unauthorized("Can not add Plan");
            return res.status(HttpSatatus.CREATED).json({
                data: {
                  statusCode: HttpSatatus.CREATED,
                  success: true,
                  message: "Plan Add successfully",
                  result
                },
              });
        } catch (error) {
            next(error);
        }
    }
    async getAllPackage(req, res, next) {
        try {
            const result = await PackageModel.find().sort({ createdAt: -1 }).limit(3);;
            if (!result) throw createError.NotFound("Plan Not Found");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "Plan sent successfully",
                  result
                },
              });

        } catch (error) {
            next(error);
        }
    }
    async showOnePackage(req, res, next) {
        try {
            const newsID = req.params.id;
            const result = await PackageModel.findOne({ _id: newsID });
            if (!result) throw createError.NotFound("Can not found Plan");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "Plan sent successfully",
                  result
                },
              });

        } catch (error) {
            next(error);
        }
    }
    async getUserOfPackage(req, res, next) {
        try {
            const owner = req.user._id;
            const pakageId = req.params.id;
            const result = await PackageModel.findOne({ _id: pakageId });
            if (!result) throw { status: 404, message: "can not found package" }
            result.image = req.protocol + "://" + req.get("host") + "/" + (result['image'].replace(/[\\\\]/gm, "/"));
            return res.status(200).json({
                status: 200,
                success: true,
                result
            })

        } catch (error) {
            next(error);
        }
    }
    async updatPackage(req, res, next) {
        try {
            const pakageId = req.params.id;
            const pakages = await PackageModel.find({ _id: pakageId });
            if (!pakages) throw createError.NotFound("Plan Not Found!!!");
            let data = req.body.data;
            if (!data.statusVS) data.dateVS = 0
            let fields = ["dateVS", "expireDate","dateVS", "name","type", "inventoryLimit","statusSupport", "statusVS","statusAccSt"];
            let badValues = ["", " ", null, NaN, undefined, -1];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            const result = await PackageModel.updateOne({ _id: pakageId }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(HttpSatatus.OK).json({
                    data: {
                      statusCode: HttpSatatus.OK,
                      success: true,
                      message: "Update Plan done",
                    },
                  });
            }
            throw createError.InternalServerError("Can not update Plan");
        } catch (error) {
            next(error);
        }
    }
    async removePackageByID(req, res, next) {
        try {
            const packageId = req.params.id;
            const result = await PackageModel.findOne({ _id: newsID });
            if (!result)  throw createError.NotFound("Can not found Plan");
            const deletePackage = await PackageModel.deleteOne({ _id: packageId });
            if (deletePackage.deletedCount == 0) throw createError.InternalServerError("can not delete Plan");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "delete Plan done"
                },
              });
        } catch (error) {
            next(error);
        }
    }
    async updateImage(req, res, next) {
        try {
            const { image } = req.body;
            const pakageId = req.params.id;
            const pakages = await PackageModel.find({ _id: pakageId });
            if (!pakages) throw { status: 404, message: "can not found package" }
            const result = await PackageModel.updateOne({ _id: pakageId }, { $set: { image } });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "update oackage image done"
                })
            }
            throw { status: 400, message: "can not update image package" }

        } catch (error) {
            next(error)
        }
    }
}