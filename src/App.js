import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import './App.css';
import { Route, Switch } from 'react-router';
import UserForm from "./components/userForm"
import UserList from "./components/userList";

function App() {
  return (
     
    <Switch>
      <Route path="/userForm/:id?" component={UserForm}/> 
      <Route path="/" component={UserList}/> 
    </Switch>
  );
}

export default App;
