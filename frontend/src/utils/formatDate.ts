export const formatDate = (format: string | number | Date) => {
  const date = new Date(format)

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

  return 'le ' + date.toLocaleString('fr-FR', options)
}
