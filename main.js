const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./config/mongo')

const app = express()

const Router = require('./routes/main.route')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static("uploads"))

app.use(Router)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

