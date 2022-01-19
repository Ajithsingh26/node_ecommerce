const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv/config')

const app = express()

//cors
app.use(cors());
app.options('*',cors());

// middleware
app.use(express.json());
app.use(morgan('tiny'));

//routers
const productRouter = require('./routers/product')
const categoryRouter = require('./routers/category')
const userRouter = require('./routers/user')

app.use('/api/product/',productRouter) //product
app.use('/api/category/',categoryRouter) //category
app.use('/api/user/',userRouter) //user


//database
mongoose.connect(process.env.CONN_STRING)
.then(function(){
    console.log("connected")
})
.catch(function(err){
    console.log(err)
});


app.listen(3000)