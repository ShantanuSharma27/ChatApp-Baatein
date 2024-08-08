
import Homepage from "./components/pages/Homepage";
import Chatpage from "./components/pages/Chatpage";
import { Routes,Route } from "react-router-dom";
import "./App.css";
function App() {
 return<div className="App">
  <Routes>
    <Route path="/" Component={Homepage}/>
    <Route path="/chats" Component={Chatpage}/>
  </Routes>
 </div>
}

export default App;
