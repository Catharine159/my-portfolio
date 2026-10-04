import fs from 'fs'
import path from 'path'
import { imageSize } from 'image-size'
import Gallery, { type Photo } from './gallery'

export const metadata = {
  title: 'Gallery',
  description: 'A collection of my photos and artwork.',
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i
// Camera-default names (IMG_1234, DSC0042, ...) make poor captions, so skip them.
const CAMERA_NAME = /^(img|dsc|dscn|pxl|image|photo|screenshot)[\s_-]*\d+/i

function toCaption(file: string) {
  let name = file
    .replace(IMAGE_EXT, '')
    .replace(/^\d+[-_.\s]+/, '') // "01-dragon-boat" -> "dragon-boat"
    .replace(/[-_]+/g, ' ')
    .trim()
  if (!name || CAMERA_NAME.test(name.replace(/\s/g, '_'))) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// Drop image files into /public/gallery and they appear here automatically.
function getPhotos(): Photo[] {
  const dir = path.join(process.cwd(), 'public', 'gallery')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      let width = 1200
      let height = 900
      try {
        const size = imageSize(
          new Uint8Array(fs.readFileSync(path.join(dir, file)))
        )
        width = size.width
        height = size.height
        // Phone photos are often stored rotated and flagged with EXIF orientation.
        if (size.orientation && size.orientation >= 5) {
          ;[width, height] = [height, width]
        }
      } catch {}
      return {
        src: `/gallery/${encodeURIComponent(file)}`,
        caption: toCaption(file),
        width,
        height,
      }
    })
}

export default function Page() {
  return <Gallery photos={getPhotos()} />
}
