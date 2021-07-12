import React from 'react';
import Auth from './containers/Auth';
import { Card } from '@material-ui/core';

class Home extends React.Component {
    render() {
        return (
            // 
            <div>
                <h1>Smarticus</h1>
                <Card style={{ backgroundColor: '#26004d', borderRadius:'19%'}}>
                    <Auth/>
                </Card>
            </div>

        )
    }
}

export default Home;