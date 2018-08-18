import React from "react";
import {mount} from "enzyme";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppointmentDialog from "../AppointmentDialog";

describe('AppointmentDialog', () => {
    let wrapper,
        mockHandleDelete,
        mockHandleChange,
        mockHandleSave,
        mockHandleClose,
        mockHandleCancel;

    beforeEach(() => {
        mockHandleDelete = jest.fn();
        mockHandleChange = jest.fn();
        mockHandleSave = jest.fn();
        mockHandleClose = jest.fn();
        mockHandleCancel = jest.fn();

        wrapper = mount(<AppointmentDialog appointmentDialogOpen={true}
                                           appointmentDate=""
                                           appointmentTime=""
                                           appointmentDescription=""
                                           handleDelete={mockHandleDelete}
                                           handleClose={mockHandleClose}
                                           handleChange={mockHandleChange}
                                           handleCancel={mockHandleCancel}
                                           handleSave={mockHandleSave}/>);
    });

    describe('render', () => {
        it('dialog component', () => {
            expect(wrapper.find(Dialog).length).toEqual(1);
            expect(wrapper.find(Dialog).prop('open')).toEqual(true);
            expect(wrapper.find(Dialog).prop('onClose')).toEqual(mockHandleClose);
            expect(wrapper.find(Dialog).prop('aria-labelledby')).toEqual("form-dialog-title");
        });

        it('dialog content', () => {
            expect(wrapper.find(DialogContent).length).toEqual(1);
        });

        it('dialog title', () => {
            expect(wrapper.find(DialogTitle).length).toEqual(1);
        });

        it('appointment date text field', () => {
            wrapper.setProps({
                appointmentDate: "someDate"
            });

            let appointmentDateTextField = wrapper.find('#date').at(0);
            expect(appointmentDateTextField.length).toEqual(1);
            expect(appointmentDateTextField.prop('label')).toEqual('Appointment Date');
            expect(appointmentDateTextField.prop('disabled')).toEqual(false);
            expect(appointmentDateTextField.prop('type')).toEqual('date');
            expect(appointmentDateTextField.prop('value')).toEqual('someDate');
        });

        it('appointment time text field', () => {
            wrapper.setProps({
                appointmentTime: "someTime"
            });

            let appointmentTimeTextField = wrapper.find('#time').at(0);
            expect(appointmentTimeTextField.length).toEqual(1);
            expect(appointmentTimeTextField.prop('label')).toEqual('Appointment Time');
            expect(appointmentTimeTextField.prop('type')).toEqual('time');
            expect(appointmentTimeTextField.prop('value')).toEqual('someTime');
        });

        it('description text field', () => {
            wrapper.setProps({
                appointmentDescription: "someDescription"
            });

            let appointmentDescriptionTextField = wrapper.find('#description').at(0);
            expect(appointmentDescriptionTextField.length).toEqual(1);
            expect(appointmentDescriptionTextField.prop('label')).toEqual('Description');
            expect(appointmentDescriptionTextField.prop('multiline')).toEqual(true);
            expect(appointmentDescriptionTextField.prop('rowsMax')).toEqual('4');
            expect(appointmentDescriptionTextField.prop('value')).toEqual('someDescription');
        });

        it('dialog actions', () => {
            expect(wrapper.find(DialogActions).length).toEqual(1);
        });

        it('two buttons', () => {
            expect(wrapper.find(Button).length).toEqual(2);
        });

        it('save button', () => {
            let saveButton = wrapper.find(Button).at(0);
            expect(saveButton.prop('onClick')).toEqual(mockHandleSave);
            expect(saveButton.prop('color')).toEqual("primary");
            expect(saveButton.render().text()).toEqual("Save");
        });

        it('cancel button', () => {
            let cancelButton = wrapper.find(Button).at(1);
            expect(cancelButton.prop('onClick')).toEqual(mockHandleCancel);
            expect(cancelButton.prop('color')).toEqual("primary");
            expect(cancelButton.render().text()).toEqual("Cancel");
        });
    });

    describe.skip('text fields', () => {
        it('appointment date calls handle change when text value is changed', () => {
            wrapper.find("#date").at(0).simulate('change');

            expect(mockHandleChange).toBeCalledWith("appointmentDate");
        });

        it('appointment time calls handle change when text value is changed', () => {
            wrapper.find("#time").at(0).simulate('change');

            expect(mockHandleChange).toBeCalledWith("appointmentTime");
        });

        it('appointment description calls handle change when text value is changed', () => {
            wrapper.find("#description").at(0).simulate('change');

            expect(mockHandleChange).toBeCalledWith("appointmentDescription");
        });
    });

    describe('dialog buttons', () => {
        it('save button on click calls handle save', () => {
            let saveButton = wrapper.find(Button).at(0);

            saveButton.simulate('click');

            expect(mockHandleSave).toBeCalled();
        });

        it('cancel button on click calls handle cancel', () => {
            let cancelButton = wrapper.find(Button).at(1);

            cancelButton.simulate('click');

            expect(mockHandleCancel).toBeCalled();
        });
    });

    describe('edit appointment', () => {
        beforeEach(() => {
            wrapper.setProps({
                appointmentAction: "edit"
            });
        });

        it('renders delete button', () => {
            let deleteButton = wrapper.find("#delete").at(0);

            expect(deleteButton.length).toEqual(1);
            expect(deleteButton.prop('onClick')).toEqual(mockHandleDelete);
            expect(deleteButton.prop('color')).toEqual("primary");
            expect(deleteButton.render().text()).toEqual("Delete");
        });

        it('renders edit dialog title', () => {
            expect(wrapper.find(DialogTitle).render().text()).toEqual("Edit Appointment");
        });

        it('disables date text field', () => {
            let appointmentDateTextField = wrapper.find('#date');
            expect(appointmentDateTextField.at(0).prop('disabled')).toEqual(true);
        });
    });
});