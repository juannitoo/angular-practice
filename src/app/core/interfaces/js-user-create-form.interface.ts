export interface UserCreateValues {
address : { 
    city : string,
    geo: {lat:string, lng:string}
    street:string,
    suite:string,
    zipcode:string
},
company : {
    name : string,
    catchPhrase: string,
    bs: string
},
email: string, 
phone: string
name: string,
username: string,
website: string,
}