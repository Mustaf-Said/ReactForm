import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "../../style/register.scss";

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
  resum: string; // base64
  selectOption: string;
  text: string;
}

function RegisterForm() {
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
  const [submittedData, setSubmittedData] = useState<UserData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) {
      setSubmittedData(JSON.parse(saved));
    }
  }, []);

  const handleSelectChange = (sub: keyof Subject) => {
    setSubject((prev) => ({ ...prev, [sub]: !prev[sub] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!resum) {
      alert("Vänligen ladda upp ett CV.");
      return;
    }

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
      setSubmittedData(userData);
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
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Efternamn*</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label>Telefonnummer*</label>
          <input
            type="tel"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <label>Email*</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Kön</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Man
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Kvinna
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Annat
          </div>

          <label>URL</label>
          <input
            type="url"
            placeholder="Din webbsida"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <label>CV (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setResum(e.target.files ? e.target.files[0] : null)
            }
          />

          <label>Ämnen</label>
          <div>
            <input
              type="checkbox"
              checked={subject.english}
              onChange={() => handleSelectChange("english")}
            />{" "}
            Engelska
            <input
              type="checkbox"
              checked={subject.svesnka}
              onChange={() => handleSelectChange("svesnka")}
            />{" "}
            Svenska
            <input
              type="checkbox"
              checked={subject.Arabisk}
              onChange={() => handleSelectChange("Arabisk")}
            />{" "}
            Arabiska
          </div>

          <label>Välj kunskapsnivå*</label>
          <select
            required
            value={selectOption}
            onChange={(e) => setSelectOption(e.target.value)}
          >
            <option value="">--Välj ett alternativ--</option>
            <optgroup label="Grundläggande">
              <option value="option1">HTML</option>
              <option value="option2">CSS</option>
              <option value="option3">JavaScript</option>
            </optgroup>
            <optgroup label="Avancerat">
              <option value="option4">React</option>
              <option value="option5">Node.js</option>
              <option value="option6">TypeScript</option>
            </optgroup>
          </select>

          <label>Kommentarer</label>
          <textarea
            placeholder="Berätta något om dig själv"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">Skicka in</button>
          <button type="reset">Rensa</button>

        </form>
      </fieldset>

      {submittedData && (
        <div className="result">
          <h3>Inlämnad Data</h3>
          <ul>
            <li><strong>Förnamn:</strong> {submittedData.firstName}</li>
            <li><strong>Efternamn:</strong> {submittedData.lastName}</li>
            <li><strong>Email:</strong> {submittedData.email}</li>
            <li><strong>Telefon:</strong> {submittedData.contact}</li>
            <li><strong>Kön:</strong> {submittedData.gender}</li>
            <li><strong>URL:</strong> {submittedData.url}</li>
            <li><strong>Ämnen:</strong> {Object.entries(submittedData.subject).filter(([_, v]) => v).map(([k]) => k).join(", ")}</li>
            <li><strong>Kunskap:</strong> {submittedData.selectOption}</li>
            <li><strong>Kommentar:</strong> {submittedData.text}</li>
            <li><strong>CV:</strong> <a href={submittedData.resum} download="cv.pdf">Ladda ner</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
