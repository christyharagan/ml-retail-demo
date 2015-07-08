import * as React from 'react'
import {Product as ProductModel} from 'ml-retail-demo-common'

import {productView} from './productView'

export interface ProductProps {
  product: ProductModel
}

export interface ProductState {
}

export class Product extends React.Component<ProductProps, ProductState> {
  render() {
    return productView(this)
  }
}
