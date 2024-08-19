import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Bookingpage from './pages/Bookingpage';

function App() {
  return (
    <div>
      <ToastContainer/>
        <Bookingpage/>
    </div>
  )

}

export default App;
