import {CustomerService} from 'ml-retail-demo-common'

export class UpdateLocation {
  private customerService:CustomerService
  private username:string
  private refreshRate: number

  constructor(customerService:CustomerService, refreshRate: number) {
    this.customerService = customerService
    this.refreshRate = refreshRate
  }

  private updateLocation() {
    if (this.username) {
      let self = this
      navigator.geolocation.getCurrentPosition(doUpdatePosition)
      function doUpdatePosition(position) {
        self.customerService.updateLocation(self.username, `${position.coords.latitude} ${position.coords.longitude}`).then(function(){
          setTimeout(self.updateLocation.bind(self), self.refreshRate)
        })
      }
    }
  }

  login(username:string) {
    this.username = username
    this.updateLocation()
  }

  logout() {
    this.username = null
  }
}
