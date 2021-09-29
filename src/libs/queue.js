import { getData, setData } from "./storage";

export const loadQueue = async () => getData("queue") || [];

export const addToQueue = async (value) => {
  const store = getData("queue") || [];
  setData("queue", [value, ...store]);
  return value;
};
export const removeFromQueue = async (value) => {
  const store = getData("queue") || [];
  setData(
    "queue",
    store.filter((el) => el.url !== value.url)
  );
  return null;
};

export const updateQueueArticle = async (article, updatedArticle) => {
  console.log(" I am called here");
  let store = getData("queue") || [];
  let found = false;
  const updatedAt = new Date().toString();
  const update = {
    ...updatedArticle,
    updatedAt,
  };

  console.log(store[0]);

  store = store.map((el) => {
    if (el.url !== article.url) return el;
    found = true;
    return update;
  });

  console.log(store[0]);

  if (found) {
    setData("queue", store);
    return update;
  }

  throw new Error("Article not found");
};
