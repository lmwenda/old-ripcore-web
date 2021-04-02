import React, { useState, useRef } from "react";
import axios from "axios";

import { v4 as uuid } from "uuid";
import Loading from "./Loading";

function PackUpload() {
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState("Choose File");
  const [sentFile, setSentFile] = useState({});
  const el = useRef();

  const data = new FormData();
  data.append("file", file);

  const upload = (e) => {
    e.preventDefault();

    const id = uuid();

    try {
      const response = axios
        .post(`http://ripcore.gg:5000/api/pack/upload/1`, data)
        .then((response) => console.log(response));

      const { fileName, filePath } = response.data;
      setSentFile({ fileName, filePath });
      console.log(sentFile, "Worked");
    } catch (err) {
      console.log(err);
    }
  };

  const Load = () => { 
    return <Loading />;
  }

  const fileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div>
      <form onSubmit={upload}>
        <input type="file" ref={el} name="packFile" onChange={fileChange} />
        <input type="submit" onClick={Load} value="Upload File" />
      </form>
    </div>
  );
}

export default PackUpload;
