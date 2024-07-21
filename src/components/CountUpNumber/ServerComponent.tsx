import Image from "next/image"

export const heading1 = (
    <>
     <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
      <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
        Experience an Exquisite Hotel Immersed in Rich History and Timeless
        elegance.
      </p>
      <button className="btn-primary">Get Started</button>
    </>
)

export const section2 = (
    <div className="md:grid hidden gap-6 grid-cols-1">
    <div className="rounded-2xl overflow-hidden h-48">
      <Image
        src="/images/hero-1.jpeg"
        alt=""
        width={300}
        height={300}
        className="img scale-animation"
      />
    </div>

    <div className="grid grid-cols-2 gap-8 h-48">
      <div className="rounded-2xl overflow-hidden">
        <Image
        src="/images/hero-2.jpeg"
          alt=""
          width={300}
          height={300}
          className="img scale-animation"
        />
        <Image
        src="/images/hero-3.jpeg"
          alt=""
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
    </div>
  </div>
)