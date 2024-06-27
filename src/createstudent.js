import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const Createstu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" style={{
          top: 180, width:150, float:'left'
        }} onClick={showModal} > 
        +  Add Student
      </Button>
      <Modal title="Register a new Student"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={500}>
        Roll Number : <input type="text" placeholder="Enter the roll number"/><br/>
        Name :<input type="text" placeholder="Enter the Name of Student"/><br/>
        Class Name :<input type="text" placeholder="Enter Class Name"/><br/>
        Address :<input type="text" placeholder="Enter address"/><br/>
        Phone Number :<input type="text" placeholder="Enter phone number"/><br/>
      </Modal>
    </>
  );
};
export default Createstu;