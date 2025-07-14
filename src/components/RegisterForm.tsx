// src/components/RegisterForm.tsx
import { useState, useContext } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import { UserContext } from "../context/UserContext";
import type { UserData, Subject } from "../type/Type";
import "../style/register.scss";

function RegisterForm(): JSX.Element {
  const { addUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("male");
  const [url, setUrl] = useState("");
  const [subject, setSubject] = useState<Subject>({
    english: true,
    svesnka: false,
    Arabisk: false,
  });
  const [resum, setResum] = useState<File | null>(null);
  const [selectOption, setSelectOption] = useState("");
  const [text, setText] = useState("");

  const handleSelectChange = (sub: keyof Subject) => {
    setSubject((prev) => ({ ...prev, [sub]: !prev[sub] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!resum) return alert("Vänligen ladda upp ett CV.");

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const userData: UserData = {
        firstName,
        lastName,
        email,
        contact,
        gender,
        url,
        subject,
        resum: base64,
        selectOption,
        text,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      addUser(userData);
      alert("Formuläret är inlämnat!");
    };
    reader.readAsDataURL(resum);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setGender("male");
    setUrl("");
    setSubject({ english: true, svesnka: false, Arabisk: false });
    setResum(null);
    setSelectOption("");
    setText("");
  };

  return (
    <div className="App">
      <fieldset>
        <legend>Registreringsformulär</legend>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <label>Förnamn*</label>
          <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label>Efternamn*</label>
          <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <label>Telefonnummer*</label>
          <input type="tel" required value={contact} onChange={(e) => setContact(e.target.value)} />
          <label>Email*</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Kön</label>
          <div>
            <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} /> Man
            <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} /> Kvinna
            <input type="radio" name="gender" value="other" checked={gender === "other"} onChange={(e) => setGender(e.target.value)} /> Annat
          </div>

          <label>URL</label>
          <input type="url" placeholder="Din webbsida" value={url} onChange={(e) => setUrl(e.target.value)} />

          <label>CV (PDF)</label>
          <input type="file" accept=".pdf" onChange={(e: ChangeEvent<HTMLInputElement>) => setResum(e.target.files?.[0] ?? null)} />

          <label>Ämnen</label>
          <div>
            <input type="checkbox" checked={subject.english} onChange={() => handleSelectChange("english")} /> Engelska
            <input type="checkbox" checked={subject.svesnka} onChange={() => handleSelectChange("svesnka")} /> Svenska
            <input type="checkbox" checked={subject.Arabisk} onChange={() => handleSelectChange("Arabisk")} /> Arabiska
          </div>

          <label>Välj kunskapsnivå*</label>
          <select required value={selectOption} onChange={(e) => setSelectOption(e.target.value)}>
            <option value="">--Välj ett alternativ--</option>
            <optgroup label="Grundläggande">
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
            </optgroup>
            <optgroup label="Avancerat">
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="TypeScript">TypeScript</option>
            </optgroup>
          </select>

          <label>Kommentarer</label>
          <textarea placeholder="Berätta något om dig själv" value={text} onChange={(e) => setText(e.target.value)} />

          <button type="submit">Skicka in</button>
          <button type="reset">Rensa</button>
        </form>
      </fieldset>
    </div>
  );
}

export default RegisterForm;
