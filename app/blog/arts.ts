import fs from 'fs'
import path from 'path'
import { imageSize } from 'image-size'
import type { Art } from 'app/components/art-wall'

// Layout for the art wall. `span` places each piece on the grid (2 columns on
// phones, 12 on larger screens), `tilt` hangs it slightly crooked, and `tape`
// pins it up with a strip of washi tape.
const ARTS: Omit<Art, 'width' | 'height'>[] = [
  {
    file: 'mountain-prayer-flags.jpg',
    alt: 'Acrylic painting of colorful prayer flags in front of a snow-covered mountain',
    span: 'col-span-2 sm:col-span-7',
    tilt: '-rotate-1',
    tape: true,
  },
  {
    file: 'fallen-angel-pencil.jpg',
    alt: 'Pencil drawing of a kneeling winged figure with its head thrown back',
    span: 'col-span-1 sm:col-span-5 sm:mt-12',
    tilt: 'rotate-1',
  },
  {
    file: 'digital-cypress-trees.jpg',
    alt: 'Digital painting of two tall cypress trees under a swirling sky',
    span: 'col-span-1 sm:col-span-3',
    tilt: 'rotate-2',
  },
  {
    file: 'digital-green-stripe-portrait.jpg',
    alt: 'Digital portrait with bold color blocks and a green stripe down the face',
    span: 'col-span-1 sm:col-span-3 sm:mt-8',
    tilt: '-rotate-1',
    tape: true,
  },
  {
    file: 'night-market.jpg',
    alt: 'Acrylic painting of a crowded night market glowing with warm light',
    span: 'col-span-2 sm:col-span-6',
    tilt: 'rotate-1',
  },
  {
    file: 'digital-girl-red-ribbon.jpg',
    alt: 'Digital painting of a girl with long black hair and a red ribbon, seated in a garden',
    span: 'col-span-1 sm:col-span-4',
    tilt: '-rotate-1',
  },
  {
    file: 'ink-portrait.jpg',
    alt: 'Black ink wash painting of an expressive face, close up',
    span: 'col-span-1 sm:col-span-4 sm:mt-10',
    tilt: 'rotate-2',
    tape: true,
  },
  {
    file: 'digital-puppy-daisies.jpg',
    alt: 'Digital painting of a Cavalier King Charles spaniel puppy among daisies',
    span: 'col-span-2 sm:col-span-4',
    tilt: '-rotate-2',
  },
  {
    file: 'headdress-portrait.jpg',
    alt: 'Acrylic portrait of a woman in a black headdress with red accents',
    span: 'col-span-1 sm:col-span-5 sm:col-start-2',
    tilt: 'rotate-1',
    tape: true,
  },
  {
    file: 'digital-apple.jpg',
    alt: 'Digital painting of a woman biting a red apple, close up',
    span: 'col-span-1 sm:col-span-5 sm:mt-10',
    tilt: '-rotate-2',
  },
]

export function getArts(): Art[] {
  const dir = path.join(process.cwd(), 'public', 'arts')
  return ARTS.map((art) => {
    let width = 1000
    let height = 1400
    try {
      const size = imageSize(
        new Uint8Array(fs.readFileSync(path.join(dir, art.file)))
      )
      width = size.width
      height = size.height
      // Photos taken sideways are stored rotated and flagged with EXIF orientation.
      if (size.orientation && size.orientation >= 5) {
        ;[width, height] = [height, width]
      }
    } catch {}
    return { ...art, width, height }
  })
}
