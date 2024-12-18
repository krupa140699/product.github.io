import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
import ForgetPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

export var BASE_URL = "http://localhost:4000"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/productList" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>Logout component</h1>} />
          <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
     
    </div>
  );
}

export default App;
