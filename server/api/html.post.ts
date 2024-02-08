import markdownit from 'markdown-it'

export default defineEventHandler(async (event) => {
  const { html: htmlText } = await readBody(event)

  const mdParser = markdownit({
    html: true,
    linkify: true,
    xhtmlOut: true
  })

  const html =
    "<style>*{font-family:'Inter',sans-serif;}</style>" +
    mdParser.render(htmlText)

  return html
})
