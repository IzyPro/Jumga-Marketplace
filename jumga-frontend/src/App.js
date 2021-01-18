import './App.css';
import { BrowserRouter as Switch, Route, HashRouter} from "react-router-dom";
import Home from './Views/Home';
import CreateShop from './Views/CreateShop';
import Login from './Views/Login';
import Shop from './Views/Shop';
import ManageShop from './Views/ManageShop';
import AdminShop from './Views/AdminShop';
import ChangePassword from './Views/ChangePassword';
import ManageProducts from './Views/ManageProducts';
import AdminViewProduct from './Views/AdminViewProduct';
import Cart from './Views/Cart';
import Orders from './Views/Orders';
import Rider from './Views/Rider';


function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          {/* <Route path="/Shop">
            <Shop/>
          </Route> */}
          <Route path="/Shop/:username">
            <Shop/>
          </Route>
          <Route path="/AdminShop">
            <AdminShop/>
          </Route>
          <Route path="/ViewProduct">
            <AdminViewProduct/>
          </Route>
          <Route path="/CreateShop">
            <CreateShop/>
          </Route>
          <Route path="/Login">
            <Login/>
          </Route>
          <Route path="/Cart">
            <Cart/>
          </Route>
          <Route path="/ManageShop">
            <ManageShop/>
          </Route>
          <Route path="/ManageProducts">
            <ManageProducts/>
          </Route>
          <Route path="/Orders">
            <Orders/>
          </Route>
          <Route path="/Rider">
            <Rider/>
          </Route>
          <Route path="/ChangePassword">
            <ChangePassword/>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
