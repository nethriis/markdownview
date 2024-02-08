export default (filename: string) => {
  const parts = filename.split('.').reverse()

  if (parts.length > 1) {
    parts.shift()
    return parts.reverse().join('.')
  } else {
    return filename
  }
}
