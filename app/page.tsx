import Image from 'next/image'

const PHOTOS = [
  {
    src: '/images/about-2.jpg',
    alt: 'Me as a little girl in a pink sweater, fluffy white vest, and bow headband',
    width: 640,
    height: 852,
    // Phones/tablets: floats beside the text. Desktop: hangs in the left margin.
    place:
      'float-left mr-4 mb-2 -rotate-2 w-24 sm:w-32 lg:absolute lg:right-full lg:top-2 lg:mb-0 lg:mr-10 lg:w-40 xl:w-56',
  },
  {
    src: '/images/about-1.jpg',
    alt: 'Me smiling while giving a piggyback ride to a happy child',
    width: 1333,
    height: 2000,
    // Phones/tablets: floats beside the text. Desktop: hangs in the right margin.
    place:
      'float-right ml-4 mb-2 rotate-2 w-24 sm:w-32 lg:absolute lg:left-full lg:top-24 lg:mb-0 lg:ml-10 lg:w-40 xl:w-56',
  },
]

// A taped-up print. Hover straightens it and lifts it forward.
function Photo({ photo }: { photo: (typeof PHOTOS)[number] }) {
  return (
    <div
      className={`relative bg-white p-1.5 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition duration-500 ease-out hover:z-10 hover:rotate-0 hover:scale-[1.03] dark:bg-neutral-200 ${photo.place}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-3 bg-amber-200/80 shadow-sm"
      />
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 1280px) 224px, (min-width: 640px) 128px, 96px"
        className="h-auto w-full"
      />
    </div>
  )
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Catharine Li
      </h1>
      <div className="relative flow-root">
        <Photo photo={PHOTOS[0]} />
        <p className="mb-4">
          {`I was born in Hong Kong but raised in mainland China. I feel more
          connected to the mainland and to Mandarin than to Hong Kong's unique
          culture. As a high schooler, I am quite interested in learning new
          languages and in some of the specialized subjects my school offers.`}
        </p>
        <Photo photo={PHOTOS[1]} />
        <p className="mb-4">
          {`Right now, I am taking French, Chemistry, and Biology at UWCT, which
          makes my high school life a bit darker than I expected, lol. But I
          have still met so many great people who supported me through hard
          days and took care of me when I was stressed out or depressed.`}
        </p>
      </div>
      <h2 className="font-semibold text-xl mb-4 mt-8 tracking-tighter">
        What I'm Proud Of 🏆
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Finished 2 half-marathons in Phuket, Thailand</li>
        <li>
          Placed third in the National Teenager Dragon Boat Competition held
          in Nanjing
        </li>
        <li>Expert in kayaking and sailing</li>
        <li>Exhibited two art pieces in the whole-school exhibition</li>
        <li>Team leader of the Rescuing Gibbons Foundation</li>
      </ul>
    </section>
  )
}
