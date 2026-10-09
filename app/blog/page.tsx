import Image from 'next/image'
import Link from 'next/link'
import { BlogPosts } from 'app/components/posts'
import ArtWall from 'app/components/art-wall'
import { getArts } from './arts'

export const metadata = {
  title: 'Projects',
  description: 'A few of my projects.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <h2 className="font-semibold text-xl mb-2 tracking-tighter">
        <Link href="/blog/gibbon-rehabilitation-project">
          Gibbon Rehabilitation Project
        </Link>
      </h2>
      <div className="mt-3 mb-10 space-y-4">
        <p>
          Before the Gibbon Rehabilitation Project, I spent my weekends
          volunteering with my seniors at another service called Bodhi Dog, a
          non-profit organization in Phuket that takes in dogs who have been
          abused or abandoned. It was an eye-opening experience. I couldn't
          believe how many dogs there were, and how few staff members were
          looking after them.
        </p>
        <p>
          Phuket is extremely hot and humid, so I was amazed that the
          volunteers could keep doing this for years. It is much harder than
          looking after two or three pets, and that's before you count cleaning
          cages, brushing, and washing 60 dogs, all under the blazing sun. I can
          still picture the organizer grabbing five dogs at a time for a walk,
          some of them nearly as tall as a person!
        </p>
        <p>
          When Bodhi Dog moved to a new location, I noticed there was another,
          lesser-known service I could choose instead. At first, I honestly
          didn't think it sounded interesting. It seemed like it would involve
          a lot of physical labor, and I might not even get to interact with the
          animals the way I did with the dogs. But as time went on, I came to
          sincerely hope that more people could take part in something like
          this. Not everyone gets the chance to do this kind of work in high
          school, and there are only two gibbon rehabilitation sites in all of
          Asia.
        </p>
        <p>
          Last year, the seniors on our team were incredibly kind. Even up on
          the mountain, with mosquitoes everywhere and the heat bearing down, we
          cleaned cages together, mixed cement to rebuild the floors, and kept
          going. Mixing cement was honestly the most exhausting thing I have
          ever done, but everyone shared the load, splitting up the sand and
          cement powder and carrying it up the mountain together. Doing it
          with that team made every bit of it worth it.
        </p>
        <Image
          src="/images/gibbon-rehabilitation-team.webp"
          alt="Our volunteer team at the Gibbon Rehabilitation Project"
          width={1500}
          height={962}
          sizes="(min-width: 640px) 576px, 100vw"
          className="h-auto w-full rounded-2xl"
        />
      </div>
      <h2 className="font-semibold text-xl mb-2 tracking-tighter">Running</h2>
      <div className="mt-3 mb-10 space-y-4">
        <p>
          This year, my mom and I finished the Laguna Phuket Half Marathon
          together. It was really tiring, but it felt great. This was my first
          time ever taking part in a running event, so the whole experience felt
          completely new and exciting.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((n) => (
            <Image
              key={n}
              src={`/images/laguna-half-marathon-${n}.jpg`}
              alt="Me and my mom with our finisher medals at the Laguna Phuket Half Marathon"
              width={1500}
              height={2000}
              sizes="(min-width: 640px) 280px, 50vw"
              className="h-auto w-full rounded-2xl"
            />
          ))}
        </div>
      </div>
      <h2 className="font-semibold text-xl tracking-tighter">Arts</h2>
      <ArtWall arts={getArts()} />
      <BlogPosts exclude={['gibbon-rehabilitation-project']} />
    </section>
  )
}
