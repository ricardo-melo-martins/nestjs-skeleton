export const slugify = (str: string): string => {
  return (str || '')
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
export const hyphenate = (value: string): string => {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const translit = (str: string): string => {
  const ru =
    // eslint-disable-next-line max-len
    'А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Э-э-Ю-ю-Я-я'.split(
      '-'
    )
  const en =
    // eslint-disable-next-line max-len
    'A-a-B-b-V-v-G-g-D-d-E-e-Е-е-J-j-Z-z-I-i-I-i-K-k-L-l-M-m-N-n-O-o-P-p-R-r-C-c-T-t-Y-y-F-f-H-h-C-c-CH-ch-SH-sh-SH-sh-E-e-YU-yu-YA-ya'.split(
      '-'
    )

  let res = ''
  for (let i = 0, I = str.length; i < I; i++) {
    const s = str.charAt(i),
      n = ru.indexOf(s)
    if (n >= 0) {
      res += en[n]
    } else {
      res += s
    }
  }

  return res
}
export const generateSlug = (str: string): string => {
  let url: string = str.replace(/[\s]+/gi, '-')
  url = translit(url)

  url = url
    .replace(/[^0-9a-z_\-]+/gi, '-')
    .replace('---', '-')
    .replace('--', '-')
    .toLowerCase()
  return url
}
