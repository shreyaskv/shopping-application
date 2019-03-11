import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumericInput from 'react-numeric-input';
import {menuActions} from '../_actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {TopBar} from './TopBar.js';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      margin: '3%',
      position: 'relative',
    },
    margin: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        position: 'absolute',
        bottom: '5vh',
        right: '45%',
        margin: 0,
      },
      right: {
        position: 'absolute',
        right: '10%',
        top: '40%',
      }
  });

class Menu extends Component{

    state = {
        order: [],
    }

    items = [
        {
            id: 1,
            name: "Masala Dosa",
            price: 50,
        },
        {
            id: 2,
            name: "Set Dosa",
            price: 40,
        },
        {
            id: 3,
            name: "Onion Dosa",
            price: 60,
        },
        {
            id: 4,
            name: "Rava Dosa",
            price: 50,
        },
        {
            id: 5,
            name: "Open Dosa",
            price: 60,
        },
        {
            id: 6,
            name: "Pizza Dosa",
            price: 70,
        },
        {
            id: 7,
            name: "Sada Dosa",
            price: 30,
        }
    ]

    change = (input, name, price) => {
        var temp = {};
        if(this.state.order.length === 0){
            temp = {
                "name": name,
                "quantity": input,
                "price": input*price,
            }
            this.state.order.push(temp);
        }
        for(var i=0; i< this.state.order.length ; i++)
        {
          if(this.state.order[i].name === name)
          {
            this.state.order[i].quantity = input;
            this.state.order[i].price = input*price;
          }
          else{
              temp = {
                  "name": name,
                  "quantity": input,
                  "price": input*price,
              }
              this.state.order.push(temp);
          }
        }
    }

    setOrd = () =>{
        this.props.setOrder(this.state.order);
        console.log(this.state.order);
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
            <TopBar comp="Menu" />
            <div style={{height: '87vh', overflowY: 'scroll'}}>
                {this.items.map((item, index) => {
                    return(
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            {item.name}
                        </Typography>
                        <Typography variant="h6" component="h4">
                            {item.price}
                        </Typography>
                        <div className={classes.right}>
                            <NumericInput min={1} max={10} onChange={(input) => {this.change(input, item.name, item.price)}} value="" 
                            style={{
                                input: {
                                    width: '15vh',
                                }
                                }}
                            />
                        </div>
                    </Paper>
                    );
                })}

                
                    <Link to='/checkOut'>
                    <center>
                    <Fab size="medium" color="secondary" aria-label="Add" className={classes.margin} onClick={this.setOrd}>
                        <AddIcon />
                    </Fab>
                    </center>
                    </Link>
                

            </div>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapDispatchToProps = (dispatch) => ({
    setOrder: (order) => {
        dispatch(menuActions.setOrder(order)) 
    },
})

const connectedMenu = connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Menu));
export { connectedMenu as Menu };