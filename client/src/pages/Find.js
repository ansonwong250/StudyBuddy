import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { addFriend, matchFriends, getProfiles } from "../api/services"

const convertMajor = {
  computer_science: "Computer Science",
  business: "Business",
  history: "History",
  biology: "Biology",
  psychology: "Psychology",
  other: "Other",
}

function Find() {

  const [userID, setuserID] = React.useState('');
  const [matched, setMatched] = React.useState([]);
  const [matchedIndex, setMatchedIndex] = React.useState(0);
  const [major, setMajor] = React.useState('');
  const [interests, setInterests] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [type, setType] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [pronouns, setPronouns] = React.useState("");
  const [name, setName] = React.useState("");

  useEffect(() => {
    async function fetchData() {
      var res = await matchFriends(localStorage.getItem("token"))
      setMatched(res.matches)
      var res = await getProfiles(localStorage.getItem("token"), res.matches[0])
      setType(res.type)
      setAvatar(res.avatar)
      setMajor(res.major)
      setInterests(res.interests)
      setAbout(res.about)
      setEmail(res.email)
      setPronouns(res.pronouns)
      setName(res.firstName + " " + res.lastName)
      setuserID(res.userID)
    }
    fetchData();
  }, []);

  async function addNewFriend() {
    var res = await addFriend(localStorage.getItem("token"), {
      friendID: userID
    })
  }

  async function getNext() {
    setMatchedIndex(matchedIndex + 1)
    var res = await getProfiles(localStorage.getItem("token"), matched[matchedIndex+1])
    setType(res.type)
    setAvatar(res.avatar)
    setMajor(res.major)
    setInterests(res.interests)
    setAbout(res.about)
    setEmail(res.email)
    setPronouns(res.pronouns)
    setName(res.firstName + " " + res.lastName)
  }

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
          <div class="max-w-lg p-12 container flex justify-center mx-auto">
            <div class="flex flex-row mx-auto">
              <button onClick={addNewFriend} type="button" class="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
                <div class="flex flex-row align-middle">
                  <p class="ml-2">Request Friend</p>
                </div>
              </button>
              <button onClick={getNext} type="button" class="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">
                <div class="flex flex-row align-middle">
                  <span class="mr-2">Next</span>
                  <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Find;
