import { useGetAllUsersQuery } from "../../../../stores/user/service";
import UserCard from "./UserCard";

const UsersList = () => {
  const { data, isLoading } = useGetAllUsersQuery();

  if (isLoading) return "Loading";

  if (!data)
    return (
      <h3 className="text-center font-semibold text-2xl mt-10">
        No users found
      </h3>
    );

  return (
    <div className="mt-5">
      {data.data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
