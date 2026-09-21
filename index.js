const express = require('express');

const app = express();

app.use(express.json());

const PORT = 8000;
const HOST = 'localhost';

const products = [
    { id: 1, name: "Smartphone", price: 500, category: "electronics" },
    { id: 2, name: "Laptop", price: 1000, category: "electronics" },
    { id: 3, name: "Headphones", price: 150, category: "electronics" },
    { id: 4, name: "Office Table", price: 200, category: "furniture" },
    { id: 5, name: "Office Chair", price: 100, category: "furniture" },
    { id: 6, name: "Sofa", price: 800, category: "furniture" }
];

function addProduct(newProduct, fail) {
    return new Promise((resolve, reject) => {
        if (fail === 'true') {
            reject(new Error('Simulated database error'));
        } else {
            products.push(newProduct);
            resolve(newProduct);
        }
    });
}

app.get('/', (req, res) => {
    res.json('text');
});

app.get('/products', (req, res) => {
    const { take, category } = req.query;
    let resultProducts = [...products];

    if (category) {
        resultProducts = resultProducts.filter((product) => product.category === category);
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
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ message: 'ID має бути додатним цілим числом' });
    }

    const product = products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Продукт не знайдено' });
    }

    res.status(200).json(product);
});

app.post('/products', async (req, res) => {
    const { name, price, category, image } = req.body;
    const { fail } = req.query;

    if (
        typeof name !== 'string' || name.trim() === '' ||
        typeof price !== 'number' || price <= 0 ||
        typeof category !== 'string' || category.trim() === ''
    ) {
        return res.status(422).json({ message: 'Invalid product data' });
    }

    const isDuplicate = products.some((p) => p.name === name);
    if (isDuplicate) {
        return res.status(409).json({ message: 'Conflict' });
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name,
        price,
        category,
        image: image ? image : ""
    };

    try {
        await addProduct(newProduct, fail);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущено на http://${HOST}:${PORT}`);
});