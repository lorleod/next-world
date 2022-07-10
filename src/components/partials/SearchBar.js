import { isValidElement, useState } from "react";

//
function SearchBar(props) {
  const [adv, setAdv] = useState(false);
  const { onSearch } = props;
  const [searchText, setSearchText] = useState("");

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
          type="text"
          name="keyword"
          onChange={handleInput}
          onKeyPress={handleEnter}
          value={searchText}
        ></input>
        {adv ? (
          <div className="advanced-search">
            <input type="text" placeholder="Worldid" name="worldid"></input>
            <input type="text" placeholder="author" name="author"></input>
            <button onClick={() => setAdv(false)}>Hide</button>
          </div>
        ) : null}
        <button>Search</button>
        {!adv ? (
          <button type="button" onClick={() => setAdv(true)}>
            Advanced
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default SearchBar;
