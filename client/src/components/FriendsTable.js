import '../App.css';
import React, { useEffect } from 'react';
import { verifySession, acceptFriend } from "../api/services"
import { useNavigate } from "react-router-dom";
import Map from "./Map"

function FriendsTable() {
    const navigate = useNavigate();

    const [friendsList, setFriendsList] = React.useState([]);
    const [pendingList, setPendingList] = React.useState([]);
    const [long, setLong] = React.useState("");
    const [lat, setLat] = React.useState("");
    const [longLat, setLongLat] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            var res = await verifySession(localStorage.getItem("token"))
            setFriendsList(res.friends)
            setPendingList(res.pending)
            setLongLat(res.longLat)
            if (res.long && res.lat) {
                setLong(res.long)
                setLat(res.lat)
            }
            else {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        setLong(position.coords.longitude)
                        setLat(position.coords.latitude)
                    });
                }
            }
        }
        fetchData();
    }, []);

    function openChat(url) {
        navigate("/chat/" + url)
    }

    function viewProfile(url) {
        navigate("/profile/" + url)
    }

    async function addNewFriend(id) {
        var res = await acceptFriend(localStorage.getItem("token"), {
          friendID: id
        })
        setFriendsList(res.friends)
        setPendingList(res.pending)
      }

    return (
        <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            First Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Last Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Chat
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Profile
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {friendsList.map((item) => (
                                        <tr class="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.firstName}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {item.lastName}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {item.email}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => openChat(item.userID)}
                                                >
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    </span>
                                                    Message
                                                </button>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="group relative flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => viewProfile(item.userID)}
                                                >
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    </span>
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            First Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Last Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Chat
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Profile
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingList.map((item) => (
                                        <tr class="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.firstName}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {item.lastName}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {item.email}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="group relative flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => addNewFriend(item.userID)}
                                                >
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    </span>
                                                    Accept
                                                </button>
                                            </td>

                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="group relative flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => viewProfile(item.userID)}
                                                >
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    </span>
                                                    View Profile
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {long && lat && (
            <Map long={long} lat={lat} longLat={longLat}></Map>
            )}
        </div>
    );
}

export default FriendsTable;
