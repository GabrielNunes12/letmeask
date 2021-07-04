import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}></Route>
        <Route path="/newRoom" component={NewRoom}></Route>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
