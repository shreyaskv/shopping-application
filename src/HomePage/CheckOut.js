import React, {Component} from 'react';
import Nexmo from 'nexmo';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import {TopBar} from './TopBar.js';


const nexmo = new Nexmo({
    apiKey: 'a5836c7d (Master)',
    apiSecret: 'GRoclfgRHcZTVXO4',
}, {debug: true});

const styles = theme => ({
    margin: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        position: 'absolute',
        bottom: '5vh',
        right: '36%',
        width: '20vh',
      },

  });

class CheckOut extends Component{
    state = {
        finalOrder : [],
        ttl: 0,
        start: false,
    }
    
    setOrd = () => {
        var total = 0;

        for(var i=0; i<this.props.order.length; i++)
        {
            total = total + this.props.order[i].price;
        }
        var total1 = "Your order of Rs." + total + " has been placed by " + this.props.number + '.';
        var tot = JSON.stringify({"text": total1});

        if(total > 200){
        fetch('http://localhost:4500/sendSMS', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: tot,
          })
          .then(function(res){ console.log(res); alert("order placed"); })
          .catch(function(error){ console.log(error)});
        }

        else{
            alert("Minimum Order Value is 200");
        }
    }

    componentDidMount(){
        var total = 0;
        for(var i=0; i<this.props.order.length; i++)
        {
            total = total + this.props.order[i].price;
        }
        this.setState({ttl: total, start : true});

    }

    render(){
        const {classes} = this.props;

        return(
            <div>
                {this.state.start === true &&
                <div>
                    <TopBar comp="CheckOut" />
                <div>
                    <center>
                    {this.props.set1 === true && 
                                <Table>
                                <TableHead>
                                    <TableRow>
                                    <TableCell  align="left">Name</TableCell>
                                    <TableCell  align="left">Quantity</TableCell>
                                    <TableCell align="right" >Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.order.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell  align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.quantity}</TableCell>
                                        <TableCell component="th" scope="row" align="right">
                                        {row.price}
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                    }
                    <br />
                    <center>
                        Total: {this.state.ttl}
                    </center>

                    
                        <Fab size="medium" color="secondary" aria-label="Add" className={classes.margin} onClick={this.setOrd}>
                            Place Order
                        </Fab>
                        </center>
                </div>
                </div>
                }
            </div>
        );
    }
}

CheckOut.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    const { set1, order, number  } = state.menu
    return {
        set1,
        order,
        number,
    };
  }
  
  const connectedCheckOut = connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CheckOut));
  export { connectedCheckOut as CheckOut };
  
