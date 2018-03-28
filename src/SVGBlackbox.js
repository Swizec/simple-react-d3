import React from "react";
import isObject from "lodash.isobject";
import isFunction from "lodash.isfunction";

export function SVGBlackboxHOC(SVGrender) {
    return class Blackbox extends React.Component {
        componentDidMount() {
            SVGrender.call(this);
        }
        componentDidUpdate() {
            let anchor = this.refs.anchor;

            while (anchor.firstChild) {
                anchor.removeChild(anchor.firstChild);
            }
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
        const { children, render, ...props } = SVGrender,
            { x = 0, y = 0 } = props;

        return (
            <g
                transform={`translate(${x}, ${y})`}
                ref={anchor => {
                    if (anchor) {
                        while (anchor.firstChild) {
                            anchor.removeChild(anchor.firstChild);
                        }
                        children
                            ? children(anchor, props)
                            : render(anchor, props);
                    }
                }}
                {...props}
            />
        );
    }
};

export default SVGBlackbox;
