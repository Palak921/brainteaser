import React from 'react';
import Auth from './Containers/Auth';
import { Card } from '@material-ui/core';
import './App.css'

class Home extends React.Component {
    render() {
        return (
            // 
            <div className="Home">
                <h1>Smarticus</h1>
                <Card style={{ borderRadius: '19%', backgroundColor: '#6f7c67', boxShadow: '4px 4px 2px rgb(80, 79, 79)' }}>
                    <Auth />
                </Card>
            </div>

        )
    }
}

export default Home;