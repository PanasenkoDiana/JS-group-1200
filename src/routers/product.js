import { getProductById,getProducts,createProduct } from "../handlers/product";
//что бы создавать обычные пути
import { Router } from "express";

const router = Router()
router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)

//экспорт по умолчанию
export default router