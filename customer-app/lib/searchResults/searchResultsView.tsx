import * as b from 'react-bootstrap'
import * as m from 'marklogic'
import {SearchResults} from './searchResultsComponent'
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

export function searchResultsView(context:SearchResults) {
  return <div>
    {context.props.results.map(result=>
      <b.Panel>
        <a  href="#"><h3 onClick={context.props.onSelect.bind(null, result.product)}>{result.product.name}</h3></a>
        {matchTextToHtml(result.match)}
      </b.Panel>
    )}
  </div>
}
