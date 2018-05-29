import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import Layout from '@components/layout'
import TodoList from '@components/todoList'
import CreateTask from '@components/createTask'
import { todoActions } from '@reducers/todo'

const styles = theme => ({
  fab: {
    position: 'absolute !important',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

export const Home = ({ user, classes, toggleCreateDialog }) => {
  if (process.browser && !user) {
    Router.push('/login')
  }
  return (
    <Layout pageTitle='Tasks'>
      <Head>
        <title>Tasks</title>
      </Head>
      <TodoList />
      <CreateTask />
      <Button
        className={classes.fab}
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
  user: null,
  classes: {}
}

Home.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.any,
  toggleCreateDialog: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => auth

const mapDispatchToProps = dispatch => ({
  toggleCreateDialog: show => dispatch(todoActions.toggleCreateDialog(show))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
