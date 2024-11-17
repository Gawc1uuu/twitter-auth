import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AddWallet from './pages/AddWallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddWallet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
