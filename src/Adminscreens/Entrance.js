import React, { useEffect, useState } from 'react'
import { customer_icon_color, dashboard_bar_background, icon_background } from '../colors';
import logo from '../label.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'wc-toast'
import { Dots, Levels, Digital } from "react-activity";

import { db, storage, auth } from '../config'

const userdb = db.ref('userdb');

const height = window.innerHeight;
const width = window.innerWidth;

export default function Entrance() {

    const navigate = useNavigate();

    const [password, setPass] = useState('');
    const [loading, setLoading] = useState(false);

    function check() {

        if (password != '') {

            setLoading(true);

            userdb.once('value')
                .then(snapshot => {

                    if (snapshot.val() == null) { toast('This username doesnot exist !'); setLoading(false) }

                    else {

                        if (snapshot.val().password != password) {
                            toast('The password is wrong !')
                            setLoading(false)
                        }

                        else {
                            setLoading(false)
                            navigate('/ManagerList');
                        }

                    }

                });
        }

        else {
            toast('Please fill informations , empty field is not accepted');
            setLoading(false);
        }

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

            <div onClick={() => navigate('/SignUp')} style={{ cursor: 'pointer', marginTop: 30, width: 0.15 * width, alignSelf: 'center', backgroundColor: customer_icon_color, padding: 10, borderRadius: 10 }}>
                <text style={{ color: 'white' }}>Sign Up</text>
            </div>

            <div onClick={() => navigate('/SignIn')} style={{ cursor: 'pointer', marginTop: 30, width: 0.15 * width, alignSelf: 'center', backgroundColor: 'forestgreen', padding: 10, borderRadius: 10 }}>
                <text style={{ color: 'white' }}>Sign In</text>
            </div>


            {loading && <Levels size={25} />}

        </div>
    )
}
