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
        className={`absolute -top-3 left-1/2 z-10 w-14 -translate-x-1/2 bg-contain bg-center bg-no-repeat drop-shadow-sm sm:w-20 xl:w-28 ${photo.place.includes('-rotate-') ? 'rotate-12' : '-rotate-12'}`}
        style={{ backgroundImage: "url('/images/tape.png')", aspectRatio: '360 / 103' }}
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
      <div className="relative mb-14">
        <div aria-hidden="true" className="polka-banner" />
        <h1 className="hero-name">
          Cath
          <span className="relative inline-block">
            a
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero-arrow"
              style={{ top: '-0.14em' }}
            >
              <path d="M12 3v15M5.5 11.5L12 18l6.5-6.5" />
            </svg>
          </span>
          rine Li
        </h1>
      </div>
      <div className="relative flow-root text-center text-lg leading-relaxed sm:text-xl">
        <Photo photo={PHOTOS[0]} />
        <p className="mb-4">
          I was born in <strong>Hong Kong</strong> but raised in mainland
          China. I feel more connected to the mainland and to Mandarin than to{' '}
          <strong>Hong Kong</strong>'s unique culture. As a high schooler, I am
          quite interested in learning new languages and in some of the
          specialized subjects my school offers.
        </p>
        <Photo photo={PHOTOS[1]} />
        <p className="mb-4">
          Right now, I am taking French, Chemistry, and Biology at{' '}
          <strong>UWCT</strong>, which makes my high school life a bit darker
          than I expected, lol. But I have still met so many great people who
          supported me through hard days and took care of me when I was
          stressed out or depressed.
        </p>
      </div>
      <div
        className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8"
        style={{ marginTop: '11rem' }}
      >
        {/* The figure stays outside the book, on its left. */}
        <Image
          src="/images/achievements-cutout.webp"
          alt=""
          width={463}
          height={720}
          sizes="(min-width: 640px) 176px, 96px"
          className="h-auto w-24 shrink-0 sm:w-44"
        />
        {/* The book page is the container; text scales with the book (container query units). */}
        <div
          className="relative w-full min-w-0 sm:flex-1"
          style={{ containerType: 'inline-size', maxWidth: '26rem' }}
        >
          <Image
            src="/images/book.png"
            alt=""
            width={888}
            height={1083}
            unoptimized
            className="h-auto w-full select-none"
          />
          <ul
            aria-label="What I'm proud of"
            className="absolute list-disc"
            style={{
              inset: '17% 14% 14% 15%',
              fontSize: '4.2cqw',
              lineHeight: 1.3,
              color: '#2b1d12',
              paddingLeft: '1.2em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.55em',
            }}
          >
            <li>
              Finished 2 <strong>half-marathons</strong> in Phuket, Thailand
            </li>
            <li>
              Placed third in the National Teenager Dragon Boat Competition
              held in Nanjing
            </li>
            <li>
              Expert in <strong>kayaking</strong> and sailing
            </li>
            <li>Exhibited two art pieces in the whole-school exhibition</li>
            <li>Team leader of the Rescuing Gibbons Foundation</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
