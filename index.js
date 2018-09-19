const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

const todoSchema = new mongoose.Schema({
    job: String,
    done: Boolean 
})
const todo = mongoose.model('todo', todoSchema)

app.get('/query', (req, res) => {
    // res.send('Hello World')
    todo.find((err, value) => {
        if(err){
            console.error(err)
            return
        }
        // console.log(value)
        res.send(value)
    })
})

app.get('/queryOne', (req, res) => {
    const jobjob = req.query.job 
    todo.findOne({ job: jobjob }, (err, value) => {
        if(err) {
            console.error(err)
            return
        }
        if(value) {
            res.send(value)
        } else {
            res.send('Not Found!!!')
        }
    })
})

app.get('/save', (req, res) => {
    if(!req.query.job){
        res.send('Please Enter Job job')
        return
    }
    
    const data = {
        job: req.query.job, 
        done: false
    }
    
    todo.create(data, (err, value) => {
        if(err){
            console.error(err)
            return
        }
        console.log(value)
        res.send('Finish')
    })
})

app.get('/update', (req, res) => {
    const job = req.query.job
    const data = req.query.data
    todo.findOneAndUpdate({ job: job }, { job: data }, (err, value) => {
        if(err) {
            console.error(err)
            return
        }
        if(value) {
            res.send('Finish')
        } else {
            res.send(job+ ' Not Found')
        }
    })
})



app.get('/delete', (req, res) => {
    const job = req.query.job
    todo.findOneAndRemove({ job: job }, (err, value) => {
        if(err) {
            console.error(err)
            return
        }
        if(value) {
            res.send('Delete Finish')
        } else {
            res.send(job+' Not Found')
        }
    })  
})

app.listen(3000, () => {
    console.log('Run on Port:3000')
})
