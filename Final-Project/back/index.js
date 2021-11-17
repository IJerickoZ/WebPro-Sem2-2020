const express = require("express")
var cors = require('cors')
const path = require("path")
const app = express();
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const empRouter = require('./routes/employees')
const partnerRouter = require('./routes/partner')
const invRouter = require('./routes/inventory')
const transRouter = require('./routes/transaction')
const loginRouter = require('./routes/login')

app.use(empRouter.router)
app.use(partnerRouter.router)
app.use(invRouter.router)
app.use(transRouter.router)
app.use(loginRouter.router)

app.listen(3001, () => {
    console.log(`Example app listening at http://localhost:3001`)
})