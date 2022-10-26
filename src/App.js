import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
  return (
    <main className="container">
      <NavBar></NavBar>
      <div className="content">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/notFound" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </div>
    </main>
  );
}

export default App;
