import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const CheckoutPage = () => {
  const notify = (message) => toast.success(message);

  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }

  const initialValues = {
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    creditCard: '',
    cvv: '',
    expirationDate: ''
  }

  const onSubmit = async (values, { resetForm }) => {
    const { name, phone, address, city, country, creditCard, cvv, expirationDate } = values;
    await fetch(`http://localhost:6180/order/${localStorage.getItem("userId")}/cart/${localStorage.getItem("cartId")}`,
      { headers: header, method: 'POST' })

    const paymentDto = {
      name: name,
      phone: phone,
      address: address,
      city: city,
      country: country,
      creditCard: creditCard,
      cvv: cvv,
      expirationDate: expirationDate,
      userId: localStorage.getItem("userId"),
      cartId: localStorage.getItem("cartId"),
      modeOfPayment: "Credit Card",
      status: "Pending"
    }

    await fetch(`http://localhost:6180/v1/api/payments`, {
      headers: header,
      method: 'POST',
      body: JSON.stringify(paymentDto)
    })
    notify("Order Placed Successfully")
  }

  return (
    <div>
      <Header />
      <h1 className='text-xl font-bold items-center flex justify-center'>Checkout</h1>
      <main className='mt-11 w-1/3 mx-auto'>
        {/* Form Section */}
        <div className=''>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ values, errors, handleChange, handleBlur }) => {
              return (
                <Form>
                  <div className='border-solid border-2 p-10 mx-auto'>
                    <div className='grid'>
                      <label htmlFor="name">Name and Surname</label>
                      <Field className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500" id="name" name="name" placeholder="Ad Soyad" />
                    </div>
                    <div className='grid'>
                      <label className='block mt-2' htmlFor="email">Email</label>
                      <Field
                        className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                    <div className='grid'>
                      <label className='block mt-2' htmlFor="phone">Phone</label>
                      <Field
                        className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                        id="phone"
                        name="phone"
                        placeholder="+90 555 555 55 55"
                        type="tel"
                      />
                    </div>
                    <div className='grid'>
                      <label className='block mt-2' htmlFor="address">Address</label>
                      <Field
                        className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                        id="address"
                        name="address"
                        placeholder="Açık Adres"
                        type="text"
                      />
                    </div>
                    <div className='grid'>
                      <label className='block' htmlFor="city">City</label>
                      <Field
                        className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                        id="city"
                        name="city"
                        placeholder="Şehir" />
                    </div>
                    <div className='grid'>
                      <label className='block' htmlFor="country">Country</label>
                      <Field
                        className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                        id="country"
                        name="country"
                        placeholder="Ülke" />
                    </div>
                    <div className='grid'>
                      <label className='block' htmlFor="creditCard">Credit Card</label>
                      <Field
                        className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                        id="creditCard"
                        name="creditCard"
                        placeholder="Kredi Kartı" />
                    </div>
                    <div className='grid grid-cols-2'>
                      <div>
                        <label className='block' htmlFor="cvv">CVV</label>
                        <Field
                          className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                          id="cvv"
                          name="cvv"
                          placeholder="CVV" />
                      </div>
                      <div>
                        <label className='block' htmlFor="expirationDate">Expiration Date</label>
                        <Field
                          className="outline mt-2 mr-2 mb-2 rounded-lg p-1 outline-gray-500"
                          id="expirationDate"
                          name="expirationDate" />
                      </div>
                    </div>
                  </div>
                  <button className='mb-24 block bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-lg mx-auto w-96' type="submit">Submit</button>
                </Form>
              )
            }}
          </Formik>
          <ToastContainer />
        </div>
      </main >
    </div >
  )
}

export default CheckoutPage