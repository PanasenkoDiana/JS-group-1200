const express = require('express');

const app = express();
// app.use(express.json()) - встроенный middleware, который позволяет спарсить json обьект в js обьект
app.use(express.json())

const PORT = 8000
const HOST = 'localhost'; 

let products = [
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

app.get('/', (req, res)=>{
    console.log('Server get')
    res.json('text')
}
)

function addProduct(newProduct, fail){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail === 'true') {
                return reject(new Error('product save failed'))
            }
            products = [...products, newProduct]
            resolve(newProduct)
        },500)
    })
}
// app.post - позволяет обрабатывать, отправлять пост запрос
app.post('/products', async (req, res)=> {
    // req.body - хранит в себе тело пост запроса
    console.log(req.body)
    const { name, price, category, image = '' } = req.body;
    if  (
        // trim() - функция позволяет убрать все пробелы
        // 
        typeof name !== 'string' || !name.trim() || 
        typeof price !== 'number' || price <= 0 ||
        typeof category !== 'string' || !category.trim()
    ){
        return res.status(422).json({message: "invalid product"})
        }
    const duplicate = products.find((product) => {

        // сравнивает свойство name из массива продуктов с данными которые приходят
        // toLowerCase() - позволяет изменить реестр букв на маленькие
        return product.name.toLowerCase() === name.trim( ).toLowerCase()
    })
    if (duplicate){
        return res.status(409).json({message:'product already exist'})

    }
    const newProduct = {
        id: products.length + 1,
        name: name.trim(),
        price,
        category: category.trim(),
        image
    }
    try{
        const createdProduct = await addProduct(newProduct, req.query.fail)
        return res.status(201).json(createdProduct)
    }catch (error){
        console.error(error)
        return res.status(500).json({message:'Failed to create'})
    }
})


// query параметры позволяют передать доп. данные в url
// http://localhost:8000/products?take=2&category="test1category"
// получаем несколько продуктов с помощью slice
app.get('/products', (req, res) => {
    // получаем query параметры из url, возвращает объект в виде json(ключ: значение)
    const { take, category } = req.query
    console.log(req.query)

    let selectedProducts = products

    if (category) {
        selectedProducts = selectedProducts.filter((product) => product.category === category)
    }

    //если  take не был передан,возвращаем масив products
    if (! take ) {
        return res.status(200).json(selectedProducts)
    }

    //Number() - используеться для преоброзования значения в число, 
    // если значение не возможно преобразовать в число, то вернется NaN
    const takeNumber = Number(take)
    // Являиться ли take целым числом Number.isInteger(takeNumber) и являиться ли оно положительным числомtakeNumber <= 0
    //  если не подходит возвращаем сообщение
    // isInteger() - проверяет являеться ли значение целым числом
    if (! Number.isInteger(takeNumber) || takeNumber <= 0){
        return res.status(400).json({message: 'Take must be a positive integer'})
    }
    //slice - разделяет массив на части, обязательно принимает два параметра, начальное число и конечное число
    selectedProducts = selectedProducts.slice(0, takeNumber)

    //отправляем статус 200 и selectedProducts в формате json
    res.status(200).json(selectedProducts)
    // 200 - OK
    // 201 - Created
    // 400 - Bad request
    // 401 - Unauthorized
    // 403 - Forbidden
    // 404 - Not found
    // 500 - Internal Server error
})
// получаем 1 продукт по id
// route параметр - это динамическая часть url, которая может меняться в зависимости от запроса
app.get('/products/:id', (req, res) => {
    console.log(req.params)
    //диструктуризируем route параметры, что бы получить id
    const { id } = req.params
    //Number() - используеться для преоброзования значения в число, 
    // так как изначально route параметры (в нашем случае id) приходит в виде строки
    const productId = Number(id)
    // Являиться ли productId целым числом Number.isInteger(productId) и являиться ли оно положительным числом productId <= 0
    if (! Number.isInteger(productId) || productId <= 0){
        return res.status(400).json({message: 'Id must be a positive integer'})
    }
    // find - метод который позволяет найти первое совпадение в массиве
    // возвращаем результат в переменную product
    const product = products.find( (product) => {
        return product.id === productId
    } )
    // const product = products.find(product => product.id === productId) 
    // если product не найден, возвращаем статус 404 и сообщение 
    if (! product) {
        return res.status(404).json({message: 'Product not found'})
    }
    
    res.status(200).json(product)
}) 

app.listen(PORT, HOST, ()=>{
    console.log(`Сервер запущен на http://${HOST}:${PORT}`)
})