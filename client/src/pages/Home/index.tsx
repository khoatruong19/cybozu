import Header from "../../components/Home/Header";
import Seatmap from "../../components/Home/Seatmap";
import Sidebar from "../../components/Home/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../schema/types";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen font-mono flex flex-col w-screen overflow-x-hidden ">
      <Header />

      <div className="relative w-full pt-10 flex-1">
        <Seatmap />
        {user?.role === UserRole.ADMIN && <Sidebar />}
      </div>
    </div>
  );
};

export default Home;
