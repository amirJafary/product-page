import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Input from '@mui/material/Input';
import '../../css/general.css'

class MenuButton extends Component {

    constructor(props) {
        super(props);
        this.state={
            anchorEl:null,
            minWidth:1,
            minHeight:1
        }
    }

    handleClick = (event)=>{
        this.setState({anchorEl:event.currentTarget})
    }; 

    handleClose = () => {
        this.setState({anchorEl:null})
    };

    minus=(series)=>{
        if(this.state.minWidth>1)
        this.setState({
            minWidth:this.state.minWidth-1,
        },()=>console.info(this.state.minWidth))
    }

    plus=(series)=>{
        this.setState({
            minWidth:this.state.minWidth+1,
        },()=>console.info(this.state.minWidth))
    }
    
    minus1=()=>{
        if(this.state.minHeight>1)
        this.setState({
            minHeight:this.state.minHeight-1,
        },()=>console.info(this.state.minHeight))
    }

    plus1=()=>{
        this.setState({
            minHeight:this.state.minHeight+1,
        },()=>console.info(this.state.minHeight))
    }
    
    render() {
        const open = Boolean(this.state.anchorEl);
        const ariaLabel = { 'aria-label': 'description' };
        return (
            <div>
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    className='BTN2 mb-4'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event)=>this.handleClick(event)}
                >
                    Custom Dimension Price Inquiry
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={this.state.anchorEl}
                    open={open}
                    className='menu'
                    onClose={this.handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <h6>Custom Dimension Price Inquiry</h6>
                    <div>
                        <span className='ms-1 fs15 m-20'>Width</span>
                        <span className='ms-1 fs15'>Height</span>
                    </div>
                    <div className='d-flex'>
                        <div className='col-6'>
                            <span className='parentInput-textFiled me-2'>
                                <button 
                                    className='BTN me-2'
                                    onClick={this.minus}
                                >
                                    -
                                </button>
                                <Input 
                                    className='input-textFiled'
                                    value={this.state.minWidth}
                                    inputProps={ariaLabel}
                                />
                                <button 
                                    className='BTN ms-2'
                                    onClick={this.plus}
                                >
                                    +
                                </button>
                            </span>
                        </div>
                        <div className='col-6'>
                            <span className='parentInput-textFiled me-2'>
                                <button 
                                    className='BTN me-2'
                                    onClick={this.minus1}
                                >
                                    -
                                </button>
                                <Input 
                                    className='input-textFiled'
                                    value={this.state.minHeight}
                                    inputProps={ariaLabel}
                                    
                                />
                                <button 
                                    className='BTN ms-2'
                                    onClick={this.plus1}
                                >
                                    +
                                </button>
                            </span>
                        </div>
                    </div>
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
                                <span className='px-3 py-2 border-dimension bdr'>30.00 AED</span>
                            </div>
                        </div>
                    </div>
                </Menu>
            </div>
        );
    }
}

export default MenuButton;