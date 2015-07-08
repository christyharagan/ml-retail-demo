import {Customer} from '../models/customer'
import {Observable} from 'rx'

export interface StoreService {
  getHighValueCustomers(lat: number, long: number): Observable<Customer[]>
}
