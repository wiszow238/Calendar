import React from "react";
import {mount, shallow} from "enzyme";
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
import Button from "@material-ui/core/Button";

describe('Home', () => {
    let wrapper;
    const fixedDate = new Date(2018, 2, 20);
    const fixedDate2 = new Date(2018, 2, 1);
    const realDate = Date;

    it('initial state', () => {
        wrapper = shallow(<Home/>).dive();

        expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
        expect(wrapper.instance().state.appointmentDialogOpen).toEqual(false);
        expect(wrapper.instance().state.appointments).toEqual(new Map());
        expect(wrapper.instance().state.appointmentAction).toEqual("");
        expect(wrapper.instance().state.appointmentDate).toEqual("");
        expect(wrapper.instance().state.appointmentTime).toEqual("");
        expect(wrapper.instance().state.appointmentDescription).toEqual("");
        expect(wrapper.instance().state.errorMessage).toEqual("");
        expect(wrapper.instance().state.displayMonth).toBeDefined();
    });

    describe('renders', () => {
        let table;

        beforeEach(() => {
            wrapper = mount(<Home/>);
            table = wrapper.find(Table);
        });

        it('paper card', () => {
            expect(wrapper.find(Paper).length).toEqual(1);
        });

        it('main calendar table', () => {
            expect(table.length).toEqual(1);
        });

        it('month row', () => {
            let thead = table.find(TableHead);

            expect(thead.length).toEqual(1);
            expect(thead.find(TableRow).length).toEqual(1);
            expect(thead.find(TableCell).length).toEqual(3);
            expect(thead.find(TableCell).at(1).prop("colSpan")).toEqual("5");
        });

        it('previous month button', () => {
            let thead = table.find(TableHead);

            expect(thead.find(Button).at(0).length).toEqual(1);
            expect(thead.find(Button).at(0).text()).toEqual("Previous Month");
        });

        it('next month button', () => {
            let thead = table.find(TableHead);

            expect(thead.find(Button).at(1).length).toEqual(1);
            expect(thead.find(Button).at(1).text()).toEqual("Next Month");
        });

        it('correct month and year', () => {
            const monthLabels = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let date = new Date();
            wrapper.setState({
                displayMonth: date
            });

            let thead = wrapper.find(TableHead);

            let expectedDate = monthLabels[date.getMonth()] + " " + date.getFullYear();
            expect(thead.find(TableCell).at(1).text()).toEqual(expectedDate);
        });

        it('warning dialog', () => {
            expect(wrapper.find(WarningDialog).length).toEqual(1);
        });

        it('appointment dialog', () => {
            expect(wrapper.find(AppointmentDialog).length).toEqual(1);
        });

        describe('week rows', () => {
            it('correct day labels', () => {
                let row = table.find(TableBody).find(TableRow).at(0);

                expect(row.find(TableCell).at(0).text()).toEqual('SUN');
                expect(row.find(TableCell).at(1).text()).toEqual("MON");
                expect(row.find(TableCell).at(2).text()).toEqual("TUE");
                expect(row.find(TableCell).at(3).text()).toEqual("WED");
                expect(row.find(TableCell).at(4).text()).toEqual("THU");
                expect(row.find(TableCell).at(5).text()).toEqual("FRI");
                expect(row.find(TableCell).at(6).text()).toEqual("SAT");
            });

            it('correct number of weeks', () => {
                expect(table.find(Week).length).toEqual(5);
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

                wrapper = mount(<Home/>);

                let week = wrapper.find(Week).at(0);

                expect(week.prop('date')).toEqual("Sun Feb 25 2018");
                expect(wrapper.find(Week).at(1).prop('date')).toEqual("Sun Mar 04 2018");
                expect(wrapper.find(Week).at(2).prop('date')).toEqual("Sun Mar 11 2018");
                expect(wrapper.find(Week).at(3).prop('date')).toEqual("Sun Mar 18 2018");
                expect(wrapper.find(Week).at(4).prop('date')).toEqual("Sun Mar 25 2018");

                global.Date = realDate;
            });
        });
    });

    describe('functions', () => {
        beforeEach(() => {
            wrapper = shallow(<Home/>).dive();
        });

        it('resetDialogState clears dialog information', () => {
            wrapper.setState({
                warningDialogOpen: true,
                appointmentDialogOpen: true,
                appointmentAction: "someAction",
                appointmentDate: "someDate",
                appointmentTime: "someTime",
                appointmentDescription: "someDesc",
                errorMessage: "someMessage"
            });

            wrapper.instance().resetDialogState();

            expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentAction).toEqual("");
            expect(wrapper.instance().state.appointmentDate).toEqual("");
            expect(wrapper.instance().state.appointmentTime).toEqual("");
            expect(wrapper.instance().state.appointmentDescription).toEqual("");
            expect(wrapper.instance().state.errorMessage).toEqual("");
        });

        describe('handleClickOpen', () => {
            it('appointmentExists -> setWarningStateToTrue', () => {
                wrapper.setState({
                    appointments: new Map([["2018-03-20", ""]])
                });

                wrapper.instance().handleClickOpen("03/20/2018");

                expect(wrapper.instance().state.warningDialogOpen).toEqual(true);
                expect(wrapper.instance().state.appointmentDialogOpen).toEqual(false);
                expect(wrapper.instance().state.appointmentAction).toEqual("save");
                expect(wrapper.instance().state.appointmentDate).toEqual("2018-03-20");
            });

            it('appointmentDoesNotExist -> setWarningStateToFalse', () => {
                wrapper.instance().handleClickOpen("03/20/2018");

                expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
                expect(wrapper.instance().state.appointmentDialogOpen).toEqual(true);
                expect(wrapper.instance().state.appointmentAction).toEqual("save");
                expect(wrapper.instance().state.appointmentDate).toEqual("2018-03-20");
            });
        });

        it('handleEditClick gets appointment and sets action to edit', () => {
            wrapper.setState({
                appointments: new Map([["2018-03-20", {time: "1:12", description: "some desc"}]])
            });

            wrapper.instance().handleEditClick("2018-03-20");

            expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentDialogOpen).toEqual(true);
            expect(wrapper.instance().state.appointmentAction).toEqual("edit");
            expect(wrapper.instance().state.appointmentDate).toEqual("2018-03-20");
            expect(wrapper.instance().state.appointmentTime).toEqual("1:12");
            expect(wrapper.instance().state.appointmentDescription).toEqual("some desc");
        });

        describe('handleSave', () => {
            it('invalid appointment date -> sets errors state', () => {
                wrapper.setState({appointmentDate: "invalid"});

                wrapper.instance().handleSave();

                expect(wrapper.instance().state.errorMessage).toEqual("Invalid date entered");
            });

            it('empty appointment date -> sets errors state', () => {
                wrapper.setState({appointmentDate: ""});

                wrapper.instance().handleSave();

                expect(wrapper.instance().state.errorMessage).toEqual("Invalid date entered");
            });

            it('appointment date is in the past -> sets errors state', () => {
                wrapper.setState({appointmentDate: "2000-03-20"});

                wrapper.instance().handleSave();

                expect(wrapper.instance().state.errorMessage).toEqual("You can not create a new \n appointment that is in the past.");
            });

            it('appointment date is valid -> saves appointment and resets dialog settings', () => {
                wrapper.setState({
                    appointmentDate: "2100-03-20",
                    appointmentTime: "1:23",
                    appointmentDescription: "someDesc"
                });

                wrapper.instance().handleSave();

                expect(wrapper.instance().state.errorMessage).toEqual("");
                expect(wrapper.instance().state.appointments.has("2100-03-20")).toEqual(true);
                expect(wrapper.instance().state.appointments.get("2100-03-20").time).toEqual("1:23");
                expect(wrapper.instance().state.appointments.get("2100-03-20").description).toEqual("someDesc");

                expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
                expect(wrapper.instance().state.appointmentDialogOpen).toEqual(false);
                expect(wrapper.instance().state.appointmentAction).toEqual("");
                expect(wrapper.instance().state.appointmentDate).toEqual("");
                expect(wrapper.instance().state.appointmentTime).toEqual("");
                expect(wrapper.instance().state.appointmentDescription).toEqual("");
                expect(wrapper.instance().state.errorMessage).toEqual("");
            });
        });

        it('handleCancel resets dialog settings', () => {
            wrapper.instance().handleCancel();

            expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentAction).toEqual("");
            expect(wrapper.instance().state.appointmentDate).toEqual("");
            expect(wrapper.instance().state.appointmentTime).toEqual("");
            expect(wrapper.instance().state.appointmentDescription).toEqual("");
            expect(wrapper.instance().state.errorMessage).toEqual("");
        });

        it('handleDelete deletes appointment from state and resets dialog settings', () => {
            wrapper.setState({
                appointments: new Map([["2018-03-20", ""]]),
                appointmentDate: "2018-03-20"
            });

            wrapper.instance().handleDelete();

            expect(wrapper.instance().state.appointments.has("2018-03-20")).toEqual(false);
            expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentAction).toEqual("");
            expect(wrapper.instance().state.appointmentDate).toEqual("");
            expect(wrapper.instance().state.appointmentTime).toEqual("");
            expect(wrapper.instance().state.appointmentDescription).toEqual("");
            expect(wrapper.instance().state.errorMessage).toEqual("");
        });

        it('handleWarningYes sets correct state', () => {
            wrapper.setState({
                warningDialogOpen: true,
                appointmentDialogOpen: false,
                appointmentTime: "value",
                appointmentDescription: "value"
            });

            wrapper.instance().handleWarningYes();

            expect(wrapper.instance().state.warningDialogOpen).toEqual(false);
            expect(wrapper.instance().state.appointmentDialogOpen).toEqual(true);
            expect(wrapper.instance().state.appointmentTime).toEqual("");
            expect(wrapper.instance().state.appointmentDescription).toEqual("");
        });

        it('handleChange sets state given parameters', () => {
            wrapper.setState({
                stateName: ""
            });

            wrapper.instance().handleChange("stateName", {target: {value: "someValue"}});

            expect(wrapper.instance().state.stateName).toEqual("someValue");
        });

        it('handleNextMonthClick sets the current month to next month in state', () => {
            wrapper.setState({
                displayMonth: new Date("01/01/2018")
            });

            wrapper.instance().handleNextMonthClick();

            expect(wrapper.instance().state.displayMonth).toEqual(new Date("02/01/2018"));
        });

        it('handlePrevMonthClick sets the current month to previous month in state', () => {
            wrapper.setState({
                displayMonth: new Date("02/01/2018")
            });

            wrapper.instance().handlePrevMonthClick();

            expect(wrapper.instance().state.displayMonth).toEqual(new Date("01/01/2018"));
        });

        it('getStartOfWeek returns the start of the week given the passed in date', () => {
            let returnValue = wrapper.instance().getStartOfWeek("08/17/2018");

            expect(returnValue).toEqual(new Date("08/12/2018"));
        });

        it('getStartOfWeek returns current date when passed in date is start of week', () => {
            let returnValue = wrapper.instance().getStartOfWeek("08/19/2018");

            expect(returnValue).toEqual(new Date("08/19/2018"));
        });
    });
});