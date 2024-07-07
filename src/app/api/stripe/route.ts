import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20"
})

type RequestData = {
    checkinDate: string;
    checkoutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    hotelRoomSlug: string;
}

export async function POST(req: Request, res: Response) {
    const {
        checkinDate,
        checkoutDate,
        adults,
        children,
        numberOfDays,
        hotelRoomSlug,
    }: RequestData = await req.json();

    if (!checkinDate || !checkoutDate || !adults || !children || !numberOfDays || !hotelRoomSlug) {
        return new NextResponse("Please all fields are required", { status: 400 })
    }

    const origin = req.headers.get('origin');
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Authetication required", { status: 400 })
    }

    const userId = session.user.id;
    const formattedCheckoutDate = checkoutDate.split("T")[0]
    const formattedCheckinDate = checkinDate.split("T")[0]

    try {
        const room = await getRoom(hotelRoomSlug);
        const discountPrice = room.price - (room.price / 100) * room.discount
        const totalPrice = discountPrice * numberOfDays

        //Create a stripe payment
        const stripeSession = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items:[{
                quantity: 1,
                price_data:{
                    currency: "usd",
                    product_data:{
                        name: room.name,
                        images: room.images.map(image=>image.url)
                    },
                    unit_amount: parseInt((totalPrice * 100).toString())
                }
            }],
            payment_method_types: ["card"],
            success_url: `${origin}/users/${userId}`
        })

        return NextResponse.json(stripeSession,{
            status: 200,
            statusText: "Payment session created"
        })
    } catch (error) {
        console.log("payment failed", error);
        return new NextResponse("", {
            status: 400,
          });
    }
}