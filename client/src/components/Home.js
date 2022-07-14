import "../App.scss";
import PublicPlaylistCard from "./partials/PublicPlaylistCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [homePlaylists, setHomePlaylists] = useState([]);
  const [homePlaylistWorlds, setHomePlaylistWorlds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/`, {
          withCredentials: true,
        })
        .then((response) => {
          setHomePlaylists(response.data);
          console.log("response.data: ", response.data);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  // console.log("home playlists: ", homePlaylists);
  // console.log("home playlists worlds: ", homePlaylistWorlds);

  const mappedHomePlaylists = homePlaylists.map((playlist) => {
    // setHomePlaylistWorlds(playlist.worldIds);
    return (
      <PublicPlaylistCard
        key={playlist._id}
        playlistTitle={playlist.title}
        playlistDesc={playlist.description}
        playlistId={playlist._id}
        authorId={playlist.user_id}
        worldIds={playlist.worldIds}
      />
    );
  });

  return <div className="App">{mappedHomePlaylists}</div>;
}

export default Home;
