import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";

export default class CreateSupervisorDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      supervisorid: "",
      supervisorname: "",
      researchfield: "",
      email: "", 
           
    };
  }



  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      supervisorid,
      supervisorname,
      researchfield,
      email,  
    } = this.state;

    const data = {
      supervisorid: supervisorid,
      supervisorname:supervisorname,
      researchfield:researchfield,
      email:email, 
    };

    console.log(data);

    axios.post("https://rpmt-server.herokuapp.com/supervisor/save", data).then((res) => {
      if (res.data.success) {
        swal("Supervisor Details Added Successfully", "", "success")
        .then((value)=>{
        window.location = "/supervisor/view"
      });

          this.setState({
            supervisorid: "",
            supervisorname: "",
            researchfield: "",
            email: "",  
          });
      }
    });
  };
  
  
  
  
  render() {
    
    return (
      
      <div className="container px-5 my-3">
         <br />
        <AdminNavBar />
        <br />
        &nbsp;
        <h2>Add Supervisor Details</h2>
        <hr />
      <div className="container border border-dark bg-light mt-5 ">
        <div className="form-group row">
          <div className="col-lg-12 margin-tb">
            <div className="float-left">
             <br/>
            </div>
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Supervisor ID :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter supervisor id -Sxx"
                    name="supervisorid"
                    pattern="[S]+[0-9]{2}"
                    title="Supervisor ID is Invalid"
                    value={this.state.supervisorid}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Supervisor Name :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter supervisor name"
                    name="supervisorname"
                    value={this.state.supervisorname}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Research Field :</strong>             
                      <select
                        className="form-control"
                        name="researchfield"
                        value={this.state.researchfield}
                        onChange={this.handleChange}
                      >
                        <option value="Not">Not Selected</option>
                        <option value="Artificial Intelligence and Machine Learning">Artificial Intelligence and Machine Learning </option>
                        <option value="Elearning and Education">Elearning and Education</option>
                        <option value="Distributed and Parallel Computing">Distributed and Parallel Computing </option>
                        <option value="Information Security">Information Security </option>
                        <option value="Robotic and Intelligent Systems">Robotic and Intelligent Systems </option>
   
                      </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Email :</strong>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email "
                    name="email"
                    pattern ="[a-zA-Z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="col-md-12">
              <div className="form-group">
                <button
                  className="btn btn-outline-primary"
                  type="submit"                 
                >
                  &nbsp;<i className="fa fa-save"> Save </i>
                </button>
              </div>
            </div>
            &nbsp;
          </form>
        </div>
      </div>
    );
  }
}
