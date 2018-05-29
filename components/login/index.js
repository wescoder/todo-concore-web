import { Component } from 'react'
import Auth from 'concore-sdk-js/lib/browser/Datacore/Auth'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { connect } from 'react-redux'
import { authActions } from '@reducers/auth'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import styles from './login.scss'

export class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  static defaultProps = {
    loggingIn: false
  }

  static propTypes = {
    loggingIn: PropTypes.bool,
    login: PropTypes.func.isRequired,
    restoreSession: PropTypes.func.isRequired
  }

  async componentDidMount () {
    const { restoreSession } = this.props
    const isLogged = await Auth.isLogged()
    if (isLogged) {
      const user = await Auth.getUser()
      restoreSession(user)
    }
  }

  render () {
    const { login, loggingIn } = this.props
    const { email, password } = this.state
    return (
      <ValidatorForm onSubmit={() => login(email, password)}>
        <Paper className={styles.container} elevation={4}>
          <TextValidator
            id='login_email'
            name='login_email'
            label='E-mail'
            type='email'
            className={styles.textField}
            margin='normal'
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'Must be a valid e-mail']}
            onChange={({ target }) => this.setState({ email: target.value })}
          />
          <TextValidator
            id='login_password'
            name='login_password'
            label='Password'
            type='password'
            className={styles.textField}
            margin='normal'
            value={password}
            validators={['required', 'minStringLength:6', 'maxStringLength:30']}
            errorMessages={['This field is required', 'Minimum of 6 characters', 'Maximum of 30 characters']}
            onChange={({ target }) => this.setState({ password: target.value })}
          />
          <Button
            variant='raised'
            color='secondary'
            type='submit'
            disabled={loggingIn}
            className={styles.submit}
          >Login</Button>
        </Paper>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = ({ auth }) => auth

const mapDispatchToProps = dispatch => ({
  login: async (email, password) => {
    dispatch(authActions.login())
    const user = await Auth.login(email, password)
      .catch(err => dispatch(authActions.loginFailed(err)))
    const { ACL, id, createdAt, updatedAt, sessionToken } = user
    dispatch(authActions.loginSuccess({
      ACL,
      id,
      createdAt,
      updatedAt,
      sessionToken,
      ...user.get()
    }))
    if (process.browser && user) {
      Router.push('/')
    }
  },
  restoreSession: user => {
    const { ACL, id, createdAt, updatedAt, sessionToken } = user
    dispatch(authActions.loginSuccess({
      ACL,
      id,
      createdAt,
      updatedAt,
      sessionToken,
      ...user.get()
    }))
    if (process.browser && user) {
      Router.push('/')
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
