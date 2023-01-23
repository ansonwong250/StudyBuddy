import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { verifySession, updateProfile } from "../api/services"

const studentsArr = [
    { label: 'Data Structures & Algorithms' },
    { label: 'Object-Oriented Software Development' },
    { label: 'Management Information Systems' },
    { label: 'Databases' },
    { label: 'React' },
    { label: 'Python' },
    { label: 'Language & Society' },
    { label: 'History and Philosophy of Science' },
    { label: 'Introduction to proofs' },
    { label: 'Computational Thinking' },
    { label: 'Marketing Geography' },
    { label: 'French' },
    { label: 'Introduction to Anthropology' },
    { label: 'Modern Symbolic Logic' },
    { label: 'Fundamentals of Running an Architectural Practice ' },
];

const activitiesArr = [
    { label: 'Cooking' },
    { label: 'Fishing' },
    { label: 'Camping' },
    { label: 'Soccer' },
    { label: 'Hockey' },
    { label: 'Football' },
];

const universityMap = {
    university_of_toronto: "University of Toronto",
    university_of_western_ontario: "Western University",
    york_university: "York University",
    ryerson_university: "Ryerson University/TMU",
    brock_university: "Brock University",
    university_of_waterloo: "University of Waterloo",
    seneca_college: "Seneca College",
    harvard_university: "Harvard University",
    stanford_university: "Stanford University"
};

function Form() {

    const [major, setMajor] = React.useState('');
    const [university, setUniversity] = React.useState('');
    const [interests, setInterests] = React.useState([]);
    const [long, setLong] = React.useState("");
    const [lat, setLat] = React.useState("");
    const [avatarFile, setAvatarFile] = React.useState(null);
    const [avatarfileName, setAvatarFileName] = React.useState("");
    const [type, setType] = React.useState("");
    const [textFieldValue, setTextFieldValue] = React.useState("");
    const [interestsArr, setInterestsArr] = React.useState([]);
    const [gpaValue, setGpaValue] = React.useState(0);

    const handleChangeMajor = (event) => {
        setMajor(event.target.value);
    };

    const onChangePictureAvatar = e => {
        if (e.target.files[0]) {
            var filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0]);
            setAvatarFileName(e.target.files[0].name)
            filereader.onload = function (evt) {
                var base64 = evt.target.result;
                setAvatarFile(base64)
            }
        };
    };

    useEffect(() => {
        async function fetchData() {
            var res = await verifySession(localStorage.getItem("token"))
            setType(res.type)
            setTextFieldValue(res.about)
            if (res.type == "study") {
                setInterestsArr(studentsArr)
            }
            else {
                setInterestsArr(activitiesArr)
            }
            setMajor(res.major)
            setGpaValue(res.gpa)
            setUniversity(res.university)
            setInterests(res.interests)
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

    const handleChangeTextFieldValue = (event) => {
        setTextFieldValue(event.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        let data = {
            major: major,
            interests: interests,
            long: long,
            lat: lat,
            about: textFieldValue,
            gpa: gpaValue,
            university: university
        }
        if (avatarFile) {
            data["avatar"] = avatarFile
        }
        let res = await updateProfile(localStorage.getItem("token"), data)
    }

    async function handleChange(event, value) {
        if (interests.includes(value.label) == false)
            setInterests([...interests, value.label])
    }

    async function handleRemove(value) {
        setInterests((current) =>
            current.filter((item) => item !== value)
        );
    }

    return (
        <div>
            <div>
                <div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                    {type == "study" && (
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Major</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={major}
                                                    label="Major"
                                                    onChange={handleChangeMajor}
                                                >
                                                    <MenuItem value={"computer_science"}>Computer Science</MenuItem>
                                                    <MenuItem value={"business"}>Business</MenuItem>
                                                    <MenuItem value={"history"}>History</MenuItem>
                                                    <MenuItem value={"biology"}>Biology</MenuItem>
                                                    <MenuItem value={"psychology"}>Psychology</MenuItem>
                                                    <MenuItem value={"other"}>Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>)}
                                    {type == "study" && (
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">University</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={university}
                                                    label="University"
                                                    onChange={(e) => setUniversity(e.target.value)}
                                                >
                                                    {Object.keys(universityMap).map((item) => (
                                                        <MenuItem value={item}>{universityMap[item]}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>)}
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={interestsArr}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} label="Interests" />}
                                    />
                                    <div>
                                        {interests.map((item) => (
                                            <item>
                                                <item style={{ backgroundColor: "#ADD8E6", borderRadius: "15px" }}>
                                                    <b> &nbsp;{item}&nbsp;<item style={{ color: "#FF0000" }}>
                                                        <button
                                                            type="button"
                                                            style={{ bottom: "5px", position: "relative" }}
                                                            onClick={() => handleRemove(item)}
                                                            className="rounded-md bg-red-600 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            Remove
                                                        </button>
                                                    </item></b>&nbsp;

                                                </item>
                                                &nbsp;
                                            </item>
                                        ))}
                                    </div>

                                    <TextField label="Longitude" value={long} /> &nbsp;
                                    <TextField label="Latitude" value={lat} />
                                    <br />
                                    <TextField label="GPA"
                                        value={gpaValue}
                                        onChange={(e) => setGpaValue(e.target.value)}
                                        type="number"
                                    />
                                    <br />
                                    <TextField label="About Me" rows={4}
                                        value={textFieldValue}
                                        multiline
                                        onChange={handleChangeTextFieldValue}
                                        fullWidth />

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Avatar</label>
                                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                {avatarFile == null && (
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                                {avatarFile != null && (
                                                    <span className="block text-sm font-medium text-gray-700">{avatarfileName}
                                                        <br /><br /></span>
                                                )}
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload-png"
                                                        className="cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input onChange={onChangePictureAvatar} id="file-upload-png" name="file-upload-png" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default Form;
