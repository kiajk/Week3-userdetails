import { useEffect, useState } from "react";

function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      setUser(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId, retry]);
  return {
    user,
    loading,
    error,
    retry: () => setRetry((prev) => prev +1)
  };
}

export default useUser;