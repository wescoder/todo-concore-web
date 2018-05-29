import Auth from 'concore-sdk-js/lib/browser/Datacore/Auth'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import s from './menuBar.scss'
import { authActions } from '@reducers/auth'

export const MenuBar = ({
  title = '',
  user,
  logout
}) => (
  <AppBar position='sticky' color='primary'>
    <Toolbar className={s.toolbar}>
      <Typography style={{ flex: 1 }} title={title} variant='title' color='inherit'>
        <span id='toolbarTitle' className={s.toolbarTitle}>{title}</span>
      </Typography>
      {user && <Button
        color='inherit'
        onClick={() => logout()}
      >Logout</Button>}
    </Toolbar>
  </AppBar>
)

MenuBar.defaultProps = {
  title: '',
  user: null
}

MenuBar.propTypes = {
  title: PropTypes.string,
  user: PropTypes.any,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth: { user } }) => ({ user })

const mapDispatchToProps = dispatch => ({
  logout: async () => {
    await Auth.logout()
    dispatch(authActions.logout())
    if (process.browser) {
      Router.push('/login')
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
