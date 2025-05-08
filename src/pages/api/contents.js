import contentData from "../../data/contentData";

let contents = [...contentData];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { type } = req.query;
    let filteredData = contents;

    if (type && type !== "all") {
      filteredData = contents.filter(
        (item) => item.contentType.toLowerCase() === type.toLowerCase()
      );
    }

    return res.status(200).json(filteredData);
  }

  if (req.method === "POST") {
    const newItem = req.body;
    newItem.id = Date.now();
    newItem.createdAt = new Date().toISOString();
    contents.unshift(newItem);
    return res.status(201).json({ success: true, item: newItem });
  }

  if (req.method === "PUT") {
    const updatedItem = req.body;
    const index = contents.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      contents[index] = { ...contents[index], ...updatedItem };
      return res.status(200).json({ success: true, item: contents[index] });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        return res.status(400).json({ message: "Invalid IDs format" });
      }

      contents = contents.filter((item) => !ids.includes(item.id));

      return res.status(200).json({ success: true, message: "Items deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
