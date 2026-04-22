import React,{useState , useEffect} from 'react'
import Layout from './../components/layout/Layout'
import {Modal, Form, Input , Select, message, Table} from 'antd';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';



const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const[loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);

  //getAll Transaction
  const getAllTransaction = async() =>{
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('api/v1/transactions/get-transaction', {userid: user._id});
      setLoading(false);
      setAllTransactions(res.data)
      console.log(res.data)
      message.success("Transaction Fetched");
    } catch (error) {
      console.log(error)
      message.error("Failed to fetch data")   
    }
  }

  // useEffect Hook for Fetch Transactions
  useEffect(()=>{
    getAllTransaction();
  },[])

  // columns for data table
  const columns = [
    {
      title :"Date",
      dataIndex : "date"
    },
    {
      title :"Amount",
      dataIndex : "amount"
    },
    {
      title :"Type",
      dataIndex : "type"
    },
    {
      title :"Category",
      dataIndex : "category"
    },
    {
      title :"Reference",
      dataIndex : "reference"
    },
    {
      title :"Description",
      dataIndex : "description"
    },
    {
      title :"Action",
    }
  ]

  const handleSubmit = async(values)=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('api/v1/transactions/add-transaction', {...values, userid:user._id})
      setLoading(false)
      message.success("Transaction add successfully")
      setShowModal(false);
    } catch (error) {
      setLoading(false)
      message.error("Failed to add transaction") 
    } 
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>Range Filter</div>
        <div>
          <button className='btn btn-primary' onClick={()=>{setShowModal(true)}}  >Add new</button>
        </div>
      </div>

      <div className="content">
        <Table columns={columns} dataSource={allTransactions} />;
      </div>

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
