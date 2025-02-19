import { useEffect } from "react";

import { fetchUsers } from "../services/users";
import { useUsers } from "./useUsers";

export const useFetchUsers = () => {
  const { setUsers } = useUsers();

  useEffect(() => {
    const abortController = new AbortController();

    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.map((user) => user.username));
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          alert(error.message);
          console.error(error);
        }
      }
    };

    getUsers();

    return () => {
      abortController.abort();
    };
  }, [setUsers]);
};
