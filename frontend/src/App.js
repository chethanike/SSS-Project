import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import SignUpForm from './views/Register';
import LoginForm from './views/login';
import CodeEditor from './views/editor';
import MyCodes from './views/myCodes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        
        <Route path='/editor' element={<CodeEditor/>} />
        <Route path='/mycodes' element={<MyCodes/>} />
        
      
        
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
