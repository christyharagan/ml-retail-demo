import * as b from 'react-bootstrap'
import {ProductPage, PrimaryState} from './productPageComponent'
import * as search from '../search/searchComponent'
import * as product from '../product/productComponent'
import * as searchResults from '../searchResults/searchResultsComponent'
import * as facet from '../facet/facetComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function productPageView(context: ProductPage) {
  return <div className="container">
      <b.Navbar brand='MegaStore Customer App' inverse toggleNavKey={0}>
        <b.Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <b.NavItem eventKey={1} href='#' onClick={context.props.onLogout.bind(context)}>Logout</b.NavItem>
        </b.Nav>
      </b.Navbar>

      <b.Row>
          <b.Col xs={12}>
            <search.Search onSearch={context.onSearch.bind(context)}></search.Search>
          </b.Col>
        </b.Row>
        <b.Row>
          <b.Col md={4} className="container">
            <b.Panel header="Product Categories">
              <facet.Facet facetValues={context.props.categories} onSelect={context.onCategorySelect.bind(context)}></facet.Facet>
            </b.Panel>
          </b.Col>
          <b.Col md={8}>
          {
            context.state.primaryState === PrimaryState.PRODUCT ?
              <product.Product product={context.state.product}/> :
              <searchResults.SearchResults results={context.state.searchResults || []} onSelect={context.onProductSelect.bind(context)}/>
          }
          </b.Col>
      </b.Row>

    <footer>
      <p>Copyright (c) Christy Haragan 2015</p>
    </footer>
  </div>

}
