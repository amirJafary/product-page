import React, { Component } from 'react'
import axios from 'axios'
import '../../css/general.css'

export default class Options extends Component {

    constructor(props) {
        super(props);
        this.state={
            printedSides:'',
            turnarounds:'',
        }
    }

    getPrintingFeature = ()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetPrintingFeature?&Id=7766')
            .then(response =>
                this.setState({
                    printedSides:response.data.messageItems[0].data.printedSides[0].value,
                    turnarounds:response.data.messageItems[0].data.turnarounds[0].value,
                },()=>console.info('mmd',this.state.printedSides,'Ali',this.state.turnarounds))
                // console.info('mmd',response.data.messageItems[0].data.printedSides[0].value,

                // 'Ali',response.data.messageItems[0].data.turnarounds[0].value,
                // )
                
            )
    }

    componentDidMount(){
        this.getPrintingFeature()
    }
    
    render() {
        return (
            <div className='d-flex'>
                <div className='turnaround'>
                    <label className='mb-2 fs12 TAC'>Turnaround</label>
                    <br/>
                    <span className='bold'>{this.state.turnarounds}</span>
                </div>
                <div className='turnaround'>
                    <label className='mb-2 fs12 TAC'>Printed Side</label>
                    <br/>
                    <span className='bold'>{this.state.printedSides}</span>
                </div>
            </div>
        )
    }
}
