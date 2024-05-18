import { Request, Response, Router} from "express"
import { productsRepository } from "../repositories/products-db-repository"
import {validationResult, check} from 'express-validator'
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware"
import { ProductType } from "../repositories/db"
export const productsRouter = Router({})

const titleValidation = check('title').trim().isLength({min:3, max: 10}).withMessage('Title length should be from 3 to 10 symbols')

productsRouter.get('/', async (req: Request, res: Response) => {
  const foundProducts: ProductType[] = await productsRepository.findProducts(req.query.title?.toString());

    res.send(foundProducts)
      
  })
  
  productsRouter.post('/', 
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  const newProduct: ProductType = await productsRepository.createProducts(req.body.title)
      res.status(201).send(newProduct)  
  })
  
  productsRouter.get('/:id', async (req: Request, res: Response ) => {
  let product = await productsRepository.findProductsById(+req.params.id)
  if (product) {
  res.send(product)
  } else {
    res.send(404)
  }
  })
  
  productsRouter.put('/:id', 
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response ) => {
    const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
      const product = await productsRepository.findProductsById(+req.params.id)
    res.send(product)
    } else {
      res.send(404)
    }
    })
  
    productsRouter.delete('/:id', async (req: Request, res: Response ) => {
  const isDeleted = await productsRepository.deleteProduct(+req.params.id)
  if(isDeleted) {
      res.send(204)
    } else{
    res.send(404)
    }
  })
  
function body(arg0: string) {
  throw new Error("Function not implemented.");
}

