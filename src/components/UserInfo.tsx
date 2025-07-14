import { useEffect, useState } from "react";

interface Subject {
  english: boolean;
  svesnka: boolean;
  Arabisk: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  url: string;
  subject: Subject;
  resum: string | null;
  selectOption: string;
  text: string;
}

function UserInfo() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  if (!userData) return <p>No user data found.</p>;

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {userData.firstName} {userData.lastName}</p>
      <p>Email: {userData.email}</p>
      <p>Contact: {userData.contact}</p>
      <p>Gender: {userData.gender}</p>
      <p>URL: {userData.url}</p>
      <p>Subjects: {Object.entries(userData.subject).filter(([_, val]) => val).map(([key]) => key).join(", ")}</p>
      <p>Selected Option: {userData.selectOption}</p>
      <p>Comments: {userData.text}</p>
      {userData.resum && <p>Resume File: {userData.resum}</p>}
    </div>
  );
}

export default UserInfo;
