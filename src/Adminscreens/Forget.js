import React, { useEffect, useState } from 'react'
import { customer_icon_color, dashboard_bar_background, icon_background } from '../colors';
import logo from '../label.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'wc-toast'
import { Dots, Levels, Digital } from "react-activity";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { db, storage, auth, firebases } from '../config'

const userdb = db.ref('userdb');

const height = window.innerHeight;
const width = window.innerWidth;

export default function Forget() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [final, setfinal] = useState(null);

    function check() {

        if (number != '') {

            let myphn = "+" + number;

            setLoading(true);

            userdb.child(myphn).once('value')
                .then(snapshot => {

                    if (snapshot.val() == null) { toast('This number doesnot exist !'); setLoading(false) }

                    else {

                        sendOtp();

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
    }

    function sendOtp() {

        let myphn = "+" + number;
        let verify = new firebases.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber(myphn, verify).then((result) => {
            setfinal(result);
            setLoading(false);
            toast('An OTP code has been sent to your mobile phone')
        })
            .catch((err) => {
                alert(err);
                window.location.reload();
                setLoading(false);
            });

    }

    function decide() {
        if (final) ValidateOtp();
        else check();
    }

    const ValidateOtp = () => {
        if (otp === '' || final === null)
            return;
            let myphn = "+" + number;
        final.confirm(otp).then((result) => {
            toast('You evrified successfully');
            navigate('/Myprofile', { state: { phone:myphn } });
        }).catch((err) => {
            toast('OTP code is wrong');
            //alert("Wrong code");
        })
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

            {final == null && <div id="recaptcha-container"></div>}

            {final && <div style={{ display: 'flex', justifyContent: 'center', width: 0.50 * width, alignSelf: 'center', marginTop: 20, flexDirection: 'column' }}>
                <text style={{ textAlign: 'center', color: 'black', fontWeight: '600' }}>Write your otp </text>

                <input
                    type="text"
                    value={otp}
                    placeholder='Write your otp'
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ width: 350, height: 30, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'forestgreen', outline: 'none', marginTop: 10, alignSelf: 'center' }}
                />
            </div>}


            <div onClick={() => decide()} style={{ cursor: 'pointer', marginTop: 30, width: 0.15 * width, alignSelf: 'center', backgroundColor: customer_icon_color, padding: 10, borderRadius: 10 }}>
                <text style={{ color: 'white' }}>{final == null ? "Send OTP" : "Verify Account"}</text>
            </div>


            {loading && <Levels size={25} />}

        </div>
    )
}
