import React, { Component } from 'react'
import '../../css/general.css'
import axios from 'axios'


export default class Information extends Component {

    constructor(props) {
        super(props);
        this.state={
            description:''
        }
    }

    getProductInfo=()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetProductInfo?&id=7766&title=is+not+valid+now')
            .then(response =>
                this.setState({
                    description:response.data.messageItems[0].data?.description
                })
                // console.info(response.data.messageItems[0].data.description
            )
            // console.info(response.data.messageItems[0].data)
    }
    
    componentDidMount(){
        this.getProductInfo()
    }
    
    render() {
        return (
            <div className='mt-4 mb-4'>
                {this.state.description}
            </div>
        )
    }
}
