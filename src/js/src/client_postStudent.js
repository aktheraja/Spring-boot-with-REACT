import fetch from "unfetch";
import checkStatus from './client_getStudents';

 const addNewStudent = student =>
    fetch('api/students',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body: JSON.stringify(student)
    }).then((response)=>{return(checkStatus(response))});

export default addNewStudent;