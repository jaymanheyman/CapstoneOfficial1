import React from 'react'
import './CheckOut.css'
import Header from '../views/includes/Header';
import { getTotal } from '../Utils/Generals';
import { Link } from 'react-router-dom';
import Footer from '../views/includes/Footer';
const CheckOut =()=>{
    return(
        <>
        <Header/>
    <div className="mainscreen">
    
      <div className="cardd">
        <div className="leftside">
          <img
            src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
            className="product"
            alt="Shoes"
          />
        </div>
        
        <div className="rightside">
        <h5 className='w-100 fw-bold'>Sub Total : <span className="float-end">{'$' + getTotal()}</span></h5>
          <form action="">
            <h1>CheckOut</h1>
            <h2>Payment Information</h2>
            <p>Cardholder Name</p>
            <input type="text" className="inputbox" name="name" required />
            <p>Card Number</p>
            <input type="number" className="inputbox" name="card_number" id="card_number" required />

            <p>Card Type</p>
            <select className="inputbox" name="card_type" id="card_type" required>
              <option value="">--Select a Card Type--</option>
              <option value="Visa">Visa</option>
              <option value="RuPay">RuPay</option>
              <option value="MasterCard">MasterCard</option>
            </select>
<div className="expcvv">

            <p className="expcvv_text">Expiry</p>
            <input type="date" className="inputbox" name="exp_date" id="exp_date" required />

            <p className="expcvv_text2">CVV</p>
            <input type="password" className="inputbox" name="cvv" id="cvv" required />
        </div>
            <p></p>
          
            <Link to="/checkoutsuccess">  <button type="submit" className="button">CheckOut</button></Link>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  
        </>

    )
}
export default CheckOut;