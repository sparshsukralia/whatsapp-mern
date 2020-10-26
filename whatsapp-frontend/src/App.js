import "./App.css";
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat Component */}
        <Chat />
      </div>
    </div>
  );
}

export default App;
