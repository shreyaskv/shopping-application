import React from 'react';
import { connect } from 'react-redux';

class CheckOut extends React.Component {

    render() {
        return(
            <div>
                CheckOut
            </div>
        )
    }
    
}


const connectedCheckOut = connect(null, null)(CheckOut);
export { connectedCheckOut as CheckOut };