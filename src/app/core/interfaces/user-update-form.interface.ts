// utilisé par jsonplaceholder users-update
export interface UserUpdateForm {
  name: string,
  username: string,
  email: string,
  phone: string,
  address : {city : string},
  company : {name : string},
  website: string
}