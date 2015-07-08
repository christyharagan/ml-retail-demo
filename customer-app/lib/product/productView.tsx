import * as b from 'react-bootstrap'
import * as React from 'react'
import {Product} from './productComponent'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function productView(context:Product) {
  return <b.Panel header={context.props.product.name} bsStyle='primary'>
    <b.Grid>
      <b.Row className='show-grid'>
        <b.Col xs={6} md={4}>
          <b.Grid>
            <b.Row className='show-grid'>
              <b.Col xs={12}>
                <img src={context.props.product.imageUrl}/>
              </b.Col>
            </b.Row>
            <b.Row className='show-grid'>
              <b.Col xs={12}>
                {context.props.product.basePrice}
              </b.Col>
            </b.Row>
          </b.Grid>
        </b.Col>
        <b.Col xs={12} md={8}>
          {context.props.product.description}
        </b.Col>
      </b.Row>
    </b.Grid>
  </b.Panel>
}
