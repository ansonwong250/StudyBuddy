import '../App.css';
import * as React from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import { register } from "../api/services"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

function Register() {
  const navigate = useNavigate();
  const [university, setUniversity] = React.useState('');
  const [type, setType] = React.useState('');
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const [pronouns, setPronouns] = React.useState('');
  const handleChangePronouns = (event) => {
    setPronouns(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    var emailAddress = document.getElementById('email-address').value
    var password = document.getElementById('password').value
    var confirmPassword = document.getElementById('confirmpassword').value
    var firstName = document.getElementById('firstname').value
    var lastName = document.getElementById('lastname').value
    let res = await register({
      email: emailAddress,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      type: type,
      pronouns: pronouns
    })
    if (res.status = 200) {
      localStorage.setItem("token", res.sessionToken)
    }
    navigate("/")
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-3">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create a free account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  sign in here
                </a>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="firstname" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>

                <div className="pt-2">
                  <label htmlFor="lastname" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>

                <Box sx={{ minWidth: 120 }} className="py-2 text-left">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Type"
                      onChange={handleChangeType}
                    >
                      <MenuItem value={"student"}>Student</MenuItem>
                      <MenuItem value={"activity"}>Activity</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {type == "student" && (
                  <Box sx={{ minWidth: 120 }} className="py-2 text-left">
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

                <Box sx={{ minWidth: 120 }} className="text-left">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pronouns</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={pronouns}
                      label="Pronouns"
                      onChange={handleChangePronouns}
                    >
                      <MenuItem value={"He/Him"}>He/Him</MenuItem>
                      <MenuItem value={"She/Her"}>She/Her</MenuItem>
                      <MenuItem value={"They/Them"}>They/Them</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register;
