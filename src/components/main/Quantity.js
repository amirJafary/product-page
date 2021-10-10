import axios from 'axios'
import React, { Component } from 'react'
import '../../css/general.css'

export default class Quantity extends Component {

    constructor(props) {
        super(props);
        this.state={
            name:''
        }
    }
    

    getProductInfo=()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetProductInfo?&id=7766&title=is+not+valid+now')
            .then(response =>
                this.setState({
                    name:response.data.messageItems[0].data?.name
                },()=>console.info(this.state.name))
            )
            // console.info(response.data.messageItems[0].data.name)
    }
    
    componentDidMount(){
        this.getProductInfo()
    }

    render() {
        return (
            <div>
                <h2 className='mb-4'>{this.state.name}</h2>
                <p>In order to print the most economical option, based on the circulation and series, please enter your required quantity.</p>
            </div>
        )
    }
}
