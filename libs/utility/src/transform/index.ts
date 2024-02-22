import { hyphenate, slugify } from '../text'

export const toInt = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num

export const toBool = (val: string | undefined, bool: boolean): boolean => (val == null ? bool : val == 'true')

export const toSlug = (value: string) => {
  return slugify(value)
}

export const toHyphenate = (value: string) => {
  return hyphenate(value)
}
