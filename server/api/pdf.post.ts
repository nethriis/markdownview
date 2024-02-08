import markdownit from 'markdown-it'
import chromium from 'chrome-aws-lambda'

export default defineEventHandler(async (event) => {
  const { md } = await readBody(event)

  const mdParser = markdownit({
    html: true,
    linkify: true,
    xhtmlOut: true
  })

  const html =
    "<style>*{font-family:'Inter',sans-serif;}</style>" + mdParser.render(md)

  const path = await chromium.executablePath
  console.log(path)

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true
  })
  const page = await browser.newPage()

  await page.setContent(html, {
    waitUntil: ['load', 'networkidle0', 'domcontentloaded']
  })

  const pdf = await page.pdf({
    margin: {
      bottom: '40px',
      left: '40px',
      right: '40px',
      top: '40px'
    }
  })

  await browser.close()

  return pdf
})
