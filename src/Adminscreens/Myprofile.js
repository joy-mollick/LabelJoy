
import '../App.css';
import React, { useState, useEffect } from 'react';
import { active_bar, customer_icon_color, dashboard_background, dashboard_bar_background, icon_background } from '../colors';
import logo from '../label.png'
import { change_pass, group, left, productList, user, right, search_icon, delet, add, suspend, enable, viewing, logout, code, qrcode } from '../Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dots, Levels, Digital } from "react-activity";
import { db } from '../config';
import { toast } from 'wc-toast'
import "react-activity/dist/library.css";
import QRCode from "react-qr-code";

const userdb = db.ref('userdb');

const height = window.innerHeight;
const width = window.innerWidth;


function ManagerList() {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { phone } = state;

    const [myself, setMyself] = useState(null);

    function storingMyself() {
        console.log('again storing');
        userdb.child(phone).once('value').then(snapshot => {
            const obj = snapshot.val();
            if (obj != null) {
                setMyself(obj);
            }
        });
    }


    useEffect(() => {
        if (myself == null) {
            storingMyself();
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
                        <text style={{ fontSize: 20, color: 'black', fontWeight: '700', letterSpacing: 1.01 }}>Etik maker</text>
                    </div>
                </div>

                <div style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: customer_icon_color, alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 19 }}>{user}</div>
                    <text style={{ color: 'white' }}>Myprofile</text>
                </div>

                <div onClick={() => navigate('/ChangePassword',{ state: { phone:phone }})} style={{ cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{change_pass}</div>
                    <text style={{ color: 'white' }}>Change Password</text>
                </div>

                <div onClick={() => navigate('/Label',{ state: { phone:phone }})} style={{ cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{qrcode}</div>
                    <text style={{ color: 'white' }}>Label</text>
                </div>

                <div onClick={() => navigate('/')} style={{ color: 'white', cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{logout}</div>
                    <text style={{ color: 'white' }}>Log Out</text>
                </div>

            </div>


            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: width * 0.18, width: width * 0.78, position: 'absolute', top: 20, height: height - 10 }}>

                <div style={{display:'flex', flexDirection:'column',padding:10,borderWidth:'2px',borderRadius:6,borderColor:'green',alignSelf:'center'}}>

                    <text style={{ marginLeft: 15, fontSize: 26, fontWeight: '400', letterSpacing: 1.01 }}>My profile 🏅</text>

                    <div style={{ marginTop: 50, width: 300, alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <text style={{ fontWeight: '700', alignSelf: 'center', color: 'forestgreen', fontSize: 25 }}>
                            Phone number 📱
                        </text>
                        {myself && <text style={{ marginTop: 5, fontSize: 20 }}>{myself.phone}</text>}
                    </div>

                    <div style={{ marginTop: 20, width: 300, alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <text style={{ fontWeight: '700', alignSelf: 'center', color: 'forestgreen', fontSize: 25 }}>
                            Email 📱
                        </text>
                        {myself && <text style={{ marginTop: 5, fontSize: 20 }}>{myself.email}</text>}
                    </div>

                    <div style={{ marginTop: 20, width: 300, alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <text style={{ fontWeight: '700', alignSelf: 'center', color: 'forestgreen', fontSize: 25 }}>
                            User name 👤
                        </text>
                        {myself && <text style={{ marginTop: 5, fontSize: 20 }}>{myself.name}</text>}
                    </div>

                    <div style={{ marginTop: 20, width: 300, alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <text style={{ fontWeight: '700', alignSelf: 'center', color: 'forestgreen', fontSize: 25 }}>
                            My code 🔳
                        </text>
                        {myself && <text style={{ marginTop: 5, fontSize: 20 }}>{myself.code == '' ? 'You have no code yet' : myself.code}</text>}
                    </div>

                    <div style={{ marginTop: 20, width: 300, alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <text style={{ fontWeight: '700', alignSelf: 'center', color: 'forestgreen', fontSize: 25 }}>
                            My free access 🤚
                        </text>
                        {myself && <text style={{ marginTop: 5, fontSize: 20 }}>{myself.free == 0 ? 'You have no access more' : myself.free}</text>}
                    </div>

                    <div style={{ marginTop: 20, width: 300, alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <text style={{ fontWeight: '700', alignSelf: 'center', color: 'forestgreen', fontSize: 25 }}>
                            Profile Status 🏳️
                        </text>
                        {myself && <text style={{ marginTop: 5, fontSize: 20 }}>{myself.suspend == false ? 'Active ✔️' : "Suspended ❌"}</text>}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ManagerList;
