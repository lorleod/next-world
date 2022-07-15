import "../App.scss";
import PublicPlaylistCard from "./partials/PublicPlaylistCard";
import { useEffect, useState } from "react";
import axios from "axios";

// Homepage - shows list of all playlists in the db
function Home() {
  const [homePlaylists, setHomePlaylists] = useState([]);

  // When page loads, get array of playlist objects from backend
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

  //map array of playlist objects into array of PublicPlaylistCard components
  const mappedHomePlaylists = homePlaylists.map((playlist) => {
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

  //display PublicPlaylistCard component array
  return <div className="App">{mappedHomePlaylists}</div>;
}

export default Home;
