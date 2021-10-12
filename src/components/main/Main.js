import React, { Component } from 'react'
import TextFiled from './TextFiled'
import Quantity from './Quantity'
import '../../css/general.css'
import Information from './Information'
import Options from './Options'
import Dimension from './Dimension'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state={
            defaultValue:1000,
            series:1,
            height:null,
            width:null
        }
    }

    statesOfComponent=(value , series)=>{
        this.setState({
            defaultValue:value ,
            series:series
        })
    }

    getStateHeight=(height)=>{
        console.info(height)
        this.setState({height:height})
    }

    getStateWidth=(width)=>{
        this.setState({width:width})
    }
    
    render() {
        return (
            <div className='main ms-2 '>
                <Quantity/>
                <TextFiled 
                    statesOfComponent={(value , series)=>this.statesOfComponent(value , series)}
                />
                <Information/>
                <Options/>
                <Dimension 
                    getStateHeight={(height)=>this.getStateHeight(height)}
                    getStateWidth={(width)=>this.getStateWidth(width)}
                    series={this.state.series}
                />
            </div>
        )
    }
}
