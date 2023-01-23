import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { verifySession } from "../api/services"

const convertMajor = {
  computer_science: "Computer Science",
  business: "Business",
  history: "History",
  biology: "Biology",
  psychology: "Psychology",
  other: "Other",
}

function Profile() {
  const [major, setMajor] = React.useState('');
  const [interests, setInterests] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [type, setType] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [pronouns, setPronouns] = React.useState("");
  const [name, setName] = React.useState("");

  useEffect(async () => {
    var res = await verifySession(localStorage.getItem("token"))
    setType(res.type)
    setAvatar(res.avatar)
    setMajor(res.major)
    setInterests(res.interests)
    setAbout(res.about)
    setEmail(res.email)
    setPronouns(res.pronouns)
    setName(res.firstName + " " + res.lastName)
  }, []);

  return (
    <div>
      <Navbar />
      <div >
        <Sidebar />
        <div class="main">
          <br />
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="text-center text-xlg font-medium leading-6 text-gray-900 pb-3">{name}</div>
              {avatar != "" && (
                <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} className="rounded-full" width="150px" height="150px" src={avatar} />
              )}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Pronouns</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{pronouns}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{email}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Major</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{convertMajor[major]}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Looking for: </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{interests.join(', ')}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">About</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {about}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
