const express = require('express');

const app = express();

const PORT = 8000;
const HOST = 'localhost';

const products = [
    {
        id: 1,
        name: "iPhone 15",
        price: 35000,
        category: "electronics"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 32000,
        category: "electronics"
    },
    {
        id: 3,
        name: "Laptop Lenovo",
        price: 28000,
        category: "electronics"
    },
    {
        id: 4,
        name: "Office Chair",
        price: 5000,
        category: "furniture"
    },
    {
        id: 5,
        name: "Desk",
        price: 7000,
        category: "furniture"
    },
    {
        id: 6,
        name: "Wardrobe",
        price: 12000,
        category: "furniture"
    }
];

app.get('/', (req, res) => {
    res.json('text');
});

app.get('/products', (req, res) => {
    const { take, category } = req.query;

    let result = products;

    if (category) {
        result = result.filter(product => product.category === category);
    }

    if (take !== undefined) {
        const takeNumber = Number(take);

        if (!Number.isInteger(takeNumber) || takeNumber <= 0) {
            return res.status(400).json({
                message: 'Take must be a positive integer'
            });
        }

        result = result.slice(0, takeNumber);
    }

    res.status(200).json(result);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
            message: 'Id must be a positive integer'
        });
    }

    const product = products.find(product => product.id === productId);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    res.status(200).json(product);
});

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен на http://${HOST}:${PORT}`);
});