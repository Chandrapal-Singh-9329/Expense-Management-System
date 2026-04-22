import transactionModel from '../models/transactionModel.js'

const addTransaction = async(req,res)=>{
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction Add");
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getTransaction = async(req,res)=>{
    try {
        const transactions = await transactionModel.find({userid:req.body.userid});
        res.status(200).json(transactions);

    } catch (error) {
        console.log(error)
        res.status(500).send(error)   
    }
}

export default {addTransaction, getTransaction};