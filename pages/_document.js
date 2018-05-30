import Document, { Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  render () {
    return (
      <html lang='en'>
        <Head>
          <title>ToDo app | Skill test for concore.io</title>
          <meta name='description' content='A skill test for concore.io' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name='theme-color' content='#283618' />
          <link rel='stylesheet' href='/_next/static/style.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default AppDocument
