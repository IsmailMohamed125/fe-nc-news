import { createContext, useContext, useReducer, useEffect } from "react";
import { getUser } from "../api/users";

const AuthContext = createContext();

const testUser = {
  username: "tickle122",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    // Check localStorage for saved user state
    const savedState = localStorage.getItem("authState");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return initial;
  });

  const { user, isAuthenticated } = state;

  useEffect(() => {
    // Save the auth state to localStorage whenever it changes
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  async function login(username) {
    let user = null;
    if (username === testUser.username) {
      user = await getUser(username);
      dispatch({ type: "login", payload: user });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("authState"); // Remove from localStorage on logout
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
