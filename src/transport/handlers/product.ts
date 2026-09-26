import * as productService from "../../services/product.js"
import type { Request, Response } from "express"
import type { CreateProductRequest } from "../dto/product/requests.js"
import type { ProductRespone } from "../dto/product/responses.js"
import type { ErrorResponse } from "../dto/product/errors.js"

export const getProducts=(req:Request, res:Response)=>{
    const {take} = req.query

    if (!take) {
        return res.status(200).json(productService.getProducts())
    }
    
    const takeNumber = Number(take)
    
    if (! Number.isInteger(takeNumber) || takeNumber <= 0){
        return res.status(400).json({message: 'Take must be a positive integer'})
    }

    res.status(200).json(productService.getProducts(takeNumber))
}

export const getProductById=(req:Request,res:Response)=>{
    const { id } = req.params
    const productId = Number(id)
    if (! Number.isInteger(productId) || productId <= 0){
        return res.status(400).json({message: 'Id must be a positive integer'})
    }

    const product = productService.getProductById(productId)

    if (! product) {
        return res.status(404).json({message: 'Product not found'})
    }
    
    res.status(200).json(product)
}

export const createProduct=async(req:Request,res:Response)=>{
    const { name, price, category, image } = req.body;
    if  (
        typeof name !== 'string' || !name.trim() || 
        typeof price !== 'number' || price <= 0 ||
        typeof category !== 'string' || !category.trim()

    ){
        return res.status(422).json({message: "invalid product"})
    }
    try{
        const createdProduct = await productService.createdProduct({name, price, category, image})
        
        if(!createProduct){
            return res.status(409).json({message: "Product already exists"})
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Failed to create'})
    }
}