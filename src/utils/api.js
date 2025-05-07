const API_URL = "/api/contents";

export const fetchContents = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const updateContent = async (item) => {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
};

export const deleteContents = async (indexes) => {
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: indexes }),
  });
  return res.json();
};

export const createContent = async (item) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
};
