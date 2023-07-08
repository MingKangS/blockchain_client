import axios from "axios";
import { Buffer } from "buffer";

export const uploadFileToIPFS = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const apiKey = process.env.REACT_APP_INFURA_API_KEY;
  const apiSecret = process.env.REACT_APP_INFURA_API_KEY_SECRET;
  const auth = `${apiKey}:${apiSecret}`;
  console.log(apiKey, apiSecret, file, auth);
  return axios
    .post("https://ipfs.infura.io:5001/api/v0/add", formData, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    })
    .then((response) => {
      console.log("IPFS hash:", response.data.Hash);
      return response.data.Hash;
    })
    .catch((error) => {
      console.error("Error uploading file:", error.message);
    });
};

export const getIPFSFile = async (
  hash = "QmbauiGMf51KfjfKw1AYjfGC8fkLvGgx1JUvoRSJL5F9LU"
) => {
  const apiKey = process.env.REACT_APP_INFURA_API_KEY;
  const apiSecret = process.env.REACT_APP_INFURA_API_KEY_SECRET;
  const auth = `${apiKey}:${apiSecret}`;
  console.log(apiKey, apiSecret, auth);
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/cat", "", {
      params: {
        arg: hash,
      },
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    })
    .then((response) => {
      console.log("File uploaded successfully");
      console.log("IPFS hash:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error uploading file:", error.message, error);
    });
  return res;
};
