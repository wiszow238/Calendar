import React, {Component} from 'react';
import Week from "../week/week";

export default class Home extends Component {
    renderMonth = () => {
        const monthLabels = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date();

        return (<div>
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
            weeks.push(<Week date={startOfWeek.toDateString()}/>);
            startOfWeek.setDate(startOfWeek.getDate() + 7);
        }

        return weeks;
    };

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <td colSpan="7">{this.renderMonth()}</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SUN</td>
                    <td>MON</td>
                    <td>TUE</td>
                    <td>WED</td>
                    <td>THU</td>
                    <td>FRI</td>
                    <td>SAT</td>
                </tr>
                {this.renderDays()}
                </tbody>
            </table>
        );
    }
}