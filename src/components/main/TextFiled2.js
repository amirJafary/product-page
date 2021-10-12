import React, { Component } from 'react'
import '../../css/general.css'
import Input from '@mui/material/Input';
import axios from 'axios'

const ariaLabel = { 'aria-label': 'description' };

export default class Inputs extends Component {

    constructor(props) {
        super(props);
        this.state={
            defaultValue:1000,
            series:1,
            printedSides:null,
            turnaround:null,
            selectedId:null,
            
        }
    }

    minus=()=>{
        if(this.state.defaultValue>1000)
        this.setState({
            defaultValue:this.state.defaultValue-(1000),
            series:this.state.series-1
        },()=>this.props.statesOfComponent(this.state.defaultValue , this.state.series))
    }

    plus=()=>{
        this.setState({
            defaultValue:this.state.defaultValue+1000,
            series:this.state.series+1
        },()=>this.props.statesOfComponent(this.state.defaultValue , this.state.series))
    }
    
    minus1=()=>{
        if(this.state.series>1)
        this.setState({
            series:this.state.series-1,
            defaultValue:this.state.defaultValue-(1000),
        },()=>this.props.statesOfComponent(this.state.defaultValue , this.state.series))
    }

    plus1=()=>{
        this.setState({
            series:this.state.series+1,
            defaultValue:this.state.series*1000+1000,
        },()=>this.props.statesOfComponent(this.state.defaultValue , this.state.series))
    }

    getProductPrintingSidesAndTurnaround=()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetPrintingFeature?&Id=7766')
        .then(response =>
            this.setState({
                printedSides:response.data.messageItems[0].data.printedSides[0].key,
                turnaround:response.data.messageItems[0].data.turnarounds[0].key
            },()=>
            this.getPrice())

            // console.info('this is response of get product info ',response.data.messageItems[0].data.turnarounds[0].key)
        )
    }

    getProductInfo=()=>{
        axios.get('http://172.17.17.101:8088/api/en/Nas/Product/GetProductInfo?&id=7766&title=is+not+valid+now')
        .then(response => {

                this.setState({
                    selectedId:response.data.messageItems[0].data.selectedId
                },()=>{
                    this.getProductPrintingSidesAndTurnaround();
                })
            }
            // console.info('aaaaaaaaaaaaaaaaaaa',response.data.messageItems[0].data.selectedId)
        )
    }

    componentDidMount(){
        this.getProductInfo();
    }

    getPrice=()=>{
        let data={
            productId:this.state.selectedId , 
            series:this.state.series , 
            turnaround:this.state.turnaround , 
            twoSidePrintingType:this.state.printedSides ,
        }

        axios.post('http://172.17.17.101:8088/api/en/Order/SharedSheetOrder/GetBasicPrice?',data, {
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjQzMzUiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYzMjg5OTczNSwiZXhwIjoxNjM1NDkxNzM1LCJpYXQiOjE2MzI4OTk3MzV9.j9T8jKUUgObVES3yfel4R-tPgfL23phpPGTIaiaQfkM`
            }
        })
        .then((res) => {
            this.setState({
                price:res.data.messageItems[0].data[0].basePrice
            })
        // console.info("eeeeeee ali yee ",res.data.messageItems[0].data[0].basePrice)
        })
    }
    
    render(){
        return (
            <div className='mb-5 mt-5'>
            <label className='ms-1 mt-2 p-0 m-0'>Series</label>
            <label className='mt-2 p-0 ' style={{marginInlineStart:'330px'}}>Quantity</label>
            <br/>
            <span className='parentInput-textFiled me-2'>
                <button 
                    className='BTN me-2'
                    onClick={this.minus1}
                >
                    -
                </button>
                <Input 
                    className='input-textFiled'
                    value={this.state.series}
                    inputProps={ariaLabel}
                />
                <button 
                    className='BTN ms-2'
                    onClick={this.plus1}
                >
                    +
                </button>
            </span>
            <span className='fs20'>&times;</span>
            <span style={{width:'80 px' , background:'#eee' , borderRadius:'5px'}} className='ms-2 me-2 p-3'>
                <span>  Circulation  </span>
                
                <span className='bold'>1000</span>
            </span>
            <span className='fs20'>=</span>
            <span className='parentInput-textFiled ms-2'>
            <button 
                className='BTN me-2'
                onClick={()=>this.minus(this.state.series)}
            >
                -
            </button>
            <Input 
                className='input-textFiled'
                value={this.state.defaultValue}
                inputProps={ariaLabel}
            />
            <button 
                className='BTN ms-2'
                onClick={()=>this.plus(this.state.series)}
            >
                +
            </button>
        </span>
        </div>
        );  
    }
}