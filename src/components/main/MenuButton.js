import React, { Component } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Input from "@mui/material/Input";
import "../../css/general.css";
import { InputAdornment } from "@mui/material";
import axios from "axios";

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      minWidth: 92,
      minHeight: 57,
      height: null,
      width: null,
      price: 30,
      printedSides: null,
      turnaround: null,
      selectedId: null,
      dataOfProduct: [],
      lat: 1,
      series:1,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  minus = () => {
    if (this.state.minWidth > 1)
      this.setState(
        {
          minWidth: this.state.minWidth - 1,
        },
        () => this.props.getStateWidth(this.state.minWidth)
      );
  };

  plus = () => {
    this.setState(
      {
        minWidth: this.state.minWidth + 1,
      },
      () => this.props.getStateWidth(this.state.minWidth)
    );
  };

  minus1 = () => {
    if (this.state.minHeight > 1)
      this.setState(
        {
          minHeight: this.state.minHeight - 1,
        },
        () => this.props.getStateHeight(this.state.minHeight)
      );
  };

  plus1 = () => {
    this.setState(
      {
        minHeight: this.state.minHeight + 1,
      },
      () => this.props.getStateHeight(this.state.minHeight)
    );
  };

  changeHandlerHeight = (e) => {
    this.setState({
      minHeight: Math.floor(e.target.value),
      height: Math.floor(e.target.value),
    });
  };

  getProductPrintingSidesAndTurnaround = () => {
    axios
      .get(
        "http://172.17.17.101:8088/api/en/Nas/Product/GetPrintingFeature?&Id=7766"
      )
      .then((response) => {
        if (
          this.state.printedSides !==
            response.data.messageItems[0].data.printedSides[0].key ||
          this.state.turnaround !==
            response.data.messageItems[0].data.turnarounds[0].key
        )
          this.setState(
            {
              printedSides:
                response.data.messageItems[0].data.printedSides[0].key,
              turnaround: response.data.messageItems[0].data.turnarounds[0].key,
            },
            () => this.getProductInfo
          );

        // console.info('this is response of get product info ',response.data.messageItems[0].data.turnarounds[0].key)
      });
  };

  getProductInfo = () => {
    axios
      .get(
        "http://172.17.17.101:8088/api/en/Nas/Product/GetProductInfo?&id=7766&title=is+not+valid+now"
      )
      .then(
        (response) => {
          if (
            this.state.selectedId !==
            response.data.messageItems[0].data.selectedId
          )
            this.setState(
              {
                selectedId: response.data.messageItems[0].data.selectedId,
              },
              () => {
                this.getPrice();
                this.getProductPrintingSidesAndTurnaround();
              }
            );
        }
        // console.info('aaaaaaaaaaaaaaaaaaa',response.data.messageItems[0].data.selectedId)
      );
  };

  getPrice = () => {
    let data = {
      productId: this.state.selectedId,
      turnaround: this.state.turnaround,
      twoSidePrintingType: this.state.printedSides,
      height: this.state.minHeight,
      width: this.state.minWidth,
      series: this.state.series,
    };

    axios
      .post(
        "http://172.17.17.101:8088/api/en/Order/SharedSheetOrder/GetBasicPrice?",
        data,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjQzMzUiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYzMjg5OTczNSwiZXhwIjoxNjM1NDkxNzM1LCJpYXQiOjE2MzI4OTk3MzV9.j9T8jKUUgObVES3yfel4R-tPgfL23phpPGTIaiaQfkM`,
          },
        }
      )

      .then((res) => {
        let lat = res.data.messageItems[0].data[0]?.latCount;
        let price = res.data.messageItems[0].data[0]?.basePrice;
        this.setState({
          dataOfProduct: res.data.messageItems[0].data,
          lat:lat,
          price:price
        },()=>this.props.getStateOfPrice(this.state.price , this.state.lat))
        //     console.log(res);
        //     console.info(res.data.messageItems[0].data);
        //     if (
        //       this.state.dataOfProduct?.length !==
        //       res.data.messageItems[0].data?.length
        //     )
        //       // if(this.state.dataOfProduct[0]?.height !== res.data.messageItems[0].data?.length)
        //       this.setState({
        //         dataOfProduct: res.data.messageItems[0].data,
        //         // lat:res.data.messageItems[0].data
        //       });
        //     // console.info("eeeeeee ali yee ",res.data.messageItems[0].data)
      });
  };

  componentDidMount() {
    this.getProductPrintingSidesAndTurnaround();
    this.getProductInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.minHeight, this.state.minHeight, "****");
    if (
      prevState.minHeight !== this.state.minHeight ||
      prevState.minWidth !== this.state.minWidth
    )
      this.getPrice();
    // this.getPrice();
    // this.getProductPrintingSidesAndTurnaround();
    // this.getProductInfo();
  }

  changeHandlerWidth = (e) => {
    this.setState(
      {
        minWidth: Math.floor(e.target.value),
        width: Math.floor(e.target.value),
      },
      () => this.props.getStateWidth(this.state.width)
    );
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const ariaLabel = { "aria-label": "description" };
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          className="BTN2 mb-4"
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => this.handleClick(event)}
        >
          Custom Dimension Price Inquiry
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          className="menu"
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <h6>Custom Dimension Price Inquiry</h6>
          <div>
            <span className="ms-1 fs15 m-20">Width</span>
            <span className="ms-1 fs15">Height</span>
          </div>
          <div className="d-flex">
            <div className="col-6">
              <span className="parentInput-textFiled me-2">
                <button className="BTN me-2" onClick={this.minus}>
                  -
                </button>
                <Input
                  className="input-textFiled"
                  value={this.state.minWidth}
                  inputProps={{ ariaLabel }}
                  onChange={(e) => this.changeHandlerWidth(e)}
                  type="number"
                  endAdornment={
                    <InputAdornment position="end">mm</InputAdornment>
                  }
                />
                <button className="BTN ms-2" onClick={this.plus}>
                  +
                </button>
              </span>
            </div>
            <div className="col-6">
              <span className="parentInput-textFiled me-2">
                <button className="BTN me-2" onClick={this.minus1}>
                  -
                </button>
                <Input
                  className="input-textFiled"
                  value={this.state.minHeight}
                  inputProps={ariaLabel}
                  onChange={(e) => this.changeHandlerHeight(e)}
                  type="number"
                  endAdornment={
                    <InputAdornment position="end">mm</InputAdornment>
                  }
                />
                <button className="BTN ms-2" onClick={this.plus1}>
                  +
                </button>
              </span>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <h6 className="bold">Available Dimension(s):</h6>
            <div className="d-flex">
              <div>
                <label className="bg-eee px-3 py-1 mb-2 TAC bold">
                  Dimension (mm)
                </label>
                <br />
                <span className="px-3 py-2 border-dimension">
                  92 x 57 MM (57 * 92 mm)
                </span>
              </div>
              <div>
                <label className="bg-eee px-3 py-1 mb-2 TAC bold bdr">
                  Price
                </label>
                <br />
                <span className="px-3 py-2 border-dimension bdr">
                  {this.state.price}.00 AED
                </span>
              </div>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
