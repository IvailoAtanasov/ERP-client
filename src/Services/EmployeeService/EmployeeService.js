import axios from "axios";

export const getAll = async (url) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  return await axios.get(url, config).then((response) => response.data);
};

export const registerOne = async (url, items) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const { data } = await axios.post(url, items, config);
    localStorage.setItem("authToken", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const updateOne = async (url, items) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  // eslint-disable-next-line
  const { data } = await axios.put(url, items, config);
};

export const deleteOne = async (url, id) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  // eslint-disable-next-line
  const { data } = await axios.delete(url, id, config);
};
