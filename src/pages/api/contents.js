import contentData from "../../data/contentData";

export default function handler(req, res) {
  const { type } = req.query;
  let filteredData = contentData;
 
  console.log("type::",type,contentData,filteredData)

  if (type) {
    filteredData = contentData.filter(
      (item) => item.contentType.toLowerCase() === type.toLowerCase()
    );
  }

  res.status(200).json(filteredData);
}
