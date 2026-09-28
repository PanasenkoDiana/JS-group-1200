import type { Product } from "../../domain/product/entity.js"

export interface CreateProductInput {
    name: string,
    price: number,
    image?: string,
    category: string
}

export interface ProductService {
    getProducts(take?: number): Promise<Product[]>
    getProductById(id: number): Promise<Product | undefined>
    createProduct(input: CreateProductInput): Promise<Product | null>
}