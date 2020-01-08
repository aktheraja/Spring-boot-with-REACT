import React, {Component} from 'react';
import './App.css';
import getAllStudents from "./client";
import {Table,Avatar,Spin,Icon} from 'antd';
import Container from "./Container";

const antIcon = ()=>(<Icon type="loading" style={{ fontSize: 24 }} spin />);


class  App extends Component {
  state ={
    students:[],
      isFetching:false
  }
  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents=()=> {
      this.setState({isFetching:true});
    getAllStudents().then(res => res.json().then(students => {
      this.setState({students:students,isFetching:false});
    }));
  }
  render() {
        const {students,isFetching} =this.state;
        if(isFetching){
          return(
              <Container>
                <Spin indicator={antIcon()}/>
            </Container>
          )
        }
      const le =()=> {
          if (students && students.length) {
              const columns = [
                  {
                      title:'',
                      key:'avatar',
                      render:(text,stud)=>{
                          return(
                              <Avatar size='large'>
                                  {`${stud.firstName.charAt(0).toUpperCase()} ${stud.lastName.charAt(0).toUpperCase()}`}
                              </Avatar>
                          )
                      }
                  },
                  {
                      title: 'StudentId',
                      dataIndex: 'studentId',
                      key: 'studentId'
                  },
                  {
                      title: 'FirstName',
                      dataIndex: 'firstName',
                      key: 'firstNAme'
                  },
                  {
                      title: 'Last Name',
                      dataIndex: 'lastName',
                      key: 'lastName'
                  },
                  {
                      title: 'Email',
                      dataIndex: 'email',
                      key: 'email'
                  },
                  {
                      title: 'Gender',
                      dataIndex: 'gender',
                      key: 'gender'
                  }
              ];
              return <Container><Table dataSource={students} columns={columns} rowKey='studentId' pagination={false}/></Container>
          } else {
              return <h1>No student found</h1>
          }
      }
    return (

        <h1>{le()}</h1>

  );
  }
}
export default App;
