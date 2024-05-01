import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoopPage from './Pages/CoopPage/CoopPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Coop from './Pages/Coop/Coop';
import { Context } from './Context/Context';
import { useContext } from 'react';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import Pay from './Pages/Pay/Pay';
import PaySuccess from './Pages/Pay/PaySuccess';
import UsePage from './Pages/UsePage/UsePage';


function App() {
  const { user } = useContext(Context)

  return (
    <div className="App">
      <Router>
          <Routes> 
            <Route path="/login" element={<Login />} exact />
            <Route path="/" element={user ? <Home /> : <Login />} exact />
            <Route path="/cooperativa" element={user ? <Coop /> : <Login />} exact />
            <Route path="/cooperativa/:id" element={user ? <CoopPage /> : <Login />} exact />
            <Route path="/produto/:id" element={user ? <SingleProduct /> : <Login />} exact />
            <Route path="/user/:id" element={user ? <UsePage /> : <Login />} exact />
            <Route path="/pay" element={user ? <Pay /> : <Login />} exact />
            <Route path="/success" element={user ? <PaySuccess /> : <Login />} exact />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
