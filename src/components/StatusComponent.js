import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent.js';

const fineRate = 1;
let totalFine = 0;
const allowedDays = 30;
function RenderIssue({ issue, i, acceptBook, rejectBook }) {
    const dates = [];
    const today = new Date();
    dates.push(today);
    const issueDate = new Date(Date.parse(issue.createdAt));
    const deadline = new Date(Date.parse(issue.createdAt));
    deadline.setDate(deadline.getDate() + 30);
    dates.push(deadline);
    const statusDate = issue.accepted ? new Date(Date.parse((issue.updatedAt))) : (new Date(Math.min.apply(null, dates)));
    let fine = 0;
    if (((statusDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24)) > allowedDays) {
        fine = Math.floor((statusDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24)) * fineRate;
    }
    totalFine += fine;
    return (
        <React.Fragment>
            <td>
                {i}
            </td>
            <td>
                <Link to={`/users/${issue.student._id}`}>
                    {issue.student.firstname + ' ' + issue.student.lastname}
                </Link>
            </td>
            <td>
                {issue.student.roll}
            </td>
            <td>
                {issue.book == null ? "N/A" : <Link to={`/books/${issue.book._id}`}>
                    {issue.book.name}
                </Link>}
            </td>
            <td>
                {issue.book == null ? "N/A" : issue.book.isbn}
            </td>
            <td>
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(issue.createdAt)))}
            </td>
            {/* <td>
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(deadline)}
            </td> */}
            {/* <td>
                {
                    fine
                }
            </td> */}
            <td>
                <Button color="info" onClick={() => {
                    acceptBook(issue._id, "true");
                }}>Accept</Button>
            </td>
            <td>
                <Button color="info" onClick={() => {
                    rejectBook(issue._id, "false");
                }}>Reject</Button>
            </td>
        </React.Fragment>
    );
}

class Status extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.i = 1;
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.props.issues,"IIIIIIIIIIIIII")
    }

    render() {
        console.log(this.props.issues);
        if (this.props.issues.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.issues.errMess) {
            return (
                <div className="container loading">
                    <div className="row heading">
                        <div className="col-12">
                            <br /><br /><br /><br />
                            <h3>{this.props.errMess}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.props.issues.issues.length === 0) {
            return (
                <div className="container loading">
                    <div className="row heading">
                        <div className="col-12 text-center">
                            <br /><br /><br /><br />
                            <h4>{'No Books has been requested.'}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            const dueIssues = this.props.issues.issues.filter((issue)=>(issue.accepted==null && !issue.returned));
            const list = dueIssues.map((issue) => {
                return (
                    <tr key={issue._id}>
                        <RenderIssue issue={issue}
                            i={this.i++}
                            acceptBook={this.props.statusIssue}
                            rejectBook={this.props.statusIssue}
                        />
                    </tr>
                );
            });

            return (

                <div className="container mt-6 text-center align-self-center full">
                    <div className="row text-center justify-content-center">
                        <div className="col-12 heading">
                            <h3>List of books for Approval / Rejection</h3>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Name of Student</th>
                                        <th>Roll No.</th>
                                        <th>Name of Book</th>
                                        <th>ISBN number</th>
                                        <th>Issue Date</th>
                                        <th>Accept</th>
                                        <th>Reject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list}
                                </tbody>
                            </Table>
                            <br />
                            {/* <h6> Total Fine due (if all pending books are returned today) : Rs. {totalFine} </h6> */}
                            <br />
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default Status;