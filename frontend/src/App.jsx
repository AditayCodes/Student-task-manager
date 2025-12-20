import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskPage from "./pages/TaskPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  if (loggedIn) return <TaskPage />;

  return showRegister ? (
    <Register onBackToLogin={() => setShowRegister(false)} />
  ) : (
    <Login
      onLogin={() => setLoggedIn(true)}
      onRegister={() => setShowRegister(true)}
    />
  );
}

export default App;
