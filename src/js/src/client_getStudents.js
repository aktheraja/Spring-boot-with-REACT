import fetch from 'unfetch';
 const getAllStudents = ()=>fetch('api/students').then((response)=>checkStatus(response));

export default getAllStudents;


export const checkStatus =(response)=>{
    if(response.ok){
      return response;
   }
      else{
       let error = new Error(response.statusText);
       error.response = response;
       response.json().then(e=>{
        error.error=e;
       });
       return Promise.reject(error);
    }
}





