import React from "react";
import {shallow} from "enzyme";
import Week from "../week";
import TableCell from '@material-ui/core/TableCell';

describe('Home', () => {
    let wrapper;

    beforeEach(() => {
        const context = { table: {} };
        wrapper = shallow(<Week date="Sun Apr 29 2018"/>, context);
    });

    describe('renders', () => {
        let td;

        beforeEach(() => {
            td = wrapper.find(TableCell);
        });

        it('correct number of days', () => {
            expect(td.length).toBe(7);
        });

        it('correct day numbers', () => {
            expect(td.at(0).render().text()).toBe("29");
            expect(td.at(1).render().text()).toBe("30");
            expect(td.at(2).render().text()).toBe("1");
            expect(td.at(3).render().text()).toBe("2");
            expect(td.at(4).render().text()).toBe("3");
            expect(td.at(5).render().text()).toBe("4");
            expect(td.at(6).render().text()).toBe("5");
        })
    });
});