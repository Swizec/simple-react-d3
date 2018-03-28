import React from "react";

export function ReactD3HOC(defaultD3, updateD3, renderD3) {
    const UsedAsHOC = !!renderD3;

    console.log("used as hoc?", UsedAsHOC);

    return class ReactD3 extends React.Component {
        constructor(props) {
            super(props);

            Object.entries(defaultD3).forEach(
                ([key, value]) => (this[key] = value)
            );
        }

        get args() {
            // Avoid passing children and render to functions
            const { children, render, ...props } = this.props;
            return Object.assign(
                props,
                Object.keys(defaultD3).reduce(
                    (obj, k) => Object.assign(obj, { [k]: this[k] }),
                    {}
                )
            );
        }

        componentDidMount() {
            if (UsedAsHOC) {
                updateD3.call(this, this.props);
            } else {
                updateD3(this.args);
            }
        }
        componentDidUpdate(nextProps) {
            if (UsedAsHOC) {
                updateD3.call(this, nextProps);
            } else {
                updateD3(this.args);
            }
        }

        render() {
            if (UsedAsHOC) {
                return renderD3.call(this);
            } else {
                const { children, render } = this.props;

                return children ? children(this.args) : render(this.args);
            }
        }
    };
}

export default function ReactD3() {
    if (arguments.length > 2) {
        return ReactD3HOC(...arguments);
    } else {
        const { defaultD3, updateD3, ...props } = arguments[0];

        const Hoc = ReactD3HOC(defaultD3, updateD3);

        return <Hoc {...props} />;
    }
}
