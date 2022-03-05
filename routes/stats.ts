import express from "express";
import UrlModel, { UrlInterface } from "../models/Url";
import { getUTCDateWithoutTime } from "../utils/date";

const statsRouter = express.Router()

// GET /:shortid/stats
statsRouter.get("/:shortid", async (req, res) => {
    const url: UrlInterface | null  = await UrlModel.findOne({ shortCode: req.params.shortid })

    if (!url) {
        return res.status(404).json(`Could not find statistics for an URL with short code: ${req.params.shortid}`);
    }

    return res.json(url.statistics)
})


export default statsRouter