import RegisterForm from "./RegisterForm";
/* import UserInfo from "./UserInfo"; */

function Home() {

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home component of your application.</p>
      <RegisterForm />
      {/*  <UserInfo /> */}
    </div>
  );
}

export default Home;