import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import swal from "sweetalert";
const serverUrl = "https://rpmt-server.herokuapp.com";

export default class ViewNotice_Admin extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          notices: [],
        };
      }
    
      componentDidMount() {
        this.retrieveNotice();
      }
    
      retrieveNotice() {
        axios.get(`${serverUrl}/notice/getAll`).then((res) => {
          if (res.data.success) {
            this.setState({
              notices: res.data.exsitingNotices,
            });
            //console.log(this.state.documentTemp);
          }
        });
      }
    
      // To delete data
      onDelete = (id) => {
        swal({
          title: "Are you sure?",
          text: "Delete this Notice",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
              .delete(`${serverUrl}/notice/delete/${id}`)
              .then((res) => {
                swal("Deleted Successfull!", {
                  icon: "success",
                });
    
                setTimeout(() => {
                  this.retrieveNotice();
                }, 1000);
              });
          } else {
          }
        });
      };
    
      render() {
        return (
          <div className="container">
            <br />
            <AdminNavBar />
            <br />
            <h4>Notice Management</h4>
            <hr />
    
            <div className="container">
              <div className="container">
                  <a className="btn btn-success m-2" href="/add/notice">
                    Add Notice
                  </a>
              </div>
    
              <br/>
    
              <div className="container p-3 mb-2 bg-light text-dark">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Notice Title</th>
                      <th scope="col">Notice Message</th>
                      <th scope="col">To</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.notices.map((notice, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{notice.noticeTitle}</td>
                        <td>{notice.noticeMessage}</td>
                        <td>{notice.to}</td>
                        <td>
                          <a
                            className="btn btn-outline-success"
                            href={`#`}
                          >
                            Update
                          </a>
                        </td>
                        <td>
                          <a
                            className="btn btn-outline-danger"
                            onClick={() => this.onDelete(notice._id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
}
