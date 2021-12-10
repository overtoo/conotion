// For handling input states
import { useState } from "react";

// For display toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import styles from "../styles/Home.module.css";

export default function Home() {
  // Input states
  const [zw, setZw] = useState("");
  const [english, setEnglish] = useState("");
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");

  // Form submit handler
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/submit-form", {
      method: "POST",
      body: JSON.stringify({ zw, english, comment, tags }),
    });
    // Success if status code is 201
    if (res.status === 201) {
      toast("Thank you for contacting us!", { type: "success" });
      setZw("");
      setEnglish("");
      setComment("");
    } else {
      toast("Please re-check your inputs.", { type: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>Add some 中文</h1>
        <div>
          <label htmlFor="zw">中文</label>
          <input
            type="text"
            id="zw"
            name="zw"
            value={zw}
            onChange={(e) => setZw(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="english">English</label>
            <input
              type="text"
              name="English"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tags">Tag</label>
            <select
              name="tags"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            >
              {" "}
              <option value="" disabled required>
                Select one
              </option>
              <option value="vocab">vocab</option>
              <option value="check">check</option>
              <option value="miniclass">miniclass</option>
              <option value="grammar">grammar</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            id="comment"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
