import React from "react";
import axios from "axios";

function Packupload() {
  const upload = () => {};

  return (
    <div>
      <form>
        <input type="file" name="packFile" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default Packupload;
