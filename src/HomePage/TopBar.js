import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import Backspace from '@material-ui/icons/Backspace';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  upper: {
    textTransform: 'uppercase',
  },
  heading: {
    margin: 'auto',
  },
  menuButton: {
    position: 'absolute',
    left: 0,
  },
  addButton: {
    right: 0,
  }
};

class TopBar extends React.Component {


  render(){
  const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.centered}>
          <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.heading}>
                <b className={classes.upper}>{this.props.comp}</b>
              </Typography>
              {this.props.comp === 'CheckOut'? 
              <Link to='/'>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.back}>
                        <Backspace />
                    </IconButton>
              </Link> : 
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const connectedTopBar = (withStyles(styles, { withTheme: true })(TopBar));
export { connectedTopBar as TopBar };
