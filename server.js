const express = require('express')
const mongoose = require('mongoose')
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

const app=express();
const config = require('config')

const path = require('path')
app.use(express.json());

const db = config.get('mongoURL')

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>console.log("Database Connected!"))
.catch(err=>console.log(err))


app.use('/api/items/', items)
app.use('/api/users/', users)
app.use('/api/auth/', auth)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server started on port ${port}.`))

