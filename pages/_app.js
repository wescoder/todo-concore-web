import Concore from 'concore-sdk-js/lib/browser/Concore'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import makeStore from '@reducers/store'

const { APP_ID, APP_KEY } = process.env

class MyApp extends App {
  constructor (props) {
    super(props)
    if (process.browser) {
      Concore.init('https://api.concore.io/api', APP_ID, APP_KEY)
    }
  }

  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(MyApp)
