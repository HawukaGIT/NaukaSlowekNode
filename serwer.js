import express from "express"
import cors from "cors"
import router from './api/route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)

export default app