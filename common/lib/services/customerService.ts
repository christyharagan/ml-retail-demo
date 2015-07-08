import {Customer} from '../models/customer'

export interface CustomerService {
  register(customer:Customer): Promise<boolean>
  login(username:string): Promise<boolean>
  logout(username:string): Promise<boolean>
  updateLocation(username:string, latLong: string):Promise<any>
}
