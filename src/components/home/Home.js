import React, {Component} from 'react';

export default class App extends Component {
    renderMonth = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date();

        return (<div>
            {monthNames[date.getMonth()] + " " + date.getFullYear()}
        </div>)
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
                    <tr>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                    </tr>
                    <tr>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                    </tr>
                    <tr>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                    </tr>
                    <tr>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                    </tr>
                    <tr>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                        <td>day</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}