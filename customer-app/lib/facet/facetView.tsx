import {FacetValue} from 'marklogic'
import {Facet} from './facetComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function facetView(context:Facet) {
  return <div class="list-group">
    {context.props.facetValues.map(value=><div><a href="#" onClick={context.props.onSelect.bind(null, value)} class="list-group-item">{value.name}({value.count})</a><br/></div>)}
  </div>
}
