import * as productRepository from "../repositories/product.js"

interface CreateProductData{
    name: string
    price: number
    image?: string
    category: string
}
export const getProducts=(take?:number)=>{
    return productRepository.getAll(take)
}

export const getProductById=(id:number)=>{
    return productRepository.getById(id)
}

export const createdProduct=async(data:CreateProductData)=>{
    const duplicate = productRepository.findByName(data.name)
    if (duplicate) {
        return null
    }
    const products = productRepository.getAll()
    const newProduct = {
        id: products.length + 1,
        name: data.name.trim(),
        price: data.price,
        category: data.category.trim(),
        image: data.image ?? ""   
    }
    return await productRepository.addProduct(newProduct)
}