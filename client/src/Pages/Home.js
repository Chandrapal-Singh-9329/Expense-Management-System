import React,{useState} from 'react'
import Layout from './../components/layout/Layout'
import {Modal, Form, Input , Select} from 'antd';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (values)=>{
    console.log(values)
  }

  return (
    <Layout>
      <div className="filters">
        <div>Range Filter</div>
        <div>
          <button className='btn btn-primary' onClick={()=>{setShowModal(true)}}  >Add new</button>
        </div>
      </div>

      <div className="content"></div>

      <Modal title='Add Transection'
      open={showModal}
      onCancel={()=>{setShowModal(false)}}
      footer={false}>

        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>

          <Form.Item label='Type' name='type'>
            <Select>
              <Select.Option value='expense'  > Expense </Select.Option>
              <Select.Option value='income'>Income</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='expense'>Salary </Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='medicine'>Medicine</Select.Option>
              <Select.Option value='bill'>Bill</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option> 
            </Select>
          </Form.Item>

          <Form.Item  label='Date' name='date'>
            <Input type='date' />
          </Form.Item>

          <Form.Item  label='Reference' name='reference'>
            <Input type='text' />
          </Form.Item>

          <Form.Item  label='Description' name='description'>
            <Input type='text' />
          </Form.Item>

          <div className='d-flex justify-content-end' type='submit'>
            <button className='btn btn-primary'>SAVE</button>
          </div>

        </Form>
      

      </Modal>
    </Layout>
  )
}

export default Home
