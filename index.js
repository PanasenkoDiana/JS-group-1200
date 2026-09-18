const express = require('express');

const app = express();

const PORT = 8000;
const HOST = 'localhost'; 

const products = [
    {
        id: 1,
        name: "test",
        price: 100,
        category: "test1category"
    },
    {
        id: 2,
        name: "test2",
        price: 101,
        category: "test1category"
    },
    {
        id: 3,
        name: "test3",
        price: 102,
        category: "test2category"
    },
    {
        id: 4,
        name: "test4",
        price: 101,
        category: "test3category"
    },
    {
        id: 5,
        name: "test5",
        price: 101,
        category: "test1category"
    },
    {
        id: 6,
        name: "test6",
        price: 105,
        category: "test2category"
    }
]

app.get('/', (req, res) => {
    console.log('Server get')
    res.json('text')
})

// query параметры позволяют передать доп. данные в url
// http://localhost:8000/products?take=2&category="test1category"
// получаем несколько продуктов с помощью slice
app.get('/products', (req, res) => {
    // получаем query параметры из url, возвращает объект в виде json(ключ: значение)
    const { take, category } = req.query
    console.log(req.query)

    // Переменная для отфильтрованных продуктов (исходный массив products не изменяем)
    let selectedProducts = products

    // Если передан параметр category — фильтруем массив по категории
    if (category) {
        selectedProducts = selectedProducts.filter((product) => product.category === category)
    }

    if (!take) {
        return res.status(200).json(selectedProducts)
    }

    const takeNumber = Number(take)
    
    // если не подходит возвращаем сообщение и статус 400
    if (!Number.isInteger(takeNumber) || takeNumber <= 0) {
        return res.status(400).json({ message: 'Take must be a positive integer' })
    }

    selectedProducts = selectedProducts.slice(0, takeNumber)

    res.status(200).json(selectedProducts)
})

app.get('/products/:id', (req, res) => {
    console.log(req.params)
    const { id } = req.params
    const productId = Number(id)
    
    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ message: 'Id must be a positive integer' })
    }
    
    const product = products.find((product) => {
        return product.id === productId
    })

    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    }
    
    res.status(200).json(product)
}) 

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен на http://${HOST}:${PORT}`)
})