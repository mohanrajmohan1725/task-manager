import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setName(u.displayName || "");
    });
    return () => unsub();
  }, []);

  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: name,
      });

      alert("Profile updated ✅");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Profile
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://i.pravatar.cc/100"
            className="w-24 h-24 rounded-full border mb-2"
            alt="profile"
          />
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Name Input */}
        <div className="mb-5">
          <label className="text-sm text-gray-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}