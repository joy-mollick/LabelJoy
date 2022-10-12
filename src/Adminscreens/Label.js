
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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Barcode from 'react-barcode';

const userdb = db.ref('userdb');

const height = window.innerHeight;
const width = window.innerWidth;


function Label() {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { phone } = state;

    const [value, setValue] = useState('');
    const [size_qr, setSizeQr] = useState(80);
    const [width_qr, setWidthQr] = useState(150);
    const [mytext, setMytext] = useState('');
    const [mytextsze,setMyTextSize] = useState(12);
    const [qr, setQr] = useState(true);

    const [mytextstyle,setmytextstyle] = useState('normal');

    const textstyle = ["normal","italic","bold","italic & bold"]
    const formats=["CODE128","CODE39","EAN13","UPC12"]
    const options = ['QR', 'Barcode'];
    const textsize = [12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]
    const codesize=[50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200]

    const defaultOption = options[0];

    function select(id) {
        if (id.value != "QR") {
            setQr(false)
        }
        else setQr(true)
    }

    function selectSize(id) {
        setMyTextSize(id.value)
    }

    function selectQrSize(id) {
        setSizeQr(id.value)
    }

    function selectStyle(id) {
        setmytextstyle(id.value)
    }


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

                <div onClick={() => navigate('/Myprofile', { state: { phone: phone } })} style={{ cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 19 }}>{user}</div>
                    <text style={{ color: 'white' }}>Myprofile</text>
                </div>

                <div onClick={() => navigate('/ChangePassword', { state: { phone: phone } })} style={{ cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{change_pass}</div>
                    <text style={{ color: 'white' }}>Change Password</text>
                </div>

                <div style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: customer_icon_color, alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{qrcode}</div>
                    <text style={{ color: 'white' }}>Label</text>
                </div>

                <div onClick={() => navigate('/')} style={{ color: 'white', cursor: 'pointer', marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: 0.18 * width, padding: 14, backgroundColor: 'transparent', alignSelf: 'center' }}>
                    <div style={{ color: 'white', fontSize: 23 }}>{logout}</div>
                    <text style={{ color: 'white' }}>Log Out</text>
                </div>

            </div>


            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: width * 0.18, width: width * 0.78, position: 'absolute', top: 20, height: height - 10 }}>

                <div style={{ display: 'flex', flexDirection: 'column', padding: 10, borderWidth: '2px', borderRadius: 6, borderColor: 'green', alignSelf: 'center' }}>

                    <text style={{ marginLeft: 15, fontSize: 26, fontWeight: '400', letterSpacing: 1.01 }}>Labelling </text>

                    <div style={{ flexDirection: 'row', display: 'flex', width: width * 0.70, alignSelf: 'center', justifyContent: 'space-evenly' }}>

                        <div style={{ flexDirection: 'column', display: 'flex', marginLeft: 15, marginTop: 50 }}>
                            <text style={{  fontSize: 17, fontWeight: '300', letterSpacing: 1.01,textAlign:'center'}}>Code Value</text>

                            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', width: 110, alignSelf: 'center' }}>
                                <input
                                    type="text"
                                    value={value}
                                    placeholder='Value'
                                    onChange={(e) => setValue(e.target.value)}
                                    style={{ width: 110, height: 20, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'forestgreen', outline: 'none' }}
                                />
                            </div>

                        </div>

                        <div style={{ marginTop: 50 }}>
                            <text style={{  fontSize: 17, fontWeight: '300', letterSpacing: 1.01,textAlign:'center' }}>Code Size</text>
                            <div style={{ marginTop: 10 }}>
                                <Dropdown options={codesize} onChange={selectQrSize} value={"80"} placeholder="Select size" />
                            </div>
                        </div>

                        <div style={{ marginTop: 50 }}>
                            <text style={{  fontSize: 17, fontWeight: '300', letterSpacing: 1.01,textAlign:'center' }}>Type</text>
                            <div style={{ marginTop: 10 }}>
                                <Dropdown options={options} onChange={select} value={defaultOption} placeholder="Select type" />
                            </div>
                        </div>

                        <div style={{ flexDirection: 'column', display: 'flex', marginLeft: 15, marginTop: 50 }}>
                            <text style={{  fontSize: 17, fontWeight: '300', letterSpacing: 1.01,textAlign:'center' }}>My text</text>

                            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', width: 110, alignSelf: 'center' }}>
                                <input
                                    type="text"
                                    value={mytext}
                                    placeholder='My text'
                                    onChange={(e) => setMytext(e.target.value)}
                                    style={{ width: 110, height: 20, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'forestgreen', outline: 'none' }}
                                />
                            </div>

                        </div>


                        <div style={{ marginTop: 50 }}>
                            <text style={{ fontSize: 17, fontWeight: '300', letterSpacing: 1.01,textAlign:'center' }}>Text Size</text>
                            <div style={{ marginTop: 10 }}>
                                <Dropdown options={textsize} onChange={selectSize} value={"12"} placeholder="Select size" />
                            </div>
                        </div>

                        <div style={{ marginTop: 50 }}>
                            <text style={{  fontSize: 17, fontWeight: '300', letterSpacing: 1.01,textAlign:'center' }}>Text Style</text>
                            <div style={{ marginTop: 10 }}>
                                <Dropdown options={textstyle} onChange={selectStyle} value={"normal"} placeholder="Select style" />
                            </div>
                        </div>


                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: 150,  maxWidth:400,minWidth: width * 0.30, borderWidth: 2, borderColor: 'forestgreen', padding: 10, backgroundColor: 'white', marginTop: 70, borderRadius: 20, alignSelf: 'center' }}>
                        <text style={{ marginTop: 10, marginBottom: 15,fontSize:mytextsze,fontStyle:(mytextstyle.includes('italic')==true?'italic':'normal'),fontWeight:(mytextstyle.includes('bold')==true?'700':'200') }}>{mytext==""?"My text here":mytext}</text>
                        <div style={{justifyContent:'center',alignSelf:'center',maxHeight:400,alignContent:'center',alignItems:'center'}}>
                            {qr ? <QRCode
                                size={size_qr}
                                style={{ height: "auto", maxWidth: 400, width: width_qr,alignSelf:'center',alignContent:'center',alignItems:'center' }}
                                value={value}
                            /> : <Barcode
                                background="#ffffff"
                                value={value}
                                width={2}
                                height={size_qr}
                                textAlign="center"
                                displayValue={true}
                                fontSize={15}
                            />}
                        </div>
                    </div>



                </div>

            </div>

        </div>
    );
}

export default Label;
