import React from "react";
import {shallow} from "enzyme";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningDialog from "../WarningDialog";

describe('WarningDialog', () => {
    let wrapper,
        mockHandleClose,
        mockHandleWarningYes,
        mockHandleCancel;

    beforeEach(() => {
        mockHandleClose = jest.fn();
        mockHandleWarningYes = jest.fn();
        mockHandleCancel = jest.fn();

        wrapper = shallow(<WarningDialog warningDialogOpen={true}
                                         handleClose={mockHandleClose}
                                         handleWarningYes={mockHandleWarningYes}
                                         handleCancel={mockHandleCancel}/>);
    });

    describe('render', () => {
        it('dialog component', () => {
            expect(wrapper.find(Dialog).length).toBe(1);
            expect(wrapper.find(Dialog).prop('open')).toBe(true);
            expect(wrapper.find(Dialog).prop('onClose')).toBe(mockHandleClose);
            expect(wrapper.find(Dialog).prop('aria-labelledby')).toBe("form-dialog-title");
        });

        it('dialog title', () => {
            expect(wrapper.find(DialogTitle).length).toBe(1);
            expect(wrapper.find(DialogTitle).render().text()).toBe("Warning!");
        });

        it('dialog content', () => {
            expect(wrapper.find(DialogContent).length).toBe(1);
            expect(wrapper.find(DialogContent).render().text()).toBe("An appointment exists for this date. " +
                "Are you sure you want to continue and override the existing appointment?");
        });

        it('dialog actions', () => {
            expect(wrapper.find(DialogActions).length).toBe(1);
        });

        it('two buttons', () => {
            expect(wrapper.find(Button).length).toBe(2);
        });

        it('yes button', () => {
            let yesButton = wrapper.find(Button).at(0);
            expect(yesButton.prop('onClick')).toBe(mockHandleWarningYes);
            expect(yesButton.prop('color')).toBe("primary");
            expect(yesButton.render().text()).toBe("Yes");
        });

        it('no button', () => {
            let noButton = wrapper.find(Button).at(1);
            expect(noButton.prop('onClick')).toBe(mockHandleCancel);
            expect(noButton.prop('color')).toBe("primary");
            expect(noButton.render().text()).toBe("No");
        });
    });

    describe('buttons', () => {
        it('yes button on click calls hande warning yes', () => {
            let yesButton = wrapper.find(Button).at(0);

            yesButton.simulate('click');

            expect(mockHandleWarningYes).toBeCalled();
        });

        it('no button on click calls handle cancel', () => {
            let noButton = wrapper.find(Button).at(1);

            noButton.simulate('click');

            expect(mockHandleCancel).toBeCalled();
        });
    });
});