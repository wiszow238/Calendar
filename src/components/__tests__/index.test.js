jest.mock('react-dom');

import React from 'react';
import {shallow} from "enzyme";
import {Index} from "../index";
import {render} from "react-dom";
import Home from "../home/Home";

describe('Index', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Index/>)
    });

    it('render is called', () => {
        expect(render).toBeCalledWith(<Index/>, null)
    });

    it('renders App', () => {
        expect(wrapper.find(Home).length).toEqual(1);
    });
});