import React,{useState , useEffect} from 'react'
import Layout from './../components/layout/Layout'
import {Modal, Form, Input , Select, message, Table, DatePicker} from 'antd';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';
import Analytics from '../components/Analytics'
import moment from 'moment';
import {UnorderedListOutlined , AreaChartOutlined,  EditOutlined , DeleteOutlined} from '@ant-design/icons';
const {RangePicker} = DatePicker;



const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const[loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency , setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData , setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  //getAll Transaction
  const getAllTransaction = async() =>{
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('api/v1/transactions/get-transaction', {userid: user._id, frequency, selectedDate, type});
      setLoading(false);
      setAllTransactions(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
      message.error("Failed to fetch data")   
    }
  }

  // useEffect Hook for Fetch Transactions
  useEffect(()=>{
    getAllTransaction();
  },[frequency , selectedDate, type])

  // columns for data table
  const columns = [
    {
      title :"Date",
      dataIndex : "date",
      render : (text)=> <span>{moment(text).format('DD-MM-YYYY')}</span>
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
      render : (text, record) => {
        return(
        <div>
          <EditOutlined   onClick={()=>{
            setEditable(record);
            setShowModal(true)
          }}/>

          <DeleteOutlined  className = 'mx-2' onClick={()=>{
            handleDelete(record)
          }} />
        </div>
        )
      }
    }
  ]

  // handelDelete
  const handleDelete = async(record)=>{
    try {
      setLoading(true)
      await axios.post('api/v1/transactions/delete-transaction',{transactionId:record._id} )
      setLoading(false);
      message.success("Deleted Successfully");
    } catch (error) {
      setLoading(false);
      error.message("Unable to delete")
      
    }

  }


  const handleSubmit = async(values)=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if(editable){
        await axios.post('api/v1/transactions/edit-transaction', {
          transactionId : editable._id,
          payload:{
            ...values, userId: user._id
          }
        })
      setLoading(false)
      message.success("Transaction Update successfully")

      }
      else{
        await axios.post('api/v1/transactions/add-transaction', {...values, userid:user._id})
      setLoading(false)
      message.success("Transaction add successfully")
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false)
      message.error("Failed to add transaction") 
    } 
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h5>Select Frequency</h5>
          <Select value={frequency} onChange={(values)=> setFrequency(values)} >
          <Select.Option value='7'> Last 1 week</Select.Option>
          <Select.Option value='30'> Last 1 month</Select.Option>
          <Select.Option value='365'> Last 1 year</Select.Option>
          <Select.Option value='custom'> Custom</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)} /> )}
        </div>

        <div>
          <h5>Select Type</h5>
          <Select value={type} onChange={(values)=> setType(values)} >
          <Select.Option value='all'> All</Select.Option>
          <Select.Option value='expense'> Expense</Select.Option>
          <Select.Option value='income'> Income</Select.Option>
          </Select>
        </div>

  {/* Icons */}
        <div className='switch-icon'>
          <UnorderedListOutlined  className={`mx-2 ${viewData==='table' ? 'active-icon' : 'inactive-icon'}`} 
          onClick={()=> setViewData('table')} />


          <AreaChartOutlined   className={`mx-2 ${viewData==='analytics' ? 'active-icon' : 'inactive-icon'}`} 
          onClick={()=> setViewData('analytics')} />

        </div>


        <div>
          <button className='btn btn-primary' onClick={()=>{setShowModal(true)}}  >Add new</button>
        </div>
      </div>

      <div className="content">
        {viewData==='table' ?
        <Table columns={columns} dataSource={allTransactions} />
        : <Analytics allTransactions={allTransactions} />
        }
        
      </div>

      <Modal title = {editable ? "Edit Transaction" : 'Add Transection'}
      open={showModal}
      onCancel={()=>{setShowModal(false)}}
      footer={false}>

        <Form layout='vertical' onFinish={handleSubmit} initialValues = {editable}>
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
