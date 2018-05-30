import MoleculeQuery from 'concore-sdk-js/lib/browser/Datacore/MoleculeQuery'
import Auth from 'concore-sdk-js/lib/browser/Datacore/Auth'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { connect } from 'react-redux'
import { compareAsc, compareDesc } from 'date-fns'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'

import TaskItem from '@components/taskItem'
import TodoListOrder from '@components/todoListOrder'
import { todoActions } from '@reducers/todo'

import styles from './todoList.scss'

export class TodoList extends Component {
  componentDidMount () {
    const { isFetching, todos, fetchTodos } = this.props
    if (!isFetching && !todos) {
      fetchTodos()
    }
  }

  static defaultProps = {
    todos: null,
    isFetching: false,
    fetchError: null
  }

  static propTypes = {
    todos: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string
    })),
    orderOptions: PropTypes.any.isRequired,
    sortBy: PropTypes.string.isRequired,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.any,
    fetchTodos: PropTypes.func.isRequired
  }

  sorter = (sortBy, reverse) => {
    switch (sortBy) {
      case 'duedate':
      case 'donedate': {
        return reverse
          ? (a, b) => compareAsc(new Date(a || 0), new Date(b || 0))
          : (a, b) => compareDesc(new Date(a || 0), new Date(b || 0))
      }
      default: {
        return reverse
          ? (a, b) => a < b ? -1 : (a > b ? 1 : 0)
          : (a, b) => a < b ? 1 : (a > b ? -1 : 0)
      }
    }
  }

  render () {
    const { isFetching, fetchError, todos, orderOptions, sortBy } = this.props
    return (
      <Card className={styles.root}>
        <TodoListOrder />
        <CardContent>
          {isFetching && <CircularProgress />}
          {todos && Boolean(Object.values(todos).length)
            && <List className={styles.list}>
              {Object.values(todos)
                .sort((a, b) => this.sorter(sortBy, orderOptions[sortBy].reverse)(a[sortBy], b[sortBy]))
                .map(task => <TaskItem key={task.id} task={task} />)
              }
            </List>
          }
          {!isFetching && todos && !Object.values(todos).length && 'There\'s no todos. Go create one.'}
          {fetchError && <pre>{JSON.stringify(fetchError)}</pre>}
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = ({ todo }) => todo

const mapDispatchToProps = dispatch => ({
  fetchTodos: async () => {
    const { id: ownerId } = await Auth.getUser()
    dispatch(todoActions.fetch())
    const todosQuery = new MoleculeQuery('Todo')
    const { results: todos } = await todosQuery
      .equalTo('owner.id', ownerId)
      .find()
      .catch(err => dispatch(todoActions.fetchFailed(err)))
    const todosHash = {}
    todos.forEach(t => {
      todosHash[t.id] = {
        id: t.id,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        ...t.get()
      }
    })
    dispatch(todoActions.receiveTodos(todosHash))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
