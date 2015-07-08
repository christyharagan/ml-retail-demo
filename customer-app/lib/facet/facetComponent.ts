import * as React from 'react'
import {FacetValue} from 'marklogic'

import {facetView} from './facetView'

export interface FacetProps {
  onSelect(value:FacetValue<any>):void

  facetValues:FacetValue<any>[]
}

export interface FacetState {
}

export class Facet extends React.Component<FacetProps, FacetState> {
  render() {
    return facetView(this)
  }
}
