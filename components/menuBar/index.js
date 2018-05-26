import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import s from './menuBar.scss'

export const MenuBar = ({
  title = ''
}) => (
  <AppBar position='sticky' color='primary'>
    <Toolbar title={title} className={s.toolbar}>
      <Typography style={{ flex: 1 }} title={title} variant='title' color='inherit'>
        <span id='toolbarTitle' className={s.toolbarTitle}>{title}</span>
      </Typography>
    </Toolbar>
  </AppBar>
)

MenuBar.propTypes = {
  title: PropTypes.string
}

MenuBar.defaultProps = {
  title: ''
}

export default MenuBar
