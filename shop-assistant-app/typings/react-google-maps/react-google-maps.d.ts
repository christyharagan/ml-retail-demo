declare module 'react-google-maps' {
  import {Component} from 'react'

  export class GoogleMaps extends Component<any, any> {
  }

}

declare module google {
  const maps
}

declare module 'react/addons' {
  export = React
}

declare interface GoogleMapsEventLatLng {
  A: number
  F: number
}

declare interface GoogleMapsEvent {
  latLng: GoogleMapsEventLatLng
}
