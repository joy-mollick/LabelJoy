
import '../App.css';
import React, { useState, useEffect } from 'react';
import { active_bar, customer_icon_color, dashboard_background, dashboard_bar_background, icon_background } from '../colors';
import logo from '../logo.png'
import { change_pass, code, group, group_icon, logout, productList, profile_icon, user } from '../Icons';
import { useNavigate } from 'react-router-dom';
import { db } from '../config';
import { toast } from 'wc-toast'
import { Dots, Levels, Digital } from "react-activity";
import "react-activity/dist/library.css";

const admindb = db.ref('admindb');

const height = window.innerHeight;
const width = window.innerWidth;

function Code() {

    const navigate = useNavigate();

    const [codes, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [print, setPrint] = useState('');
    const [curr, setCurr] = useState({ val: null, print: null });

    function change_password() {
        if (codes != '' && print != '') {
            setLoading(true);
            admindb.update({
                val: codes,
                print: print,
            })
                .then(() => { toast("'Code Value has been updated !'"); setLoading(false);getting() });
        }
    }

    function getting() {

        admindb.once('value')
            .then(snapshot => {
                setCurr({ ...curr, val: snapshot.val().val, print: snapshot.val().print })
            })

    }

    useEffect(() => {
        if (curr.val == null && curr.print == null) {
            getting();
        }
    });


    return (
        <div style={{ backgroundColor: dashboard_background, flex: 1, flexDirection: 'row', width: width, height: height }}>
            <wc-toast></wc-toast>
            <div style={{ flex: 1, flexDirection: 'row', height: height, width: width * 0.20, backgroundColor: dashboard_bar_background, textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: width * 0.18, padding: 15, justifyContent: 'space-evenly' }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: 70, marginTop: 15, height: 80, borderRadius: 15 }}
                    />
                    <div style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <text style={{ fontSize: 20, color: 'black', fontWeight: '700', letterSpacing: 1.01 }}>Scanner</text>
                    </div>
                </div>

                <div style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: customer_icon_color, alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 19 }}>{code}</div>
                    <text style={{ color: 'white' }}>Code</text>
                </div>

                <div onClick={() => navigate('/ManagerList')} style={{ cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 19 }}>{user}</div>
                    <text style={{ color: 'white' }}>User List</text>
                </div>

                <div onClick={() => navigate('/ChangePassword')} style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{change_pass}</div>
                    <text style={{ color: 'white' }}>Change Password</text>
                </div>

                <div onClick={() => navigate('/')} style={{ color: 'white', cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{logout}</div>
                    <text style={{ color: 'white' }}>Log Out</text>
                </div>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: width * 0.22, width: width * 0.78, position: 'absolute', top: 20, height: height - 10 }}>

                <text style={{ marginTop: 60, marginLeft: 15, fontSize: 26, fontWeight: '500', letterSpacing: 1.01 }}>Set Value of Code</text>

                <text style={{marginTop:20,fontWeight:'600'}}>Current code is {curr.val}</text>

                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'center', width: 0.30 * width, alignSelf: 'center' }}>
                    <input
                        type="text"
                        value={codes}
                        placeholder='Put your value of code'
                        onChange={(e) => setCode(e.target.value)}
                        style={{ width: 0.30 * width, height: 20, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'forestgreen', outline: 'none' }}
                    />
                </div>

                <text style={{marginTop:20,fontWeight:'600'}}>Number of current printings is {curr.print}</text>

                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'center', width: 0.30 * width, alignSelf: 'center' }}>
                    <input
                        type="text"
                        value={print}
                        placeholder='Write number of printings'
                        onChange={(e) => setPrint(e.target.value)}
                        style={{ width: 0.30 * width, height: 20, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'forestgreen', outline: 'none' }}
                    />
                </div>

                <div onClick={() => change_password()} style={{ alignSelf: 'center', display: 'flex', justifyContent: 'center', marginTop: 14, marginBottom: 10 }}>
                    <div style={{ cursor: 'pointer', backgroundColor: customer_icon_color, padding: 10, marginTop: 15, borderRadius: 8, cursor: 'pointer', width: 130, alignSelf: 'center', justifyContent: 'center' }}>
                        <text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Update</text>
                    </div>
                </div>

                {loading && <Levels size={25} />}

            </div>

        </div>
    );
}

export default Code;
