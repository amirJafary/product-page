import React, { Component } from 'react';
import '../../css/general.css'
import MenuButton from './MenuButton';

class Dimension extends Component {

    constructor(props) {
        super(props);
        this.state={
            price:30,
            lat:1
        }
    }
    
    getStateOfPrice=(price,lat)=>{
        this.setState({
            price:price,
            lat:lat
        })
    }
    render() {
        return (
            <div className='mt-4 mb-4'>
                <h6 className='bold'>Available Dimension(s):</h6>
                <div className='d-flex'>
                    <div>
                        <label className='bg-eee px-3 py-1 mb-2 TAC bold'>Dimension (mm)</label>
                        <br/>
                        <span className='px-3 py-2 border-dimension'>92 x 57 MM (57 * 92 mm)</span>
                    </div>
                    <div>
                        <label className='bg-eee px-3 py-1 mb-2 TAC bold bdr'>Price</label>
                        <br/>
                        <span className='px-3 py-2 border-dimension bdr'>{this.props.series*this.state.price}.00 AED</span>
                    </div>
                </div>
                <MenuButton
                    getStateHeight={(height)=>this.props.getStateHeight(height)}
                    getStateWidth={(width)=>this.props.getStateWidth(width)}
                    getStateOfPrice={(price,lat)=>this.getStateOfPrice(price,lat)}
                />
                <br/>
                <button className='BTN3'> start ordering </button>
            </div>
        );
    }
}

export default Dimension;