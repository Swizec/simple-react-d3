import React from "react";

const ReactD3 = function(defaultD3, updateD3, renderD3) {
    return class ReactD3 extends React.Component {
        constructor(props) {
            super(props);

            Object.entries(defaultD3).forEach(
                ([key, value]) => (this[key] = value)
            );
        }

        componentWillMount() {
            updateD3.call(this, this.props);
        }
        componentWillUpdate(nextProps) {
            updateD3.call(this, nextProps);
        }

        render() {
            return renderD3.call(this);
        }
    };
};

export default ReactD3;
