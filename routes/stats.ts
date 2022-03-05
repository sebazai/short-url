import express from "express"
import UrlModel, { UrlInterface } from "../models/Url"

const statsRouter = express.Router()

// GET /:shortid/stats
statsRouter.get("/:shortid", async (req, res, next) => {
  try {
    const url: UrlInterface | null = await UrlModel.findOne({ shortCode: req.params.shortid })
    if (!url) {
      return res
        .status(404)
        .json({
          error: `Could not find statistics for an URL with short code: ${req.params.shortid}`,
        })
    }

    if (url.deletedAt) {
      return res
        .status(403)
        .json({
          error:
            "This short url has been deleted. Please post the long url to enable this endpoint",
        })
    }

    return res.json(url.statistics)
  } catch (err) {
    next(err)
  }
})

export default statsRouter
