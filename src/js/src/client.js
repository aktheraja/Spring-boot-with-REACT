import fetch from 'unfetch';
const getAllStudents = ()=>fetch('api/students');
export default getAllStudents;