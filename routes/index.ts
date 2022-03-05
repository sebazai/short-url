import express from "express";
import UrlModel, { UrlInterface } from "../models/Url";
import { getUTCDateWithoutTime } from "../utils/date";

const defaultRouter = express.Router()

// GET /:shortid
defaultRouter.get("/:shortid", async (req, res, next) => {
    try {
        const url: UrlInterface | null  = await UrlModel.findOne({ shortCode: req.params.shortid })
    
        if (!url) {
            return res.status(404).json({ error: `Could not find url with id: ${req.params.shortid}` });
        }
        if (url.deletedAt) {
            return res.status(403).json({ error: "This short url has been deleted. Please post the long url to enable this endpoint" })
        }
    
        const today = getUTCDateWithoutTime()
        UrlModel.findOneAndUpdate({ shortCode: req.params.shortid }, 
            { $inc: { [`statistics.${today}`]: 1  } }, 
            { upsert: true, },
            (err) => {
                next(err)
            }
        )
    
        return res.redirect(url.longUrl)
    } catch (err) {
        next(err)
    }
})


export default defaultRouter