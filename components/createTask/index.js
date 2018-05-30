import Auth from 'concore-sdk-js/lib/browser/Datacore/Auth'
import Molecule from 'concore-sdk-js/lib/browser/Datacore/Molecule'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'

import { todoActions } from '@reducers/todo'

export class CreateTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newTaskDescription: '',
      newTaskDueDate: new Date()
    }
  }

  static defaultProps = {
    showCreateDialog: false
  }

  static propTypes = {
    showCreateDialog: PropTypes.bool,
    toggleCreateDialog: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired
  }

  render () {
    const { showCreateDialog, toggleCreateDialog, createTask } = this.props
    return (
      <Dialog
        open={showCreateDialog}
      >
        <DialogTitle>Create task</DialogTitle>
        <DialogContent>
          <TextField
            label='Task Description'
            multiline
            rowsMax={5}
            margin='normal'
            value={this.state.newTaskDescription}
            autoFocus
            onChange={({ target: { value } }) => this.setState({ newTaskDescription: value })}
          />
          <DateTimePicker
            value={this.state.newTaskDueDate}
            onChange={date => this.setState({ newTaskDueDate: date })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleCreateDialog(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            createTask(this.state.newTaskDescription, this.state.newTaskDueDate)
            this.setState({
              newTaskDescription: '',
              newTaskDueDate: new Date()
            })
          }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ todo }) => todo

const mapDispatchToProps = dispatch => ({
  toggleCreateDialog: show => dispatch(todoActions.toggleCreateDialog(show)),
  createTask: async (description, duedate) => {
    const user = await Auth.getUser()
    const task = new Molecule('Todo', {
      description,
      done: false,
      duedate
    })
    task.set('owner', user.id)
    await task.save()
    dispatch(todoActions.createTask({
      id: task.id,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      ...task.get()
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)
