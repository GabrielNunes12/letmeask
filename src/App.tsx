import { ButtonText } from './components/Button';
import { Header } from './components/Header';

function App() {
  return (
    <div className="App">
      <Header name="GUEIIMII" city="JOOJ" houseNumber={123}></Header>
      <ButtonText />
      <ButtonText />
    </div>
  );
}

export default App;
