import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

import Layout from '@components/layout'
import TodoList from '@components/todoList'
import CreateTask from '@components/createTask'
import { todoActions } from '@reducers/todo'

import styles from './index.scss'

export const Home = ({ user, toggleCreateDialog }) => {
  if (process.browser && !user) {
    Router.push('/login')
    return null
  }
  return (
    <Layout pageTitle={`Tasks${user ? ` - ${user.name}` : ''}`}>
      <Head>
        <title>Tasks</title>
      </Head>
      <TodoList />
      <CreateTask />
      <Button
        className={styles.fab}
        variant='fab'
        color='secondary'
        aria-label='add'
        onClick={() => toggleCreateDialog(true)}
      >
        <AddIcon />
      </Button>
    </Layout>
  )
}

Home.defaultProps = {
  user: null
}

Home.propTypes = {
  user: PropTypes.object,
  toggleCreateDialog: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => auth

const mapDispatchToProps = dispatch => ({
  toggleCreateDialog: show => dispatch(todoActions.toggleCreateDialog(show))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
