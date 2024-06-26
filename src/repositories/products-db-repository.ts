import { title } from "process"
import { productsCollection, ProductType } from "./db"



const products: ProductType[] = [{ id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]



export const productsRepository = {
   async findProducts(title: string | null | undefined): Promise<ProductType[]> {
      const filter: any = {}
    if (title) {
        filter.title = {$regex: title}
        } 
          return productsCollection.find({filter}).toArray()
          
},

async findProductsById(id:number): Promise<ProductType | null> {
    let product: ProductType | null = await productsCollection.findOne({id: id})
    if (product) {
    return product
    } else {
        return null
    }
},

async createProducts(title:string): Promise <ProductType> {
    const newProduct = {
        id: +(new Date()),
        title: title
      }
     const result = await productsCollection.insertOne(newProduct)
          return newProduct
       
},
async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productsCollection.updateOne({id: id},{ $set: {title: title } })
        return result.matchedCount === 1
    },

async deleteProduct(id: number): Promise<boolean> {
    const result = await productsCollection.deleteOne({id: id})
    return result.deletedCount === 1
}
}
