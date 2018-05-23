import React from "react";
import {shallow} from "enzyme";
import Home from "../Home";

describe('Home', () => {
    let wrapper;
    const mockedDate = new Date(2018, 3, 20);
    const originalDate = Date;

    global.Date = jest.fn(() => mockedDate);
    global.Date.setDate = originalDate.setDate;

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
            expect(thead.find('td').prop("colSpan")).toBe("7");
        });

        it('correct month and year', () => {
            let thead = table.find('thead');

            expect(thead.find('td').text()).toBe("April 2018");
        });

        it('day rows', () => {
            let row = table.find('tbody').find('tr');

            expect(row.length).toBe(6);
            expect(row.at(0).find('td').length).toBe(7);
            expect(row.at(1).find('td').length).toBe(7);
            expect(row.at(2).find('td').length).toBe(7);
            expect(row.at(3).find('td').length).toBe(7);
            expect(row.at(4).find('td').length).toBe(7);
        });

        it('day label row', () => {
            let row = table.find('tbody').find('tr').at(0);

            expect(row.find('td').at(0).text()).toBe("SUN");
            expect(row.find('td').at(1).text()).toBe("MON");
            expect(row.find('td').at(2).text()).toBe("TUE");
            expect(row.find('td').at(3).text()).toBe("WED");
            expect(row.find('td').at(4).text()).toBe("THU");
            expect(row.find('td').at(5).text()).toBe("FRI");
            expect(row.find('td').at(6).text()).toBe("SAT");
        });
    });
});