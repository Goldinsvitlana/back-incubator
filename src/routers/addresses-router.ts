import { Request, Response, Router } from "express"
import { addressesRepository } from "../repositories/addresses-repository"


export const addressesRouter = Router({})


addressesRouter.get('/', (req: Request, res: Response) => {
  const foundAddresses = addressesRepository.findAddresses(req.query.title?.toString());
  res.send(foundAddresses)
  //   res.send(addresses)
  // })
  // addressesRouter.get('/:id', (req: Request, res: Response) => {
  //   let address = addresses.find(p=> p.id === +req.params.id)
  // if (address) {
  // res.send(address)
  // } else {
  //   res.send(484)
  // }
  })