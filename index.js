const express = require('express');

const app = express();

const PORT = 8000;
const HOST = 'localhost'; 

const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 500,
        category: "electronics"
    },
    {
        id: 2,
        name: "Laptop",
        price: 1000,
        category: "electronics"
    },
    {
        id: 3,
        name: "Headphones",
        price: 150,
        category: "electronics"
    },
    {
        id: 4,
        name: "Office Table",
        price: 200,
        category: "furniture"
    },
    {
        id: 5,
        name: "Office Chair",
        price: 100,
        category: "furniture"
    },
    {
        id: 6,
        name: "Sofa",
        price: 800,
        category: "furniture"
    }
];

app.get('/', (req, res) => {
    console.log('Отримано GET-запит на головну сторінку');
    res.json('text');
});

app.get('/products', (req, res) => {
    const { take, category } = req.query;
    console.log('Query параметри:', req.query);

    let resultProducts = [...products];

    if (category) {
        resultProducts = resultProducts.filter((product) => {
            return product.category === category;
        });
    }

    if (take) {
        const takeNumber = Number(take);

        if (!Number.isInteger(takeNumber) || takeNumber <= 0) {
            return res.status(400).json({ message: 'Параметр take має бути додатним цілим числом' });
        }

        resultProducts = resultProducts.slice(0, takeNumber);
    }

    res.status(200).json(resultProducts);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    console.log('Route параметри:', req.params);
    
    const productId = Number(id);
    
    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ message: 'ID має бути додатним цілим числом' });
    }
    
    const product = products.find((product) => {
        return product.id === productId;
    });
    
    if (!product) {
        return res.status(404).json({ message: 'Продукт не знайдено' });
    }
    
    res.status(200).json(product);
}); 

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущено на http://{HOST}:{PORT}`);
});