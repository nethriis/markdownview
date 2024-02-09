export default () => {
  const encodeMarkdown = (text: string) => {
    return encodeURIComponent(text)
  }

  const createShareUrl = (encodedText: string) => {
    const baseUrl = location.href.split('?')[0]

    return `${baseUrl}?md=${encodedText}`
  }

  const getMarkdownFromUrl = () => {
    const params = new URLSearchParams(location.search)
    const encodedText = params.get('md')

    if (encodedText) {
      return decodeURIComponent(encodedText)
    }
    return null
  }

  return {
    encodeMarkdown,
    createShareUrl,
    getMarkdownFromUrl
  }
}
