import React, {Component} from 'react';
import './App.css';
import getAllStudents from "./client_getStudents";
import {Table,Avatar,Spin,Icon,Modal} from 'antd';
import Container from "./Container";
import Footer from './Footer';
import AddStudentForm from "./forms/AddStudentForm";
const antIcon = ()=>(<Icon type="loading" style={{ fontSize: 24 }} spin />);


class  App extends Component {
  state ={
    students:[],
      isFetching:false,
      isAddStudentModalVisible:false
  }
  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents=()=> {
      this.setState({isFetching:true});
    getAllStudents().then(response => response.json().then(students => {
      this.setState({students:students,isFetching:false});

    })).catch(error=>{console.log(error.error.message);
        this.setState({isFetching:false});
    });

  }

openAddStudentModalVisible=()=>{
      this.setState({isAddStudentModalVisible: !this.state.isAddStudentModalVisible});
}

  render() {
        const {students,isFetching,isAddStudentModalVisible} =this.state;
        if(isFetching){
          return(
              <Container>
                <Spin indicator={antIcon()}/>
            </Container>
          )
        }
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
              return <Container><Table style={{marginBottom:'100px'}} dataSource={students} columns={columns} rowKey='studentId' pagination={false}/>
                  <Modal
                      title="Add new student"
                      visible={isAddStudentModalVisible}
                      onOk={this.openAddStudentModalVisible}
                      onCancel={this.openAddStudentModalVisible}
                      width={1000}>
                    <AddStudentForm
                        onSuccess = {()=>{
                            this.openAddStudentModalVisible();
                        this.fetchStudents();
                        }}

                    />
                  </Modal>
                  <Footer numberOfStudents={students.length} setModal={this.openAddStudentModalVisible}  />
              </Container>
          }

    return (

    <h1>No student found</h1>


  );
  }
}
export default App;
