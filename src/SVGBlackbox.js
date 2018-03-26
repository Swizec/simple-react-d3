import React from "react";

export default function SVGBlackbox(SVGrender) {
    return class Blackbox extends React.Component {
        componentDidMount() {
            SVGrender.call(this);
        }
        componentDidUpdate() {
            SVGrender.call(this);
        }

        render() {
            const { x = 0, y = 0 } = this.props;
            return <g transform={`translate(${x}, ${y})`} ref="anchor" />;
        }
    };
}
