const express = require('express');

const app = express();

const PORT = 8000

const HOST = 'localhost'; 

app.get('/', (req, res)=>{
    console.log('Server get')
    res.json('text')
}
)
app.get('/Valera', (req, res)=>{
    res.json({
        name: "Valera",
        age: 15,
        hobby: "ne delyat domashnee zadanye"
    })
})
app.get('/Ilya', (req, res) => {
    res.json({
        name: "Ilya",
        age: "16",
        hobby: "hobby"
    })
})

app.listen(PORT, HOST, ()=>{
    console.log(`Сервер запущен на http://${HOST}:${PORT}`)
})

