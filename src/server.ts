import express from 'express'
import productRouter from './transport/routers/product.js'
//const express = require('express');

const app = express();
// app.use(express.json()) - встроенный middleware, который позволяет спарсить json обьект в js обьект
app.use(express.json())
app.use('/products', productRouter)
// products    ->  router.get('/', getProducts)
// products/1  ->  router.get('/:id', getProductById)

const PORT = 8000
const HOST = 'localhost'; 



app.listen(PORT, HOST, ()=>{
    console.log(`Сервер запущен на http://${HOST}:${PORT}`)
})

