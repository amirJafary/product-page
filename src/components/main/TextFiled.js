import React, { Component } from 'react'
import '../../css/general.css'
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default class Inputs extends Component {

    constructor(props) {
        super(props);
        this.state={
            defaultValue:1000,
            series:1,
        }
    }

    minus=(series)=>{
        if(this.state.defaultValue>1000)
        this.setState({
            defaultValue:this.state.defaultValue-(1000),
        },()=>console.info(this.state.defaultValue))
    }

    plus=(series)=>{
        this.setState({
            defaultValue:this.state.defaultValue+1000,
        },()=>console.info(this.state.defaultValue))
    }
    
    minus1=()=>{
        if(this.state.series>1)
        this.setState({
            series:this.state.series-1,
        },()=>console.info(this.state.series))
    }

    plus1=()=>{
        this.setState({
            series:this.state.series+1,
        },()=>console.info(this.state.series))
    }

    
    render(){
        return (
            <>
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
        </>
        );  
    }
}