import { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import useDarkMode from "../hooks/useDarkMode";

export default function Settings() {
  const [dark, setDark] = useDarkMode();
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold dark:text-white">Settings</h1>

      {/* 🌙 THEME */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2 dark:text-white">Theme</h2>
        <button
          onClick={() => setDark(!dark)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toggle Dark Mode
        </button>
      </div>

      {/* 👤 PROFILE */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-3">
        <h2 className="font-semibold dark:text-white">Profile</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded 
          bg-gray-50 dark:bg-gray-700 dark:text-white"
        />

        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL"
          className="w-full p-2 border rounded 
          bg-gray-50 dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

    </div>
  );
}