import "../App.scss";
import PublicPlaylistCard from "./partials/PublicPlaylistCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [homePlaylists, setHomePlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("home component - server'sresponse: ", response.data);
          setHomePlaylists(response.data);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);



  console.log("home playlists: ", homePlaylists);

  const mappedHomePlaylists = homePlaylists.map((playlist) => {
    return (
      <PublicPlaylistCard
        key={playlist._id}
        playlistTitle={playlist.title}
        playlistDesc={playlist.description}
      />
    );
  });

  return (
    <div className="App">
      <h1>Home</h1>
      {mappedHomePlaylists}
    </div>
  );
}

export default Home;
