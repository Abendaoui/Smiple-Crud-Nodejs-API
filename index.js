require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')

require('express-async-errors')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Routes
app.get('/',(req,res) =>{
 res.send('<div><h1>API : <a href="" /> </h1></div>')
})
app.use('/api/v1/products', productRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database')
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log('Server Listening On Port ' + port)
    })
  })
  .catch((err) => {
    console.error(err)
  })
