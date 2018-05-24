import React from "react";
import {shallow} from "enzyme";
import Week from "../week";

describe('Home', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Week date="Sun Apr 29 2018"/>);
    });

    describe('renders', () => {
        let td;

        beforeEach(() => {
            td = wrapper.find('td');
        });

        it('correct number of days', () => {
            expect(td.length).toBe(7);
        });

        it('correct day numbers', () => {
            expect(td.at(0).text()).toBe("29");
            expect(td.at(1).text()).toBe("30");
            expect(td.at(2).text()).toBe("1");
            expect(td.at(3).text()).toBe("2");
            expect(td.at(4).text()).toBe("3");
            expect(td.at(5).text()).toBe("4");
            expect(td.at(6).text()).toBe("5");
        })
    });
});