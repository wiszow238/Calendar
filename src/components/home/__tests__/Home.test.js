import React from "react";
import {shallow} from "enzyme";
import Home from "../Home";

describe('Home', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    describe('renders', () => {
        let table;

        beforeEach(() => {
            table = wrapper.find('table');
        });

        it('main calendar table', () => {
            expect(table.length).toBe(1);
        });

        it('month row', () => {
            let thead = table.find('thead');

            expect(thead.length).toBe(1);
            expect(thead.find('tr').length).toBe(1);
            expect(thead.find('td').length).toBe(1);
            expect(thead.find('td').prop("colspan")).toBe("7");
            expect(thead.find('td').text()).toBe("Month");
        });

        it('day rows', () => {
            let row = table.find('tbody').find('tr');

            expect(row.length).toBe(5);
            expect(row.at(0).find('td').length).toBe(7);
            expect(row.at(1).find('td').length).toBe(7);
            expect(row.at(2).find('td').length).toBe(7);
            expect(row.at(3).find('td').length).toBe(7);
            expect(row.at(4).find('td').length).toBe(7);
        });
    });
});