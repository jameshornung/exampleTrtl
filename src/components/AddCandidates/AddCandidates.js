import React, { Component } from 'react';
import './style.css';

const axios = require('axios');


class AddCandidates extends Component {
  constructor(props) {
    super(props);

    this.state = 
    {
      firstName: '',
      lastName: '',
      university: '',
      status: '',
    };

    this.addFirstName = this.addFirstName.bind(this);
    this.addLastName = this.addLastName.bind(this);
    this.addUniversity = this.addUniversity.bind(this);
    this.addStatus = this.addStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  addLastName(event) {
    this.setState({lastName: event.target.value});
  }

  addUniversity(event) {
    this.setState({university: event.target.value});
  }

  addStatus(event) {
    this.setState({status: event.target.value});
  }

  handleSubmit(event) {
    // alert('Candidate Added: ' + this.state.firstName + " " + this.state.lastName);
    // event.preventDefault();
    axios({
      method: 'post',
      url: '/submit',
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        university: this.state.university,
        status: this.state.status
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" value={this.firstName} onChange={this.addFirstName} />
        </label>
        <label>
          Last Name:
          <input type="text" value={this.lastName} onChange={this.addLastName} />
        </label>
        <label>
          University:
          <select value={this.university} onChange={this.addUniversity}>
            <option>Berkeley</option>
            <option>Rutgers</option>
            <option>Texas</option>
          </select>
        </label>
        <label>
          Status:
          <select value={this.status} onChange={this.addStatus}>
            <option>Pending HR</option>
            <option>Pending Tech</option>
            <option>Pending Final</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddCandidates;




  


