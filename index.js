const express = require('express');

const app = express();

app.use(express.json());

const PORT = 8000;
const HOST = 'localhost';

const products = [
    {
        id: 1,
        name: 'test',
        price: 100,
        category: 'test1category'
    },
    {
        id: 2,
        name: 'test2',
        price: 101,
        category: 'test1category'
    },
    {
        id: 3,
        name: 'test3',
        price: 102,
        category: 'test2category'
    },
    {
        id: 4,
        name: 'test4',
        price: 101,
        category: 'test3category'
    },
    {
        id: 5,
        name: 'test5',
        price: 101,
        category: 'test1category'
    }
];


// GET /
app.get('/', (req, res) => {
    res.json('text');
});


// GET /products
app.get('/products', (req, res) => {
    const { take, category } = req.query;

    let result = [...products];

    if (category) {
        result = result.filter(product => product.category === category);
    }

    if (take) {
        result = result.slice(0, Number(take));
    }

    res.json(result);
});


// GET /products/:id
app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    res.json(product);
});


// Добавление продукта через Promise
function addProduct(newProduct, fail = false) {
    return new Promise((resolve, reject) => {
        if (fail) {
            reject(new Error('Failed to save product'));
            return;
        }

        products.push(newProduct);

        resolve(newProduct);
    });
}


// POST /products
app.post('/products', async (req, res) => {
    const { name, price, category, image } = req.body;

    // Валидация обязательных данных
    if (
        typeof name !== 'string' ||
        name.trim() === '' ||
        typeof price !== 'number' ||
        price <= 0 ||
        typeof category !== 'string' ||
        category.trim() === ''
    ) {
        return res.status(422).json({
            message: 'Invalid product data'
        });
    }

    // Проверка дубликата названия
    const duplicate = products.some(
        product => product.name === name.trim()
    );

    if (duplicate) {
        return res.status(409).json({
            message: 'Conflict'
        });
    }

    // Создание нового продукта
    const newProduct = {
        id: products.length + 1,
        name: name.trim(),
        price,
        category: category.trim(),
        image: image || ''
    };

    // fail=true -> имитация ошибки сохранения
    const fail = req.query.fail === 'true';

    try {
        const product = await addProduct(newProduct, fail);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});


app.listen(PORT, HOST, () => {
    console.log(`Server started at http://${HOST}:${PORT}`);
});