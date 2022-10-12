import React, { useEffect, useState } from 'react'
import { customer_icon_color, dashboard_bar_background, icon_background } from '../colors';
import logo from '../label.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'wc-toast'
import { Dots, Levels, Digital } from "react-activity";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { db, storage, auth } from '../config'

const userdb = db.ref('userdb');

const height = window.innerHeight;
const width = window.innerWidth;

export default function SignIn() {

    const navigate = useNavigate();

    const [password, setPass] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);

    function check() {

        if (password != '') {

            let myphn = "+" + number;

            setLoading(true);

            userdb.child(myphn).once('value')
                .then(snapshot => {

                    if (snapshot.val() == null) { toast('This account doesnot exist !'); setLoading(false) }

                    else {

                        if (snapshot.val().pass != password) {
                            toast('The password is wrong !')
                            setLoading(false)
                        }

                        else {
                            setLoading(false)
                            navigate('/Myprofile', { state: { phone:myphn } });
                        }

                    }

                });
        }

        else {
            toast('Please fill informations , empty field is not accepted');
            setLoading(false);
        }

    }

    function mynumber(e) {
        setNumber(e);
        console.log(e);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: dashboard_bar_background, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: 0.99 * width, height: height }}>

            <wc-toast></wc-toast>

            <div style={{ display: 'flex', flexDirection: 'column', width: width * 0.38, padding: 15, justifyContent: 'space-evenly', height: 100 }}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{ width: 90, marginTop: 15, height: 95, borderRadius: 15, alignSelf: 'center' }}
                />
                <div style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
                    <text style={{ fontSize: 20, color: 'black', fontWeight: '700', letterSpacing: 1.01 }}>Etik maker</text>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: 0.50 * width, alignSelf: 'center', marginTop: 40 }}>
                <PhoneInput
                    name="phoneNumber"
                    type="text"
                    enableAreaCodes={true}
                    inputProps={{
                        country: "MX",
                        name: "phone",
                        required: true,
                        autoFocus: true
                    }}
                    value={number}
                    onChange={mynumber}
                    // Set your inline styles here
                    containerStyle={{
                        border: "1px solid green",
                        width: 350,
                        display: 'flex',
                        borderRadius: 6,
                        padding: 4
                    }}
                    inputStyle={{
                        background: "lightblue",
                        width: 300,
                        padding: 5,
                        height: 40, marginLeft: 50
                    }}
                    required
                    enableSearch
                    country={'MX'}
                    placeholder="Write phone number after selecting code"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: 0.50 * width, alignSelf: 'center', marginTop: 40 }}>
                <input
                    type="text"
                    value={password}
                    placeholder='Write your password'
                    onChange={(e) => setPass(e.target.value)}
                    style={{ width: 350, height: 30, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'forestgreen', outline: 'none' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', width: 0.50 * width, justifyContent: 'space-around', marginTop: 15 }}>
                   
                <div onClick={() => navigate('/Forget')} style={{ cursor: 'pointer', textDecorationLine: 'underline', color: 'red', fontWeight: '800' }}>
                    Forget password ?
                </div>
            </div>


            <div onClick={() => check()} style={{ cursor: 'pointer', marginTop: 30, width: 0.15 * width, alignSelf: 'center', backgroundColor: customer_icon_color, padding: 10, borderRadius: 10 }}>
                <text style={{ color: 'white', fontWeight: '800' }}> Sign In</text>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', width: 0.50 * width, justifyContent: 'space-around', marginTop: 35 }}>
                Don't have account ?
                <div onClick={() => navigate('/SignUp')} style={{ cursor: 'pointer', textDecorationLine: 'underline', color: 'green', fontWeight: '800' }}>
                    Sign Up
                </div>
            </div>


            {loading && <Levels size={25} />}

        </div>
    )
}
