export interface Customer {
  username: string
  twitterId: string
  name: Name
  currentLocation?: string
  loggedIn: boolean
}

export interface Name {
  firstName: string
  lastName: string
}
