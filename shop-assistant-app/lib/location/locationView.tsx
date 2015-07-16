import * as b from 'react-bootstrap'
import * as g from 'react-google-maps'
import {Location} from './locationComponent'
import * as React from 'react/addons'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React
//var google
export function locationView(context:Location) {
  return <div style="height:100%">
    <b.Navbar brand='MegaStore Shop Assistant App' inverse toggleNavKey={0}>
      <b.Nav right eventKey={0}> {/* This is the eventKey referenced */}
      </b.Nav>
    </b.Navbar>
    <g.GoogleMaps containerProps={{
      style: {
        height: "100%"
      }
      }}
      googleMapsApi={google.maps}
      zoom={8}
      center={{lat: 51.4, lng: -0.19}}
      onClick={context.onClick.bind(context)}/>
  </div>
}
