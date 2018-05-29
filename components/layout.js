import Head from 'next/head'
import JssProvider from 'react-jss/lib/JssProvider'
import PropTypes from 'prop-types'
import { SheetsRegistry } from 'react-jss/lib/jss'
import { minify } from 'csso'

import { MuiThemeProvider, createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'

import MenuBar from '@components/menuBar'
import s from './layout.scss'
import resetCss from './reset.css'

const sheetsRegistry = new SheetsRegistry()
const generateClassName = createGenerateClassName()

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { light: '#4f5a42', main: '#283618', dark: '#212d14' },
    secondary: { light: '#9a2e57', main: '#840032', dark: '#6d0029' },
    error: { light: '#eb465a', main: '#e71d36', dark: '#be182d' },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
}, {
  userAgent: 'all'
})

const Layout = ({ pageTitle = '', children = null }) => (
  <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Head>
        <style id='jss-server-side'>{resetCss}{minify(sheetsRegistry.toString()).css}</style>
      </Head>
      <div id='__layoutRoot' className={s.layoutRoot}>
        <MenuBar title={pageTitle} />
        <div className={s.content}>
          {children}
        </div>
      </div>
    </MuiThemeProvider>
  </JssProvider>
)

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node
}

Layout.defaultProps = {
  pageTitle: '',
  children: null
}

export default Layout
