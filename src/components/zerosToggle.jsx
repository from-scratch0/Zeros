import React, { Component } from 'react';
import ToggleBar from './common/toggleBar';

class ZerosToggle extends Component {
    toggleItems = [
        { func: "toggleBoldMark", label: "B" },
        { func: "toggleCodeBlock", label: "code" },
    ];

    render() { 
        return  <ToggleBar toggleItems={this.toggleItems} />;
    }
}
 
export default ZerosToggle;