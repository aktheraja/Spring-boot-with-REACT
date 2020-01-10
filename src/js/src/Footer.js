import React from 'react';
import {Avatar, Button} from "antd";
import './Footer.css';

const Footer = (props)=>{
    return(
        <div className='footer'>
            <div className="container">
                {props.numberOfStudents? <Avatar
                    style={{backgroundColor: '#f56a00' , marginRight:'5px'}}
                    size='large'>{props.numberOfStudents}</Avatar>:null}
                <Button type='primary' style={{marginTop:'5px'}} onClick={props.setModal} >Add new student +</Button>
            </div>
        </div>
    );
}
export default Footer;