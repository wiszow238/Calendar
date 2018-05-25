import React, {Component} from 'react';
import Week from "../week/week";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Home extends Component {
    renderMonth = () => {
        const monthLabels = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date();

        return (<div className="month-header">
            {monthLabels[date.getMonth()] + " " + date.getFullYear()}
        </div>)
    };

    getStartOfWeek = (d) => {
        let date = new Date(d);
        let day = date.getDay();
        let diff = date.getDate() - day + (day === 0 ? -6 : 0);
        return new Date(date.setDate(diff));
    };

    renderDays = () => {
        let currentDate = new Date();
        let startOfWeek = this.getStartOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

        let weeks = [];
        for (let weekNumber = 0; weekNumber < 5; weekNumber++) {
            weeks.push(<Week key={weekNumber} date={startOfWeek.toDateString()}/>);
            startOfWeek.setDate(startOfWeek.getDate() + 7);
        }

        return weeks;
    };

    render() {
        return (
            <Paper className="root">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan="7">{this.renderMonth()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>SUN</TableCell>
                            <TableCell>MON</TableCell>
                            <TableCell>TUE</TableCell>
                            <TableCell>WED</TableCell>
                            <TableCell>THU</TableCell>
                            <TableCell>FRI</TableCell>
                            <TableCell>SAT</TableCell>
                        </TableRow>
                        {this.renderDays()}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}