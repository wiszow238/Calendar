import React from "react";
import {mount} from "enzyme";
import Week from "../Week";
import TableCell from '@material-ui/core/TableCell';

describe('Home', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Week date="Sun Apr 29 2018" appointments={new Map()}/>, { table: {} });
    });

    describe('renders', () => {
        let td;

        beforeEach(() => {
            td = wrapper.find(TableCell);
        });

        it('correct number of days', () => {
            expect(td.length).toEqual(7);
        });

        it('correct day numbers', () => {
            expect(td.at(0).text()).toEqual("29");
            expect(td.at(1).text()).toEqual("30");
            expect(td.at(2).text()).toEqual("1");
            expect(td.at(3).text()).toEqual("2");
            expect(td.at(4).text()).toEqual("3");
            expect(td.at(5).text()).toEqual("4");
            expect(td.at(6).text()).toEqual("5");
        })
    });
});