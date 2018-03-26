import React from "react";
import isObject from "lodash.isobject";
import isFunction from "lodash.isfunction";

export function SVGBlackboxHOC(SVGrender) {
    return class Blackbox extends React.Component {
        componentDidMount() {
            SVGrender.call(this);
        }
        componentDidUpdate() {
            SVGrender.call(this);
        }

        render() {
            const { x = 0, y = 0, ...props } = this.props;
            return (
                <g
                    transform={`translate(${x}, ${y})`}
                    ref="anchor"
                    {...props}
                />
            );
        }
    };
}

const SVGBlackbox = SVGrender => {
    if (isFunction(SVGrender)) {
        return SVGBlackboxHOC(SVGrender);
    } else {
        const { children, render, x, y, ...props } = SVGrender;
        let anchor;

        return (
            <g
                transform={`translate(${x}, ${y})`}
                {...props}
                ref={node => (anchor = node)}
            >
                {children ? children(anchor) : render(anchor)}
            </g>
        );
    }
};

export default SVGBlackbox;
