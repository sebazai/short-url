import app from "./server"
import c from "config"
import express from "express"
import path from "path"

const PORT = Number(process.env.PORT || c.get("PORT") || 8080)
app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`)
})
