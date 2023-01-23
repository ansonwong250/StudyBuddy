import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import FriendsTable from "../components/FriendsTable"

function Doctors() {

  return (
    <div>
      <Navbar />
      <div >
        <Sidebar />
        <div class="main">
          <br />
          <FriendsTable></FriendsTable>

        </div></div>
    </div>
  );
}

export default Doctors;
