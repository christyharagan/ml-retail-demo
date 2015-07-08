import * as React from 'react'
import * as b from 'react-bootstrap'

import {locationView} from './locationView'

export interface LocationProps {
}

export interface LocationState {
}

export class Location extends React.Component<LocationProps, LocationState> {
  render() {
    return locationView(this)
  }
}
