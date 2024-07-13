import sanityClient from "@/libs/sanity"
import * as queries from "../libs/sanityQueries"

export type Booking = {
    _id: string
    hotelRoom: {
        _id: string,
        name:string,
        slug: {current:string},
        price:number,
    },
    checkinDate:string,
    checkoutDate:string,
    numberOfDays:number,
    adults:number,
    children:number,
    totalPrice:number,
    discount:number
}

export async function getUserData(userId:string){
    const result = await sanityClient.fetch(queries.getFeaturedRoomQuery)
}