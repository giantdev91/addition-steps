import { useState } from "react";
import beautify from "json-beautify";
import styles from "../styles/Home.module.scss";

const Home = () => {

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [steps, setSteps] = useState({});
  const regex = /^[0-9\b]+$/;


  const generateSteps = async () => {
    const res = await fetch("http://localhost:3000/api/generate", {
      method: 'POST',
      body: JSON.stringify({ "num1": num1, "num2": num2 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setSteps(await res.json());
    } else {
      const errObj = await res.json();
      alert(errObj['message']);
    }
  }

  const beautifyValue = () => {
    return beautify(steps, null, 2, 100);
  }

  const saveResult = async () => {
    const res = await fetch("http://localhost:3000/api/steps", {
      method: 'POST',
      body: JSON.stringify(steps),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Successfully Saved!");
  }

  const handleValueNum1 = (val: string) => {
    if (val === '' || regex.test(val)) {
      setNum1(val);
    }
  }

  const handleValueNum2 = (val: string) => {
    if (val === '' || regex.test(val)) {
      setNum2(val);
    }
  }

  return (
    <section className={styles.card}>
      <header className={styles.cardHeader}>
        <h1>Step Addition</h1>
      </header>
      <article>
        <div className={styles.inputRow} >
          <div className={styles.label}>
            <h4>First Number: </h4>
          </div>
          <div className={styles.inputDiv}>
            <input dir="rtl" value={num1} onChange={(event) => { handleValueNum1(event.target.value); }} />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.label}>
            <h4>Second Number: </h4>
          </div>
          <div className={styles.inputDiv}>
            <input dir="rtl" value={num2} onChange={(event) => { handleValueNum2(event.target.value); }} />
          </div>
        </div>
        <div className={styles.genBtnBg} >
          <button className={styles.genBtn} onClick={() => generateSteps()}>Generate Steps</button>
        </div>
        <div className={styles.textAreaBg} >
          <textarea value={beautifyValue()} readOnly />
        </div>
        <div className={styles.genBtnBg}>
          <button className={styles.saveBtn} onClick={saveResult}>Save results to DB</button>
        </div>
      </article>
    </section>
  );
};

export default Home;
