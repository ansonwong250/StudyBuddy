import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Form from "../components/Form"

function Home() {

  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <div class="main">
          <br />
          <Form></Form>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
