import "../App.scss";
import "./AddWorld.scss";

function AddWorld() {
  return (
    <div className="App">
      <h1>Playlist name</h1>
      <form>
        <input
          type="text"
          placeholder="Keyword, Worldid"
          name="world-search"
        ></input>
        <button>Search</button>
      </form>
      <div class="show-world">
        <div>
          <h2>test</h2>
          <img
            class="img-world"
            src="https://images.theconversation.com/files/378097/original/file-20210111-23-bqsfwl.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
          />
        </div>
        <div class="world-desc">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            consectetur justo euismod arcu tincidunt imperdiet. Sed dui felis,
            commodo nec scelerisque quis, facilisis eu nisi. Maecenas faucibus,
            eros a ultrices lobortis, nibh neque imperdiet erat, commodo
            sollicitudin sem ante ac enim. Duis mattis magna vel quam sodales
            molestie.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddWorld;
