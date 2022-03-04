import express from "express";
import shortid from "shortid";
import c from "config";
import UrlModel from "../models/Url"
import { urlRegexp } from "../frontend/src/utils/urlValidator";
import { getUTCDateWithoutTime } from "../utils/date";

const urlRouter = express.Router()

// POST /api/url/short
urlRouter.post("/short", async (req, res) => {
    const { url } = req.body;
    // Probably not undefined, as it's defined by use
    const baseUrl: string = c.get("baseUrl")

    // Check that incoming URL is valid.
    const regexUrlValidator = new RegExp(urlRegexp)
    if (!regexUrlValidator.test(url)) {
        return res.status(400).json("Invalid URL format")
    }

    // Will add an OPS to statistics
    const urlInDb = await UrlModel.findOne({longUrl: url})
    if (urlInDb) {
        // Return URL data if found in DB
        return res.json(urlInDb);
    }

    // Generate new shortUrl and add to DB
    const shortId = shortid.generate()
    const shortUrl = baseUrl + "/" + shortId
    const newUrlInstance = new UrlModel({
        longUrl: url,
        shortUrl: shortUrl,
        shortCode: shortId,
        createdAt: new Date(),
        statistics: new Map([
            [getUTCDateWithoutTime(), 0]
        ])
    })

    await newUrlInstance.save()
    return res.json(newUrlInstance)
})

export default urlRouter 