import markdownit from 'markdown-it'

export const getHeadings = (markdownText: string) => {
  const md = markdownit()
  const htmlText = md.render(markdownText)
  const regex = /<h([1-6])>(.*?)<\/h[1-6]>/g

  return [...htmlText.matchAll(regex)].map((match) => {
    return { level: parseInt(match[1]), text: match[2] }
  })
}
