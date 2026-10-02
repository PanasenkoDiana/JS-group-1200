import type { ProductService } from "../../services/product/product.types.js"
import type { Request, Response } from "express"
import type { CreateProductRequest } from "../dto/product/requests.js"
import type { ProductRespone } from "../dto/product/responses.js"
import type { ErrorResponse } from "../dto/product/errors.js"

export interface ProductHandlers {
    getProducts(
        req: Request,
        res: Response<ProductRespone[] | ErrorResponse>
    ): Promise<void>

    getProductById(
        req: Request,
        res: Response<ProductRespone | ErrorResponse>
    ): Promise<void>

    createProduct(
        req: Request<{}, {}, CreateProductRequest>,
        res: Response<ProductRespone | ErrorResponse>
    ): Promise<void>
}

export function createProductHandler(
    productService: ProductService
): ProductHandlers {
    return {
        async getProducts(req, res) {
            try {
                const { take } = req.query

                if (!take) {
                    const products = await productService.getProducts()
                    res.status(200).json(products)
                    return
                }

                const takeNumber = Number(take)

                if (!Number.isInteger(takeNumber) || takeNumber <= 0) {
                    res.status(400).json({
                        message: "Take must be a positive integer"
                    })
                    return
                }

                const products = await productService.getProducts(takeNumber)
                res.status(200).json(products)
            } catch (error) {
                console.error(error)
                res.status(500).json({
                    message: "server error"
                })
            }
        },

        async getProductById(req, res) {
            try {
                const productId = Number(req.params.id)

                if (!Number.isInteger(productId) || productId <= 0) {
                    res.status(400).json({
                        message: "Id must be a positive integer"
                    })
                    return
                }

                const product = await productService.getProductById(productId)

                if (!product) {
                    res.status(404).json({
                        message: "Product not found"
                    })
                    return
                }

                res.status(200).json(product)
            } catch (error) {
                console.error(error)
                res.status(500).json({
                    message: "server error"
                })
            }
        },

        async createProduct(req, res) {
            const { name, price, category, image } = req.body

            if (
                typeof name !== "string" ||
                !name.trim() ||
                typeof price !== "number" ||
                price <= 0 ||
                typeof category !== "string" ||
                !category.trim()
            ) {
                res.status(422).json({
                    message: "invalid product"
                })
                return
            }

            try {
                const createdProduct = await productService.createProduct({
                    name,
                    price,
                    category,
                    image
                })

                if (!createdProduct) {
                    res.status(409).json({
                        message: "Product already exists"
                    })
                    return
                }

                res.status(201).json(createdProduct)
            } catch (error) {
                console.error(error)
                res.status(500).json({
                    message: "Failed to create"
                })
            }
        }
    }
}