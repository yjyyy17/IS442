import React , { Component } from 'react' ;
import userService from '../services/userService';

class ListUserComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: []
        }

    }

    componentDidMount(){
        userService.getUsers().then((res) => {
            this.setState({users: res.data});
            console.log(res.data)
        });
    }


    render(){
        return (
            <div >
                <h2 className="text-center">Users List</h2>
                <div className="row" > 
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>User ID </th>
                                <th>Email </th>
                                <th>Name </th>
                                <th>Phone Number </th>
                                <th>Password </th>


                            </tr>
                        </thead>

                        <tbody > 
                            {
                                this.state.users.map(
                                    user =>  
                                    <tr key = {user.userId}>
                                        <td> {user.email} </td>
                                        <td> {user.name} </td>
                                        <td> {user.phoneNo} </td>
                                        <td> {user.password} </td>


                                    </tr>
                                )

                            }
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}
export default ListUserComponent