import expect, { createSpy } from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import * as d3 from "d3";

import { SVGBlackbox } from "src/";

describe("SVGBlackbox", () => {
    let node, Axis;

    beforeEach(() => {
        node = document.createElement("svg");
        Axis = SVGBlackbox(function() {
            // render axis here, d3.select(<g>) doesn't work in PhantomJS
        });
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it("renders anchor element", () => {
        render(<Axis />, node, () => {
            expect(node.getElementsByTagName("g").length).toEqual(1);
        });
    });

    it("positions anchor element at 0,0 by default", () => {
        render(<Axis />, node, () => {
            let attr = node
                .getElementsByTagName("g")[0]
                .getAttribute("transform");
            expect(attr).toEqual("translate(0, 0)");
        });
    });

    it("positions anchor at x,y", () => {
        render(<Axis x={10} y={20} />, node, () => {
            let attr = node
                .getElementsByTagName("g")[0]
                .getAttribute("transform");
            expect(attr).toEqual("translate(10, 20)");
        });
    });

    it("uses given render method", () => {
        let spy = createSpy();
        let Axis = SVGBlackbox(spy);
        render(<Axis />, node, () => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it("uses renderprops", () => {
        let spy = createSpy();
        render(<SVGBlackbox render={spy} />, node, () => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it("uses function-as-children", () => {
        let spy = createSpy();
        render(<SVGBlackbox>{spy}</SVGBlackbox>, node, () => {
            expect(spy).toHaveBeenCalled();
        });
    });
});
