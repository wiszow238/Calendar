import React from "react";
import {shallow} from "enzyme";
import Home from "../Home";
import Week from "../../week/week";

describe('Home', () => {
    let wrapper;
    const originalDate = Date;
    const fixedDate = new Date(2018, 2, 20);
    const fixedDate2 = new Date(2018, 2, 1);

    beforeEach(() => {
        wrapper = shallow(<Home/>);
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
            global.Date = jest.fn(() => fixedDate);
            global.Date.setDate = originalDate.setDate;
            wrapper = shallow(<Home/>);

            let thead = wrapper.find('thead');

            expect(thead.find('td').text()).toBe("March 2018");
        });

        describe('week rows', () => {
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

            it('correct number of weeks', () => {
                let weeks = table.find(Week);

                expect(weeks.length).toBe(5);
            });

            it('correct weeks', () => {
                Date = class extends Date {
                    constructor(a) {
                        super();

                        if (a === undefined) {
                            return fixedDate;
                        }
                        return fixedDate2;
                    }
                };

                wrapper = shallow(<Home/>);

                let week = wrapper.find(Week).at(0);

                expect(week.prop('date')).toBe("Sun Feb 25 2018");
                expect(wrapper.find(Week).at(1).prop('date')).toBe("Sun Mar 04 2018");
                expect(wrapper.find(Week).at(2).prop('date')).toBe("Sun Mar 11 2018");
                expect(wrapper.find(Week).at(3).prop('date')).toBe("Sun Mar 18 2018");
                expect(wrapper.find(Week).at(4).prop('date')).toBe("Sun Mar 25 2018");
            });
        });
    });
});