import React, { Component } from 'react'
import image from '../image/download.png'
import '../css/general.css'

export default class SideBar extends Component {
    render() {
        return (
            <div className='sideBar'>
                <img src={image} alt='img' className='img-sideBar'/>
            </div>
        )
    }
}
