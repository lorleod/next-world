import "./searchBar.scss";
import { isValidElement, useState } from "react";

//
function SearchBar(props) {
  const [adv, setAdv] = useState(false);
  const { onSearch } = props;
  const [searchText, setSearchText] = useState("");

  //onClick handler for showing advance form
  const show = () => {
    setAdv(true);
  };

  //onClick handler for hidding advance form
  const hide = () => {
    setAdv(false);
  };

  //Changes state to input field
  const handleInput = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  //Allows input to be submit by enter
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      onSearch(searchText);
    }
  };

  //Prevents refresh on Submit
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
        className="search-bar-input"
          type="text"
          name="keyword"
          placeholder="Search"
          onChange={handleInput}
          onKeyPress={handleEnter}
          value={searchText}
        ></input>
        <br />
        {adv ? (
          <div className="advanced-search">
            <input className="search-bar-advanced-world" type="text" placeholder="Worldid" name="worldid"></input>
            <br />
            <input className="search-bar-advanced-author" type="text" placeholder="author" name="author"></input>
            <br />
            <button className="search-bar-advanced-hide-button" onClick={hide}>Hide</button>
          </div>
        ) : null}
        {!adv ? (
          <button className="search-bar-advanced-button" type="button" onClick={show}>
            Advanced
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default SearchBar;
