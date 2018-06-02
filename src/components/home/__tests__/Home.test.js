import React from "react";
import {shallow} from "enzyme";
import Home from "../Home";
import Week from "../../week/Week";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import WarningDialog from "../../dialog/WarningDialog";
import AppointmentDialog from "../../dialog/AppointmentDialog";

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
            table = wrapper.find(Table);
        });

        it('paper card', () => {
            expect(wrapper.find(Paper).length).toBe(1);
        });

        it('main calendar table', () => {
            expect(table.length).toBe(1);
        });

        it('month row', () => {
            let thead = table.find(TableHead);

            expect(thead.length).toBe(1);
            expect(thead.find(TableRow).length).toBe(1);
            expect(thead.find(TableCell).length).toBe(1);
            expect(thead.find(TableCell).prop("colSpan")).toBe("7");
        });

        it('correct month and year', () => {
            global.Date = jest.fn(() => fixedDate);
            global.Date.setDate = originalDate.setDate;
            wrapper = shallow(<Home/>);

            let thead = wrapper.find(TableHead);

            expect(thead.find(TableCell).render().text()).toBe("March 2018");
        });

        it('warning dialog', () => {
            wrapper.setState({warningDialogOpen: 'someValue'});

            let warningDialog = wrapper.find(WarningDialog);

            expect(warningDialog.length).toBe(1);
            expect(warningDialog.prop('warningDialogOpen')).toBe('someValue');
            expect(warningDialog.prop('handleWarningYes')).toBe(wrapper.instance().handleWarningYes);
            expect(warningDialog.prop('handleCancel')).toBe(wrapper.instance().handleCancel);
        });

        it('appointment dialog', () => {
            wrapper.setState({
                appointmentDate: "someDate",
                appointmentTime: "someTime",
                appointmentDescription: "someDescription",
                appointmentDialogOpen: "someOpen",
                appointmentAction: 'someValue',
                errorMessage: "someError"
            });

            let appointmentDialog = wrapper.find(AppointmentDialog);

            expect(appointmentDialog.length).toBe(1);
            expect(appointmentDialog.prop('appointmentDate')).toBe('someDate');
            expect(appointmentDialog.prop('appointmentTime')).toBe('someTime');
            expect(appointmentDialog.prop('appointmentDescription')).toBe('someDescription');
            expect(appointmentDialog.prop('appointmentDialogOpen')).toBe('someOpen');
            expect(appointmentDialog.prop('appointmentAction')).toBe('someValue');
            expect(appointmentDialog.prop('errorMessage')).toBe('someError');
            expect(appointmentDialog.prop('handleDelete')).toBe(wrapper.instance().handleDelete);
            expect(appointmentDialog.prop('handleChange')).toBe(wrapper.instance().handleChange);
            expect(appointmentDialog.prop('handleCancel')).toBe(wrapper.instance().handleCancel);
            expect(appointmentDialog.prop('handleSave')).toBe(wrapper.instance().handleSave);
        });

        describe('week rows', () => {
            it('correct day labels', () => {
                let row = table.find(TableBody).find(TableRow).at(0);

                expect(row.find(TableCell).at(0).render().text()).toBe('SUN');
                expect(row.find(TableCell).at(1).render().text()).toBe("MON");
                expect(row.find(TableCell).at(2).render().text()).toBe("TUE");
                expect(row.find(TableCell).at(3).render().text()).toBe("WED");
                expect(row.find(TableCell).at(4).render().text()).toBe("THU");
                expect(row.find(TableCell).at(5).render().text()).toBe("FRI");
                expect(row.find(TableCell).at(6).render().text()).toBe("SAT");
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