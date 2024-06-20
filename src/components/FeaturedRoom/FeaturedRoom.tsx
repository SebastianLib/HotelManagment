import { Room } from '@/app/models/room'
import React, { FC } from 'react'

type Props = {
    featuredRoom: Room
}

const FeaturedRoom:FC<Props> = () => {
  return (
    <section>FeaturedRoom</section>
  )
}

export default FeaturedRoom