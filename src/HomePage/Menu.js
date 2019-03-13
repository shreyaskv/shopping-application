import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import NumericInput from 'react-numeric-input';
import {menuActions} from '../_actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {TopBar} from './TopBar.js';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';

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
      margin1: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        position: 'absolute',
        bottom: '5vh',
        right: '45%',
        margin: 0,
        width: '10vh',
      },
      right: {
        position: 'absolute',
        right: '10%',
        top: '40%',
      },
      text: {
          marginLeft: '3%',
          marginRight: '3%',
          marginTop: '3%',
          textAlign: 'center',
      },
      paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
      },
  });

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class Menu extends Component{

    state = {
        order: [],
        open: true,
        number: '',
        location: '',
        paneer: false,
        dosaPrice: 40,
    }

    items = [
        {
            id: 1,
            name: "Vegetable Dosa",
            description: 'onion, green chilli, tomato, carrot',
            price: this.state.dosaPrice,
        },
        {
            id: 2,
            name: "Idli(4 nos)",
            description: "with chutney and sambar",
            price: 40,
        },
        {
            id: 3,
            name: "Curd Rice",
            description: 'with homemade pickle',
            price: 20,
        },
        {
            id: 4,
            name: "Combo",
            description: "Dosa + Curd Rice",
            price: 50,
        },
    ]

    change = (input, name, price) => {
        var temp = {};
        if(this.state.order.length === 0){
            temp = {
                "name": name,
                "quantity": input,
                "price": input*(name==='Vegetable Dosa' ? this.state.dosaPrice : price),
            }
            this.state.order.push(temp);
        }
        else{
            var k = 0;
        for(var i=0; i< this.state.order.length ; i++)
        {
          if(this.state.order[i].name === name)
          {
            this.state.order[i].quantity = input;
            this.state.order[i].price = input*(name==='Vegetable Dosa' ? this.state.dosaPrice : price);
            k++;
          }
        }
        if(k===0){
            temp = {
                "name": name,
                "quantity": input,
                "price": input*(name==='Vegetable Dosa' ? this.state.dosaPrice : price),
            }
            this.state.order.push(temp);
        }
    }
    }

    setOrd = () =>{
        this.props.setOrder(this.state.order);
        console.log(this.state.order, this.state.number);
    }

    handleChange = (e, evnt) => {
            this.setState({
                [evnt]: e.target.value,
              });
    }

    handleChange1 = (event, name) => {
        this.setState({ [name]: event.target.checked });
        if(event.target.checked) this.setState({dosaPrice: 50});
        else this.setState({dosaPrice: 40});
      };

    submitNumber = () => {
        if(this.state.number !== '' && this.state.location !== '')
        {
            this.props.setDetail(this.state.number, this.state.location);
        }
        else if(this.state.number === '' && this.state.location !== '')
        {
            alert("Enter Phone Number")
        }

        else if(this.state.number !== '' && this.state.location === '')
        {
            alert("Enter Location")
        }
        else{
            alert("Enter Location and Phone number")
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
            <TopBar comp="Menu" />
            <div className={classes.text}>
                <p>Pure groundnut oil is used</p>
                <p>Minimum Order: 200</p>
            </div>
            <div style={{height: '72vh', overflowY: 'scroll'}}>
                {this.items.map((item, index) => {
                    return(
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            {item.name}
                        </Typography>
                        <Typography>
                            {item.description}
                        </Typography>
                        
                        <Typography variant="h6" component="h4">
                        {item.name === 'Vegetable Dosa'? this.state.dosaPrice : item.price}
                        
                        </Typography>
                        <Typography>
                        {item.name === 'Vegetable Dosa' &&
                            <div>
                            Add paneer to Dosa(Rs. 10)
                            <br />
                                    <Switch
          checked={this.state.paneer}
          onChange={(e) => this.handleChange1(e, 'paneer')}
          value="paneer"
        />
        
                            
                            </div>
                            }
                            </Typography>
                        
                        <div className={classes.right}>
                            <NumericInput min={1} max={10} onChange={(input) => {this.change(input, item.name, item.price)}} value="" 
                            style={{
                                input: {
                                    width: '15vh',
                                }
                                }}
                            />
                            <br />
        
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

            <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.set2}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <center>
              Enter Phone Number(*)
              <br />
                <TextField
                    id="outlined-name"
                    label="Number"
                    className={classes.textField}
                    value={this.state.number}
                    onChange={(e) => this.handleChange(e, 'number')}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                Enter Delivery Location(*)
              <br />
                <TextField
                    id="outlined-name"
                    label="Location"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={(e) => this.handleChange(e, 'location')}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                    <Fab size="medium" color="secondary" aria-label="Add" className={classes.margin1} onClick={this.submitNumber}>
                        Submit
                    </Fab>
        </center>

          </div>
        </Modal>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => {
    const { set2  } = state.menu
    return {
        set2,
    };
  }

const mapDispatchToProps = (dispatch) => ({
    setOrder: (order) => {
        dispatch(menuActions.setOrder(order)) 
    },
    setDetail: (number, location) => {
        dispatch(menuActions.setDetails(number, location)) 
    },
})

const connectedMenu = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Menu));
export { connectedMenu as Menu };