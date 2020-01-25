import React, {Component} from 'react';
import './App.css';
import {getAllStudents} from "./client";
import {Table,Avatar,Spin,Icon,Modal} from 'antd';
import Container from "./Container";
import {errorNotification} from './Notification';
import Empty from "antd/es/empty";
import AddStudentForm from "./forms/AddStudentForm";
import Footer from "./Footer";

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
  openAddStudentModal =()=>{
      this.setState({ isAddStudentModalVisible:true})
  }
    closeAddStudentModal =()=>{
        this.setState({ isAddStudentModalVisible:false})
    }

  fetchStudents=()=> {
      this.setState({isFetching:true});
    getAllStudents().then(response => response.json()).then(students => {

      this.setState({students:students,isFetching:false});

    })
        .catch(error=>{
    const message = error.error.message;
   const description = error.error.error;

       errorNotification(message,description);
             this.setState({isFetching:false});
    });

  }



    render() {
      const {students,isFetching,isAddStudentModalVisible} =this.state;
      const commonElements = () =>{
          return (
              <div>
              <Modal
                  title="Add new student"
                  visible={isAddStudentModalVisible}
                  onOk={this.closeAddStudentModal}
                  onCancel={this.closeAddStudentModal}
                  width={1000}>
                  <AddStudentForm
                      onSuccess = {()=>{
                          this.closeAddStudentModal();
                          this.fetchStudents();
                      }}
                    onFailure={(error)=>{
                        const message = error.error.message;
                        const description = error.error.httpStatus;
                        errorNotification(message,description)
                    }}
                  />
              </Modal>
              <Footer numberOfStudents={students.length} setModal={this.openAddStudentModal}  />
         </div>
          )
      }

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
              //Table from antd
              return <Container>

                  <Table
                  style={{marginBottom:'100px'}}
                  dataSource={students}
                  columns={columns}
                  rowKey='studentId'
                  pagination={false}/>
                  {commonElements()}
              </Container>
          }

    return (
        <Container>
                <Empty description={  'No student found'}/>
            {commonElements()}
        </Container>
  );
  }
}
export default App;
