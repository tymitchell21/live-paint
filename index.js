const express = require("express")
const fs = require("fs")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

// Fill in your request handlers here
app.post('/updates', (req, res) => {
    fs.readFile('./public/updates.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        req.body.clientupdates.forEach(fill => {
            data.updates.push(fill)
        })

        fs.writeFile('./public/updates.json', JSON.stringify(data), (err) => {
            if(err) throw err;
            console.log('the file has been saved!')
        })

        res.send(data)
    })
})

app.listen(port)