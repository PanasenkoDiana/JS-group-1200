export interface CreateProductRequest {
    title: string
    price: number
}
export interface UpdateProductRequest {
    title?: string
    price?: number
}