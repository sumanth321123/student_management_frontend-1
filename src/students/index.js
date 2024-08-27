import { Table,Button,Modal,Form,Input,InputNumber, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const Student= () => {
    const [dataSource,setDataSource] = useState([])
    const [dataLoading,setDataLoading] = useState(false)
    const [isCreateModalOpen,setIsCreateModalOpen] = useState(false)
    const [isDetailsModalOpen,setIsDetailsModalOpen] = useState(false)
    const [getByIdDetails,setGetByIdDetails] = useState()
    const [isEditModalOpen,setIsEditModalOpen] = useState(false)
    const [editForm] = Form.useForm();
    const showCreateModal = () => {
      setIsCreateModalOpen(true)
    }
    const handleCreateCancel = () =>{
      createForm.resetFields()
      setIsCreateModalOpen(false)
    }

    useEffect(()=>{
        axios.get("http://localhost:3000/students").then((res)=>{
            const getalldata = res.data
            setDataSource(getalldata)
        }) 
    },[dataLoading])
    useEffect(() => {
      if (dataLoading) {
        const timer = setTimeout(() => {
          setDataLoading(!dataLoading);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [dataLoading]);
      const columns = [
        {
          title: 'S.No ',
          key: 'id',
          render:(_, record, index) => <div onClick={()=>{
            handleShowDetailsModal()
            handleGetStudentById(record._id)
          }} className="font-bold text-blue-500 cursor-pointer">{index+1}</div> 
        },
        // {
        //   title: 'Mongo ID',
        //   dataIndex: '_id',
        //   key: 'mongoId',
        // },
        {
          title: 'Roll no',
          dataIndex: 'rollNo',
          key: 'rollNo',
          
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Class Name',
            dataIndex: 'className',
            key: 'className',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: 'Phone Number',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title:'Actions',
          key: 'actions',
          render:(_,record) =>{
            return(
              <div className="flex flex-row gap-5"> 
                <Tooltip title="Edit" >
                  <span>
                    <EditOutlined className="text-green-500" onClick={() => {
                      handleGetStudentById(record._id) 
                      showEditModal()
                      }}/>
                  </span>
                </Tooltip>
                <Tooltip title="Delete" >
                  <span>
                    <DeleteOutlined className="text-red-500" onClick={()=>handleDeleteStudent(record._id)}/>
                  </span>
                </Tooltip>
              </div>
            )
          }
        },
      ];
      
      const [createForm] = Form.useForm();
      
      const handleAddStudent = async() =>
        {
          setDataLoading(true)
          const createPayload = {
            rollNo: createForm.getFieldValue("rollNo"),
            name:createForm.getFieldValue("name"),
            className:createForm.getFieldValue("className"),
            address:createForm.getFieldValue("address"),
            phoneNumber:createForm.getFieldValue("phoneNumber"),
          }
          await axios.post("http://localhost:3000/students",createPayload)
          createForm.resetFields()
          setIsCreateModalOpen(false) 
        }
        const handleDeleteStudent = async(id) => {
          setDataLoading(true)
          await axios.delete(`http://localhost:3000/students/${id}`)
        }
        const handleGetStudentById = async(id) => {
          await axios.get(`http://localhost:3000/students/${id}`).then((res) => {
            setGetByIdDetails(res.data)
            editForm.setFieldsValue(res.data)
          })
        }
        const handleShowDetailsModal = () => {
          setIsDetailsModalOpen(true)
        }
        const handleGetCancel = () => {
          setIsDetailsModalOpen(false)
        }
        const showEditModal = () =>
          {
            setIsEditModalOpen(true)
          }
          const handleEditCancel =() => {
            setIsEditModalOpen(false)
            editForm.resetFields()
          }

          const editDefaultValues = {
            rollNo: null,
            address: "",
            name: "",
            className: "",
            phoneNumber: null,
          };
          const handleStudentUpdate = async(id) =>
            {
              setDataLoading(true)
              const editPayload = {
                rollNo: editForm.getFieldValue("rollNo"),
                name:editForm.getFieldValue("name"),
                className:editForm.getFieldValue("className"),
                address:editForm.getFieldValue("address"),
                phoneNumber:editForm.getFieldValue("phoneNumber"),
              }
              await axios.put(`http://localhost:3000/students/${id}`,editPayload)
              editForm.resetFields()
              setIsEditModalOpen(false) 
            }
    return (
        <div className="px-8">
             <h1 className="font-bold text-yellow-500 underline text-2xl p-4">Student Details:</h1>
             <div className="my-2 flex flex-row justify-end">
             <Button type="primary" size="large" onClick={showCreateModal}> <span className="font-semibold">Add Student</span>
             </Button>
             </div>
             <Table dataSource={dataSource} bordered columns={columns} rowKey="_id" pagination={{position:["bottomCenter"]}} 
             loading={dataLoading}/>
             <Modal
        title="Create a Student"
        open={isCreateModalOpen}
        onOk={handleAddStudent}
        onCancel={handleCreateCancel}
        okText="Create"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          className="p-6"
          form={createForm}
        >
          <Form.Item
            label="Roll No"
            name="rollNo"
            rules={[
              {
                required: true,
                message: "Please enter roll no.",
              },
            ]}
          >
            <InputNumber className="w-full" controls={false} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter student name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Class Name"
            name="className"
            rules={[
              {
                required: true,
                message: "Please enter student class name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter student address",
              },
            ]}
          >
            <TextArea className="!resize-none" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please enter student phone number",
              },
            ]}
          >
            <InputNumber controls={false} maxLength={10} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Details of the student"
        open={isDetailsModalOpen}
        onOk={handleGetCancel}
        onCancel={handleGetCancel}
        okText="Close"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          name="get"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          className="p-6"
          >
          <Form.Item
            label={<span className="font-bold">Roll No</span>}
            name="rollNo"
          >
            {getByIdDetails?.rollNo}
          </Form.Item>

          <Form.Item
            label={<span className="font-bold">Name</span>}
            name="name"
          >
            {getByIdDetails?.name}
          </Form.Item>

          <Form.Item
            label={<span className="font-bold">Class Name</span>}
            name="className"
          >
            {getByIdDetails?.className}
          </Form.Item>

          <Form.Item
            label={<span className="font-bold">Address</span>}
            name="address"
          >
            {getByIdDetails?.address}
          </Form.Item>
          <Form.Item
            label={<span className="font-bold">Phone Number</span>}
            name="phoneNumber"
          >
            {getByIdDetails?.phoneNumber}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update a Student"
        open={isEditModalOpen}
        onOk={() => handleStudentUpdate(getByIdDetails?._id)}
        onCancel={handleEditCancel}
        okText="Update"
      >
        <Form
          name="edit"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          className="p-6"
          form={editForm}
          initialValues={editDefaultValues}
        >
          <Form.Item label="Roll No" name="rollNo">
            <InputNumber
              className="w-full"
              controls={false}
              disabled
            />
          </Form.Item>

          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Class Name" name="className">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <TextArea className="!resize-none" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <InputNumber controls={false} maxLength={10} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
        </div>
    )
}
export default Student;