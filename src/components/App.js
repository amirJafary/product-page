import React, { Component } from 'react'
import axios from 'axios'
import TextFiled from './main/TextFiled'
import Main from './main/Main'
import SideBar from './SideBar'


export default class App extends Component {

    getPrintingFeature = ()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetPrintingFeature?&Id=7766')
            .then(response =>
                console.info(response.data.messageItems[0].data)
            )
    }

    getProductInfo=()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetProductInfo?&id=7766&title=is+not+valid+now')
            .then(response =>
                console.info(response.data.messageItems[0].data)
            )
    }

    getBasicPrice=()=>{
        axios.get('http://172.17.17.101:8088/api/en/Order/SharedSheetOrder/GetBasicPrice?')
            .then(response =>
                console.info(response)
            )
    }

    componentDidMount(){
        // this.getPrintingFeature();
        // this.getProductInfo();
        this.getBasicPrice();
    }

    render() {
        return (
            <div className='d-flex bd m-5 p-2'>
                <SideBar/>
                <Main/>
            </div>
        )
    }
}
