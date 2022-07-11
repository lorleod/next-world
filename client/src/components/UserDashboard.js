import "../App.scss";
import { useEffect } from "react";

function UserDashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        window.localtion.href = "/login";
      }
    }
  });

  return (
    <div className="App">
      <h1>Username</h1>
      <h2>Playlists</h2>
    </div>
  );
}

export default UserDashboard;
