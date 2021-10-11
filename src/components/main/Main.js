import React, { Component } from 'react'
import TextFiled from './TextFiled'
import Quantity from './Quantity'
import '../../css/general.css'
import Information from './Information'
import Options from './Options'
import Dimension from './Dimension'

export default class Main extends Component {
    render() {
        return (
            <div className='main ms-2 '>
                <Quantity/>
                <TextFiled/>
                <Information/>
                <Options/>
                <Dimension/>
            </div>
        )
    }
}
