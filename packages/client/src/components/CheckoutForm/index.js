import React, { useState } from 'react'
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs'
import images from 'react-payment-inputs/images'
import './CheckoutForm.scss'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  address1: '',
  address2: '',
  country: '',
  state: '',
  zipCode: '',
  nameOnCard: '',
  cardNumber: '',
  cardExpir: '',
  cardPin: '',
}
export default function CheckoutForm({ placeOrder }) {
  const [data, setData] = useState(initialState)

  const {
    meta,
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs()

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    })
  }

  const handlePlaceOrder = (event) => {
    event.preventDefault()
    event.stopPropagation()
    placeOrder(data)
  }

  return (
    <div className='container' style={{ maxWidth: '960px' }}>
      <form className='needs-validation' noValidate onSubmit={handlePlaceOrder}>
        <h4 className='mb-3'>Billing address</h4>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <label htmlFor='firstName'>First name</label>
            <input
              type='text'
              className='form-control'
              id='firstName'
              placeholder=''
              required
              value={data.firstName}
              onChange={handleInputChange}
            />
            <div className='invalid-feedback'>
              Valid first name is required.
            </div>
          </div>
          <div className='col-md-6 mb-3'>
            <label htmlFor='lastName'>Last name</label>
            <input
              type='text'
              className='form-control'
              id='lastName'
              placeholder=''
              required
              value={data.lastName}
              onChange={handleInputChange}
            />
            <div className='invalid-feedback'>Valid last name is required.</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 mb-3'>
            <label htmlFor='email'>
              Email <span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='you@example.com'
              value={data.email}
              onChange={handleInputChange}
            />
            <div className='invalid-feedback'>
              Please enter a valid email address for shipping updates.
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              className='form-control'
              id='address1'
              placeholder='1234 Main St'
              required
              value={data.address1}
              onChange={handleInputChange}
            />
            <div className='invalid-feedback'>
              Please enter your shipping address.
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <label htmlFor='address2'>
              Address 2 <span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='text'
              className='form-control'
              id='address2'
              placeholder='Apartment or suite'
              value={data.address2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 mb-3'>
            <label htmlFor='country'>Country</label>
            <select
              className='custom-select d-block w-100'
              id='country'
              required
            >
              <option value=''>Choose...</option>
              <option>United States</option>
            </select>
            <div className='invalid-feedback'>
              Please select a valid country.
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <label htmlFor='state'>State</label>
            <select className='custom-select d-block w-100' id='state' required>
              <option value=''>Choose...</option>
              <option>California</option>
            </select>
            <div className='invalid-feedback'>
              Please provide a valid state.
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <label htmlFor='zip'>Zip</label>
            <input
              type='text'
              className='form-control'
              id='zipCode'
              placeholder=''
              required
              value={data.zipCode}
              onChange={handleInputChange}
            />
            <div className='invalid-feedback'>Zip code required.</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 mb-3'>
            <div className='custom-control custom-checkbox'>
              <input
                type='checkbox'
                className='custom-control-input'
                id='same-address'
              />
              <label className='custom-control-label' htmlFor='same-address'>
                Shipping address is the same as my billing address
              </label>
            </div>
          </div>
        </div>
        <hr className='col-md-12 mb-4' />
        <h4 className='mb-3'>Payment</h4>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <label htmlFor='cc-name'>Name on card</label>
            <input
              type='text'
              className='form-control'
              id='cardName'
              placeholder=''
              required
              value={data.cardName}
              onChange={handleInputChange}
            />
            <small className='text-muted'>Full name as displayed on card</small>
            <div className='invalid-feedback'>Name on card is required</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <input {...getCardNumberProps()} required />
              <input {...getExpiryDateProps()} required />
              <input {...getCVCProps()} required />
            </PaymentInputsWrapper>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6 mb-3 pl-1'>
            <button
              className='btn btn-primary btn-lg btn-block m-2'
              type='submit'
            >
              Complete Order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
