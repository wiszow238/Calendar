import React from "react";
import {shallow} from "enzyme";
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

        wrapper = shallow(<AppointmentDialog appointmentDialogOpen={true}
                                             handleDelete={mockHandleDelete}
                                             handleClose={mockHandleClose}
                                             handleChange={mockHandleChange}
                                             handleCancel={mockHandleCancel}
                                             handleSave={mockHandleSave}/>);
    });

    describe('render', () => {
        it('dialog component', () => {
            expect(wrapper.find(Dialog).length).toBe(1);
            expect(wrapper.find(Dialog).prop('open')).toBe(true);
            expect(wrapper.find(Dialog).prop('onClose')).toBe(mockHandleClose);
            expect(wrapper.find(Dialog).prop('aria-labelledby')).toBe("form-dialog-title");
        });

        it('dialog content', () => {
            expect(wrapper.find(DialogContent).length).toBe(1);
        });

        it('dialog title', () => {
            expect(wrapper.find(DialogTitle).length).toBe(1);
        });

        it('appointment date text field', () => {
            wrapper.setProps({
                appointmentDate: "someDate"
            });

            let appointmentDateTextField = wrapper.find('#date');
            expect(appointmentDateTextField.length).toBe(1);
            expect(appointmentDateTextField.prop('label')).toBe('Appointment Date');
            expect(appointmentDateTextField.prop('disabled')).toBe(false);
            expect(appointmentDateTextField.prop('type')).toBe('date');
            expect(appointmentDateTextField.prop('value')).toBe('someDate');
        });

        it('appointment time text field', () => {
            wrapper.setProps({
                appointmentTime: "someTime"
            });

            let appointmentTimeTextField = wrapper.find('#time');
            expect(appointmentTimeTextField.length).toBe(1);
            expect(appointmentTimeTextField.prop('label')).toBe('Appointment Time');
            expect(appointmentTimeTextField.prop('type')).toBe('time');
            expect(appointmentTimeTextField.prop('value')).toBe('someTime');
        });

        it('description text field', () => {
            wrapper.setProps({
                appointmentDescription: "someDescription"
            });

            let appointmentDescriptionTextField = wrapper.find('#description');
            expect(appointmentDescriptionTextField.length).toBe(1);
            expect(appointmentDescriptionTextField.prop('label')).toBe('Description');
            expect(appointmentDescriptionTextField.prop('multiline')).toBe(true);
            expect(appointmentDescriptionTextField.prop('rowsMax')).toBe('4');
            expect(appointmentDescriptionTextField.prop('value')).toBe('someDescription');
        });

        it('dialog actions', () => {
            expect(wrapper.find(DialogActions).length).toBe(1);
        });

        it('two buttons', () => {
            expect(wrapper.find(Button).length).toBe(2);
        });

        it('save button', () => {
            let saveButton = wrapper.find(Button).at(0);
            expect(saveButton.prop('onClick')).toBe(mockHandleSave);
            expect(saveButton.prop('color')).toBe("primary");
            expect(saveButton.render().text()).toBe("Save");
        });

        it('cancel button', () => {
            let cancelButton = wrapper.find(Button).at(1);
            expect(cancelButton.prop('onClick')).toBe(mockHandleCancel);
            expect(cancelButton.prop('color')).toBe("primary");
            expect(cancelButton.render().text()).toBe("Cancel");
        });
    });

    describe('text fields', () => {
        it('appointment date calls handle change when text value is changed', () => {
            wrapper.find("#date").simulate('change');

            expect(mockHandleChange).toBeCalledWith("appointmentDate");
        });

        it('appointment time calls handle change when text value is changed', () => {
            wrapper.find("#time").simulate('change');

            expect(mockHandleChange).toBeCalledWith("appointmentTime");
        });

        it('appointment description calls handle change when text value is changed', () => {
            wrapper.find("#description").simulate('change');

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
            let deleteButton = wrapper.find("#delete");

            expect(deleteButton.length).toBe(1);
            expect(deleteButton.prop('onClick')).toBe(mockHandleDelete);
            expect(deleteButton.prop('color')).toBe("primary");
            expect(deleteButton.render().text()).toBe("Delete");
        });

        it('renders edit dialog title', () => {
            expect(wrapper.find(DialogTitle).render().text()).toBe("Edit Appointment");
        });

        it('disables date text field', () => {
            let appointmentDateTextField = wrapper.find('#date');
            expect(appointmentDateTextField.prop('disabled')).toBe(true);
        });
    });
});