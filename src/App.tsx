import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';

import Interface from './components/Interface';
import Home from './components/Home';
import Post from './components/Post';
import User from './components/User';
import UserProvider from './context/User';
import Write from './components/Write';

export default function App() {
    return (
        <UserProvider>
            <div className='size-full overflow-hidden'>
                <Router>
                    <Routes>
                        <Route path='/auth/'>
                            <Route path='login' element={<Login />} />
                            <Route path='signup' element={<Signup />} />
                        </Route>
                        <Route path='/' element={<Interface />}>
                            <Route path='' element={<Home />} />
                            <Route path='write' element={<Write />} />
                            <Route path='post/:postId' element={<Post />} />
                            <Route path='user/:userId' element={<User />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}