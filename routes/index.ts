import express from "express";
import UrlModel, { UrlInterface } from "../models/Url";
import { getUTCDateWithoutTime } from "../utils/date";

const defaultRouter = express.Router()

// GET /:shortid
defaultRouter.get("/:shortid", async (req, res) => {
    const url: UrlInterface | null  = await UrlModel.findOne({ shortCode: req.params.shortid })

    if (!url) {
        return res.status(404).json("Long url not found");
    }

    const today = getUTCDateWithoutTime()
    UrlModel.findOneAndUpdate(url, 
        { $inc: { [`statistics.${today}`]: 1  } }, 
        { upsert: true },
        // (err, document) => {
        //     console.log(err)
        // }
    )

    return res.redirect(url.longUrl)
})


export default defaultRouter