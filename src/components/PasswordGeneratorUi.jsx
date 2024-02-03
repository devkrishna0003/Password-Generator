import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PasswordGeneratorUi.module.css";

const PasswordGeneratorUi = () => {
  const [length, setLength] = useState(5);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatingPassword = useCallback(() => {
    let newPass = "";
    let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) alphabets += "1234567890";
    if (charAllowed) alphabets += '!"#$%&()*+,-./:;<=>?@[]^_`{|}~';
    for (let index = 0; index <= length; index++) {
      let char = Math.floor(Math.random() * alphabets.length + 1);
      newPass += alphabets.charAt(char);
    }
    setPassword(newPass);
  }, [length, charAllowed, numAllowed, setPassword]);
  const reference = useRef(null);
  const copyToClipBoard = () => {
    reference.current?.select();
    window.navigator.clipboard.writeText(password);
  };
  useEffect(() => {
    generatingPassword();
  }, [length, charAllowed, numAllowed, setPassword]);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Password Generator</h1>
      <div className={styles.inputArea}>
        <input
          ref={reference}
          value={password}
          type="text"
          readOnly
          className={styles.passwordInput}
          placeholder="Generated Password"
        />
        <button className={styles.copyBtn} onClick={copyToClipBoard}>
          Copy
        </button>
      </div>
      <div className={styles.critiria}>
        <div className={styles.btns}>
          <input
            type="range"
            min={4}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:({length})</label>
        </div>
        <div className={styles.btns}>
          <input
            type="checkbox"
            id="numbers"
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className={styles.btns}>
          <input
            type="checkbox"
            id="characters"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characters">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorUi;
