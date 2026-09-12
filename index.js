const express = require('express');

const app = express();

const PORT = 8000

const HOST = 'localhost'; 

app.get('/', (req, res)=>{
    console.log('Server get')
    res.json('text')
}
)

app.listen(PORT, HOST, ()=>{
    console.log(`Сервер запущен на http://${HOST}:${PORT}`)
})
