export default () => {
  const encodeMarkdown = (text: string) => {
    return encodeURIComponent(text)
  }

  const createShareUrl = (encodedText: string) => {
    const baseUrl = location.href.split('?')[0]

    return `${baseUrl}?md=${encodedText}`
  }

  const decodeMarkdown = (encodedText: string) => {
    return decodeURIComponent(encodedText)
  }

  const getMarkdownFromUrl = () => {
    const params = new URLSearchParams(location.search)
    const encodedText = params.get('md')

    if (encodedText) {
      return decodeMarkdown(encodedText)
    }
    return null
  }

  return {
    encodeMarkdown,
    createShareUrl,
    decodeMarkdown,
    getMarkdownFromUrl
  }
}
