import { useState } from "react";
import useUser from "./hooks/useUser";

function App() {
  const [userId, setUserId] = useState(1);

  const { user, loading, error, retry } = useUser(userId);

  return (
    <div>
      <h1>User Explorer</h1>

      <select
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
      >
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
        <option value="5">User 5</option>
        <option value="999">User 999</option>
      </select>

      {loading && <p>Loading...</p>}

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {!loading && !error && !user && <p>No User Found.</p>}

      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
        </div>
      )}
    </div>
  );
}

export default App;