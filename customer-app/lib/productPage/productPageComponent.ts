import * as React from 'react'
import {ProductService} from 'ml-retail-demo-common'
import {productPageView} from './productPageView'
import {Product, SearchResult} from 'ml-retail-demo-common'
import {FacetValue} from 'marklogic'

export enum PrimaryState {
  SEARCH_EMPTY,
  SEARCH_RESULT,
  PRODUCT
}

export interface ProductPageState {
  primaryState?: PrimaryState

  product?: Product

  searchResults?: SearchResult[]

  selectedCategory?: FacetValue<any>
}

export interface ProductPageProps {
  productService: ProductService

  categories?: FacetValue<any>[]

  onError(e):void

  onLogout():void
}


export class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
  constructor(props) {
    super(props)
    this.state = {
      primaryState: PrimaryState.SEARCH_EMPTY
    } as ProductPageState
  }

  onSearch(query:string):void {
    let self = this
    this.props.productService.searchProducts(query, this.state.selectedCategory ? [this.state.selectedCategory] : null).then(function(results){
      self.setState({
        selectedCategory: null,
        primaryState: PrimaryState.SEARCH_RESULT,
        searchResults: results
      })
    })
  }

  onCategorySelect(category:FacetValue<any>):void {
    this.setState({
      selectedCategory: category
    }, function() {
      let self = this
      this.props.productService.searchProducts('', this.state.selectedCategory ? [this.state.selectedCategory] : null).then(function(results){
        self.setState({
          primaryState: PrimaryState.SEARCH_RESULT,
          searchResults: results
        })
      })
    })
  }

  onProductSelect(product:Product): void {
    this.setState({
      product: product,
      primaryState: PrimaryState.PRODUCT
    })
  }

  render() {
    return productPageView(this)
  }
}
