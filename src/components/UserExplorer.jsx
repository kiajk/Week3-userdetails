import { useState } from "react";
import useUsers from "../hooks/useUsers";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import SearchInput from "./SearchInput";
import CompanyFilter from "./CompanyFilter";
import ClearFilters from "./ClearFilters";

function UserExplorer() {
  const { users, loading, error, retry } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCompany =
      company === "" || user.company.name === company;

    return matchesSearch && matchesCompany;
  });

  const companies = [
    ...new Set(users.map((user) => user.company.name)),
  ];

  return (
    <div>
      <h1>User Explorer</h1>

      <SearchInput
        value={search}
        onChange={setSearch}
      />

      <CompanyFilter
        companies={companies}
        value={company}
        onChange={setCompany}
      />

      <ClearFilters
        onClear={() => {
          setSearch("");
          setCompany("");
        }}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      ) : filteredUsers.length > 0 ? (
        <UserList
          users={filteredUsers}
          onSelectUser={setSelectedUser}
        />
      ) : (
        <p>No users match your search or filter.</p>
      )}

      <UserDetails user={selectedUser} />
    </div>
  );
}

export default UserExplorer;