// nav/UserInfo.tsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../style/userInfo.scss"; // Assuming you have a 
function UserInfo() {
  const { users } = useContext(UserContext);

  if (users.length === 0) {
    return <p>Inga användare har registrerats ännu.</p>;
  }

  return (
    <div>
      <h2>Alla Registrerade Användare</h2>
      {users.map((user, index) => (
        <ul key={index} >
          <li><strong>Namn:</strong> {user.firstName} {user.lastName}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Telefon:</strong> {user.contact}</li>
          <li><strong>Kön:</strong> {user.gender}</li>
          <li><strong>URL:</strong> {user.url}</li>
          <li><strong>Ämnen:</strong> {Object.entries(user.subject).filter(([_, v]) => v).map(([k]) => k).join(", ")}</li>
          <li><strong>Kunskap:</strong> {user.selectOption}</li>
          <li><strong>Kommentar:</strong> {user.text}</li>
          {user.resum && (
            <li>
              <strong>CV:</strong> <a href={user.resum} download="cv.pdf">Ladda ner</a>
            </li>
          )}
        </ul>
      ))}
    </div>
  );
}

export default UserInfo;

