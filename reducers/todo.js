const pre = '@todo-concore/todo'

import { LOGOUT } from './auth'

export const FETCH_TODOS = `${pre}/FETCH_TODOS`
export const RECEIVE_TODOS = `${pre}/RECEIVE_TODOS`
export const FETCH_FAILED = `${pre}/FETCH_FAILED`
export const TOGGLE_CREATE_DIALOG = `${pre}/TOGGLE_CREATE_DIALOG`
export const CREATE_TASK = `${pre}/CREATE_TASK`
export const EDIT_TASK = `${pre}/EDIT_TASK`
export const EDIT_ERROR = `${pre}/EDIT_ERROR`
export const TOGGLE_ORDER = `${pre}/TOGGLE_ORDER`

export const todoActions = {
  fetch: () => ({
    type: FETCH_TODOS
  }),
  receiveTodos: todos => ({
    type: RECEIVE_TODOS,
    todos
  }),
  fetchFailed: error => ({
    type: FETCH_FAILED,
    error
  }),
  toggleCreateDialog: show => ({
    type: TOGGLE_CREATE_DIALOG,
    show
  }),
  createTask: task => ({
    type: CREATE_TASK,
    task
  }),
  edit: task => ({
    type: EDIT_TASK,
    task
  }),
  editError: (taskId, error) => ({
    type: EDIT_ERROR,
    taskId,
    error
  }),
  toggleOrder: sortBy => ({
    type: TOGGLE_ORDER,
    sortBy
  })
}

export const defaultState = {
  todos: null,
  isFetching: false,
  fetchError: null,
  toggleError: null,
  showCreateDialog: false,
  orderOptions: {
    duedate: {
      label: 'Due date',
      selected: true,
      reverse: true
    },
    donedate: {
      label: 'Done date',
      selected: false,
      reverse: false
    },
    description: {
      label: 'Description',
      selected: false,
      reverse: false
    }
  },
  sortBy: 'duedate'
}

export const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TODOS: {
      return {
        ...state,
        fetchError: null,
        isFetching: true
      }
    }
    case RECEIVE_TODOS: {
      const { todos } = action
      return {
        ...state,
        isFetching: false,
        fetchError: null,
        todos
      }
    }
    case FETCH_FAILED: {
      const { error } = action
      return {
        ...state,
        isFetching: false,
        fetchError: error
      }
    }
    case TOGGLE_CREATE_DIALOG: {
      const { show } = action
      return {
        ...state,
        showCreateDialog: typeof show !== 'undefined' || show !== null ? show : !state.show
      }
    }
    case CREATE_TASK: {
      const { task } = action
      return {
        ...state,
        todos: {
          ...state.todos,
          [task.id]: task
        }
      }
    }
    case EDIT_TASK: {
      const { task } = action
      return {
        ...state,
        todos: {
          ...state.todos,
          [task.id]: task
        },
        toggleError: null
      }
    }
    case EDIT_ERROR: {
      const { /* taskId,  */error } = action
      return {
        ...state,
        toggleError: error
      }
    }
    case LOGOUT: {
      return defaultState
    }
    case TOGGLE_ORDER: {
      const { sortBy } = action
      const opt = { ...state.orderOptions[sortBy] }
      opt.reverse = opt.selected ? !opt.reverse : opt.reverse
      const newOptions = { ...state.orderOptions }
      Object.values(newOptions)
        .forEach(o => {
          o.selected = false
        })
      return {
        ...state,
        sortBy,
        orderOptions: {
          ...newOptions,
          [sortBy]: { ...opt, selected: true }
        }
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default todoReducer
