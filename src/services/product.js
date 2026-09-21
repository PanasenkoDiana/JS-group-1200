import * as productRepository from "../repositories/product.js"

export function getProducts(take){
    return productRepository.getAll(take)
}

export function getProductById(id){
    return productRepository.getById(id)
}

export async function createdProduct(data) {
    const duplicate = productRepository.findByName(data.name)
    if (duplicate) {
        return null
    }
    const products = productRepository.getAll()
    const newProduct = {
        id: products.length + 1,
        name: data.name.trim(),
        price: data.price(),
        category: data.category.trim(),
        image: data.image ?? ""   
    }
    return await productRepository.addProduct(newProduct)
}