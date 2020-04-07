import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Shipment.css';
import { useState } from 'react';
import { useAuth } from '../SignUp/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckOutForm/CheckOutForm';

const Shipment = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfoAdded,setShipInfoAdded] = useState(null)
    const onSubmit = data => props.deliveryDetailsHandler(data);
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_W7iHjMibyrz1ggmBNPzIMD9T009H35CYA7');


    const reduceQuantity = (pId) => {
        props.checkOutItemHandler(pId)
    }

    const subTotal = props.cart.reduce((acc, crr) => {
        return acc + (crr.price * crr.quantity);
    }, 0)

    const totalQuantity = props.cart.reduce((acc, crr) => {
        return acc + crr.quantity;
    }, 0)
    const tax = (subTotal / 100) * 5;
    const deliveryFee = totalQuantity && 2;
    const grandTotal = subTotal + tax + deliveryFee;
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <h3>Shipping information</h3>
                    <form className="shipForm" onSubmit={handleSubmit(onSubmit)}>


                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
                        {errors.name && <span>name is required</span>}

                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="email" />
                        {errors.email && <span>email is required</span>}


                        <input name="AddressLine1" ref={register({ required: true })} placeholder="AddressLine1" />
                        {errors.AddressLine1 && <span>AddressLine1 is required</span>}


                        <input name="AddressLine2" ref={register({ required: true })} placeholder="AddressLine2" />
                        {errors.AddressLine2 && <span>AddressLine2 is required</span>}


                        <input name="city" ref={register({ required: true })} placeholder="city" />
                        {errors.city && <span>city is required</span>}


                        <input name="country" ref={register({ required: true })} placeholder="country" />
                        {errors.country && <span>country is required</span>}


                        <input name="zipcode" ref={register({ required: true })} placeholder="zipcode" />
                        {errors.zipcode && <span>zipcode is required</span>}


                        <input type="submit" />
                    </form>

                </div>
                <div className="col-md-6">
                    <h3>Payment information</h3>
                    <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Shipment;