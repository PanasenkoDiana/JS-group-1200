let products = [
    {
        id: 1,
        name: "test",
        price: 100,
        category: "test1category",
        image: '1.png'
    },
    {
        id: 2,
        name: "test2",
        price: 101,
        category: "test1category",
        image: '1.png'
    },
    {
        id: 3,
        name: "test3",
        price: 102,
        category: "test2category",
        image: '1.png'
    },
    {
        id: 4,
        name: "test4",
        price: 101,
        category: "test3category",
        image: '1.png'
    },
    {
        id: 5,
        name: "test5",
        price: 101,
        category: "test1category",
        image: '1.png'
    }
]

export function getAll(take){
    if(!take){
        return [...products]
    }
    return products.slice(0, take)
}

export function getById(id){
    return products.find(
        function(product){
            return product.id === id
        }
    )
}

export function findByName(name){
    return products.find(
        function(product){
            return product.name.trim().toLowerCase() === name.trim().toLowerCase()
        }
    )
}

export function addProduct(newProduct){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            products = [...products, newProduct]
            resolve(newProduct)
        },500)
    })
}