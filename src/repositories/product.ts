import type { Product } from "../domain/product/entity.ts"
import type { ProductRepository } from "../domain/product/repository.ts"

export function createProductRepository(): ProductRepository {
    let products: Product[]= [
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
    return {
        async getAll(take){
            return take === undefined ? [...products] : products.slice(0, take)
        },
        async getById(id){
            return products.find(
                (product)=>{product.id === id}
            )
        },
        async createProduct(data){
            await new Promise<void>((resolve)=>{
                setTimeout(resolve, 500)
            })
            const newId = products.length + 1
            const product =  {
                id: newId,
                ...data
            }
            products = [...products, product]
            return product
        }
    }
}
