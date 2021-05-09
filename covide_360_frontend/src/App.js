import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Resources from './pages/Resources'
import Chatbot from './pages/Chatbot'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import Payment from './pages/Payment'
import Meeting from './pages/Meeting'
import './App.css';
import "tailwindcss/tailwind.css"

function App() {
  return (
    <div className="App font-inter">
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/resources" component={Resources} />
          <Route path="/chatbot" component={Chatbot} />
          <Route path="/doctors" component={Doctors} />
          <Route path="/appointment" component={Appointment} />
          <Route path="/payment" component={Payment} />
          <Route path="/meeting" component={Meeting} />
      </Switch>

    </div>
  );
}

export default App;
