import React, { Component } from "react";
import { render } from "react-dom";

import { SVGBlackbox } from "../src";

class Demo extends Component {
    render() {
        return (
            <div>
                <h1>simple-react-d3 demo</h1>
            </div>
        );
    }
}

render(<Demo />, document.querySelector("#demo"));
