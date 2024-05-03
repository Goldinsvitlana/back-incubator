import { Request, Response, Router} from "express"
import { productsRepository } from "../repositories/products-repository"
import {validationResult, check} from 'express-validator'
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware"

export const productsRouter = Router({})

const titleValidation = check('title').trim().isLength({min:3, max: 10}).withMessage('Title length should be from 3 to 10 symbols')

productsRouter.get('/', (req: Request, res: Response) => {
  const foundProducts = productsRepository.findProducts(req.query.title?.toString());
    res.send(foundProducts)
  })
  
  productsRouter.post('/', 
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
  const newProduct = productsRepository.createProducts(req.body.title)
      res.status(201).send(newProduct)  
  })
  
  productsRouter.get('/:id', (req: Request, res: Response ) => {
  let product = productsRepository.findProductsById(+req.params.id)
  if (product) {
  res.send(product)
  } else {
    res.send(404)
  }
  })
  
  productsRouter.put('/:id', 
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response ) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
      const product = productsRepository.findProductsById(+req.params.id)
    res.send(product)
    } else {
      res.send(404)
    }
    })
  
    productsRouter.delete('/:id', (req: Request, res: Response ) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id)
  if(isDeleted) {
      res.send(204)
    } else{
    res.send(404)
    }
  })
  
function body(arg0: string) {
  throw new Error("Function not implemented.");
}

