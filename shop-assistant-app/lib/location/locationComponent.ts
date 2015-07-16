import * as React from 'react/addons'
import * as b from 'react-bootstrap'

import {locationView} from './locationView'

export interface LocationProps {
  onSelect(lat:number, long:number):void
}

export interface LocationState {
}

export class Location extends React.Component<LocationProps, LocationState> {
  render() {
    return locationView(this)
  }
  onClick(event:GoogleMapsEvent) {
    this.props.onSelect(event.latLng.A, event.latLng.F)
  }
}
