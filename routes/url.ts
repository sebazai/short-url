import express from "express"
import shortid from "shortid"
import c from "config"
import UrlModel, { UrlInterface } from "../models/Url"
import { urlRegexp } from "../frontend/src/utils/urlValidator"
import { getUTCDateWithoutTime } from "../utils/date"

const urlRouter = express.Router()

// POST /api/url/short
urlRouter.post("/short", async (req, res, next) => {
  try {
    const { url } = req.body
    // Probably not undefined, as it's defined by use
    const baseUrl: string = c.get("baseUrl")

    // Check that incoming URL is valid if POST request done outside frontend
    const regexUrlValidator = new RegExp(urlRegexp)
    if (!regexUrlValidator.test(url)) {
      return res.status(400).json({ error: "Invalid URL format" })
    }

    const urlInDb = await UrlModel.findOne({ longUrl: url })
    if (urlInDb) {
      // Return URL data if found in DB
      if (urlInDb.deletedAt) {
        // Enable shorturl again
        await UrlModel.updateOne({ longUrl: url }, { $set: { deletedAt: null } })
      }
      return res.json(urlInDb)
    }

    // Generate new shortUrl and add to DB
    const shortId = shortid.generate()
    const shortUrl = baseUrl + "/" + shortId
    const newUrlInstance = new UrlModel({
      longUrl: url,
      shortUrl: shortUrl,
      shortCode: shortId,
      createdAt: new Date(),
      statistics: new Map([[getUTCDateWithoutTime(), 0]]),
    })

    await newUrlInstance.save()
    return res.json(newUrlInstance)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/url/short/:shortid
urlRouter.delete("/short/:shortid", async (req, res, next) => {
  try {
    const url: UrlInterface | null = await UrlModel.findOne({ shortCode: req.params.shortid })

    if (!url) {
      return res
        .status(404)
        .json({ error: `Could not delete a URL with short code: ${req.params.shortid}` })
    }

    await UrlModel.updateOne({ shortCode: req.params.shortid }, { $set: { deletedAt: new Date() } })
    return res.status(200).json({ message: "Deleted succesfully" })
  } catch (err) {
    next(err)
  }
})

export default urlRouter
