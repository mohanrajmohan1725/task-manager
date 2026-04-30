import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* CARD */}
      <div className="backdrop-blur-lg bg-white/10 
      border border-white/20 
      shadow-2xl rounded-2xl p-8 w-96 text-white">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg 
            bg-white/20 placeholder-white/70 
            border border-white/30 
            focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg 
            bg-white/20 placeholder-white/70 
            border border-white/30 
            focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold 
            bg-white text-purple-600 
            hover:bg-purple-100 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* SIGNUP */}
        <p className="text-sm mt-5 text-center text-white/80">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white font-semibold underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;