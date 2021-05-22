import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Registration/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppSetting from "./Pages/Settings/AppSetting/AppSetting";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
