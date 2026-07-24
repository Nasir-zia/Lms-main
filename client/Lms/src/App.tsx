import { useState } from "react";
import Login from "./component/auth/login";
import Signup from "./component/auth/signup";

function App() {
  const [currentView, setCurrentView] = useState<"login" | "signup">("login");

  return (
    <div className="transition-all duration-300 ease-in-out">
      {currentView === "login" ? (
        <Login onToggleView={() => setCurrentView("signup")} />
      ) : (
        <Signup onToggleView={() => setCurrentView("login")} />
      )}
    </div>
  );
}

export default App