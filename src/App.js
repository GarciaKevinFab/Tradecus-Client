import "./App.css";
import Layout from "./components/Layout/Layout";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="App">
      <Layout />;
      <ToastContainer />;
    </div>
  );
}

export default App;
