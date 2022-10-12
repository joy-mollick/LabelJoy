
import '../App.css';
import {
    BrowserRouter,
    Routes, //replaces "Switch" used till v5
    Route,
    HashRouter
} from "react-router-dom";

import ChangePassword from './ChangePassword';
import Myprofile from './Myprofile';
import Label from './Label';
import Entrance from './Entrance';
import Code from './Code';
import FreeAccess from './FreeAccess';
import SignUp from './SignUp';
import Forget from './Forget';
import SignIn from './SignIn';

export default function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>

                    <Route path="/" element={<Entrance />} />
                    <Route path="/ChangePassword" element={<ChangePassword />} />
                    <Route path="/Myprofile" element={<Myprofile />} />
                    <Route path="/Code" element={<Code />} />
                    <Route path="/FreeAccess" element={<FreeAccess />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Forget" element={<Forget />} />
                    <Route path="/SignIn" element={<SignIn />} />
                    <Route path="/Label" element={<Label />} />

                </Routes>
            </HashRouter>
        </div>
    );
}