import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Label, CardText, Button, Modal, ModalBody, ModalHeader, FormGroup } from 'reactstrap';
import Loading from './LoadingComponent';
import { Control, LocalForm, Errors, Redirect } from 'react-redux-form';
import { NavLink,Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditModalOpen: false,
        }
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    toggleEditModal() {
        this.setState({ isEditModalOpen: !this.state.isEditModalOpen });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
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
        else
            return (

                <div className="container mt-6 home text-center align-self-center">
                    <div className="row text-center justify-content-center">

                        <Card className="heading">

                            <CardHeader><h3>User Details</h3></CardHeader>
                            <CardBody>
                                <CardText>
                                    <h5> First Name : {'          ' + this.props.user.firstname}</h5>
                                    <h5> Last Name : {'          ' + this.props.user.lastname}</h5>
                                    <h5> {(this.props.user.admin) ? 'Admin Id : ' : 'Roll No.'} : {'          ' + this.props.user.roll}</h5>
                                    <h5> Email : {'          ' + this.props.user.email}</h5>
                                    <h5> Username : {'          ' + this.props.user.username}</h5>
                                </CardText>
                                <Button color="info" onClick={this.toggleEditModal}>Edit &nbsp;{'   '}<span className="fa fa-pencil" /></Button>
                            </CardBody>
                        </Card>
                    </div>
                    <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal}>
                        <ModalHeader toggle={this.toggleEditModal}>
                            Edit Profile
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm model="user" onSubmit={(values) => {
                                console.log(values,this.props,"VVVVVVVVVVVV");
                                this.toggleEditModal();
                                this.props.editUser(this.props.user._id, values.firstname,
                                values.lastname, values.roll, values.email, this.props.userss);
                                // window.location.reload(false);
                            }}>
                                <FormGroup>
                                    <Label htmlFor="firstname">First Name</Label>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        className="form-control" defaultValue={this.props.user.firstname}
                                        placeholder="firstname"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(20) }} />
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                        required: 'Required',
                                        minLength: ' Must be greater than 2 characters', maxLength: ' Must be 20 characters or less'
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        className="form-control" defaultValue={this.props.user.lastname}
                                        placeholder="lastname" validators={{ required, minLength: minLength(3), maxLength: maxLength(20) }} />
                                    <Errors className="text-danger" model=".lastname" show="touched" messages={{
                                        required: 'Required',
                                        minLength: ' Must be greater than 2 characters', maxLength: ' Must be 20 characters or less'
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="roll">Roll No.</Label>
                                    <Control.text model=".roll" id="roll" name="roll"
                                        className="form-control" defaultValue={this.props.user.roll}
                                        placeholder="roll" validators={{ required, minLength: minLength(3), maxLength: maxLength(12) }} />
                                    <Errors className="text-danger" model=".roll" show="touched" messages={{
                                        required: 'Required',
                                        minLength: ' Must be greater than 2 characters', maxLength: ' Must be 12 characters or less'
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">E-mail</Label>
                                    <Control.text model=".email" id="email" name="email"
                                        defaultValue={this.props.user.email}
                                        className="form-control" placeholder="email" validators={{ required, validEmail }} />
                                    <Errors className="text-danger" model=".email" show="touched" messages={{
                                        required: 'Required',
                                        validEmail: ' Enter a valid email'
                                    }} />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>

                    </Modal>
                </div>
            );
    }

}

export default UserDetail;