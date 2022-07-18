import "../App.scss";
import "./home.scss";
import PublicPlaylistCard from "./playlist/PublicPlaylistCard";
import { useEffect, useState } from "react";
import axios from "axios";

// Homepage - shows list of all playlists in the db
function Home() {
  const [homePlaylists, setHomePlaylists] = useState([]);

  // When page loads, get array of playlist objects from backend
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/home`, {
          withCredentials: true,
        })
        .then((response) => {
          setHomePlaylists(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
  return (
    <div className="Home-container">
      <div className="home-info">
        <div className="home-header-text">
          <h1 className="title">NextWorld</h1>
          <h3 className="slogan">Discover New Realities!</h3>
        </div>
        <div className="about">
          <p className="about-text">
            NextWorld is a portal where you can curate and share playlists of
            your favourite worlds{" "}
          </p>
        </div>
      </div>
      <div className="home-playlists-line"> </div>
      <div className="home-playlists">{mappedHomePlaylists}</div>
    </div>
  );
}

export default Home;
