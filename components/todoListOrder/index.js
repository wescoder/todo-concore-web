import PropTypes from 'prop-types'
import { Component } from 'react'
import { connect } from 'react-redux'

import { Chip } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader'
import CheckIcon from '@material-ui/icons/Check'

import { todoActions } from '@reducers/todo'
import styles from './todoListOrder.scss'

export class TodoListOrder extends Component {
  static propTypes = {
    orderOptions: PropTypes.any.isRequired,
    toggleOrder: PropTypes.func.isRequired
  }

  render () {
    const { orderOptions, toggleOrder } = this.props
    return (
      <CardHeader title='Order by:' subheader={
        Object.keys(orderOptions)
          .map(k => {
            const o = orderOptions[k]
            return (
              <Chip
                key={k}
                className={styles.chip}
                label={[
                  `${o.label} ${o.reverse ? '⮟' : '⮝'}`,
                  o.selected ? <CheckIcon key='2' className={styles.chipIcon} /> : null
                ]}
                onClick={() => toggleOrder(k)}
              />
            )
          })
      } />
    )
  }
}

const mapStateToProps = ({ todo }) => todo

const mapDispatchToProps = dispatch => ({
  toggleOrder: sortBy => dispatch(todoActions.toggleOrder(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoListOrder)
