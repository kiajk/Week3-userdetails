import { useEffect, useState } from "react";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  return {
    users,
    loading,
    error,
    retry,
  };
}

export default useUsers;