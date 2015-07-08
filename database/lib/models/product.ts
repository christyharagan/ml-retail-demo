import {rangeIndexed, Facet, RangeIndexSpec} from 'ml-admin'
import {Product} from 'ml-retail-demo-common'

export class CategoriesFacet extends Facet {
  name:string = 'categories'
  path:string
}

// TODO: Change to SAPProduct
export class MLProduct implements Product {
  name: string
  id: string
  basePrice: number
  imageUrl: string
  description: any

  @rangeIndexed({
    facet:CategoriesFacet
  })
  categories:string[]
}
