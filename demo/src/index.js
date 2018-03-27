import React, { Component } from "react";
import { render } from "react-dom";
import * as d3 from "d3";

import { SVGBlackbox } from "../../src";

const Axis = SVGBlackbox(function() {
    const scale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([0, 200]);
    const axis = d3.axisBottom(scale);

    d3.select(this.refs.anchor).call(axis);
});

class Demo extends Component {
    render() {
        return (
            <div>
                <h1>simple-react-d3 demo</h1>
                <svg width="300" height="200">
                    <Axis x={10} y={10} />
                    <SVGBlackbox x={10} y={50}>
                        {anchor => {
                            const scale = d3
                                .scaleLinear()
                                .domain([0, 10])
                                .range([0, 200]);
                            const axis = d3.axisBottom(scale);

                            d3.select(anchor).call(axis);
                        }}
                    </SVGBlackbox>
                    <SVGBlackbox
                        x={10}
                        y={90}
                        render={anchor => {
                            const scale = d3
                                .scaleLinear()
                                .domain([0, 10])
                                .range([0, 200]);
                            const axis = d3.axisBottom(scale);

                            d3.select(anchor).call(axis);
                        }}
                    />
                </svg>
            </div>
        );
    }
}

render(<Demo />, document.querySelector("#demo"));
