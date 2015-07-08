import * as b from 'react-bootstrap'
import {Customers} from './customersComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

function matchTextToHtml(match: m.Match) {
  return match['match-text'].map(function(text){
    let highlighted = text as m.HighlightedText

    if (highlighted.highlight) {
      return <b>{highlighted.highlight}</b>
    } else {
      return highlighted
    }
  })
}

export function customersView(context:Customers) {
  return <div>
    {context.props.results.map(result=>
      <b.Panel>
        <h3 href="#" onClick={context.props.onSelect.bind(null, result.product)}>{result.product.name}</h3>
        {matchTextToHtml(result.match)}
      </b.Panel>
    )}
  </div>
}
