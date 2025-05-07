"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function CreateContent({ setShowForm, selectedContent }) {
  const [formData, setFormData] = useState({
    title: "",
    status: "draft",
    contentType: "",
    description: "",
  });

  useEffect(() => {
    if (selectedContent) {
      setFormData(selectedContent);
    }
  }, [selectedContent]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const date = new Date();
    const data = {
      ...formData,
      accessTier: "free",
      createdAt: date.toLocaleDateString("en-US"),
    };
    const method = selectedContent ? "PUT" : "POST";
    const url = "/api/contents";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setShowForm(false);
  };

  
  return (
    <div className="min-h-screen p-6 w-full">
      <div className="bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Content</h2>
          <div className="space-x-2">
            <Button
              onClick={() => setShowForm(false)}
              className="bg-white hover:bg-gray-100 text-black cursor-pointer"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-white hover:bg-gray-100 text-black cursor-pointer"
              variant="outline"
            >
              Save New Content
            </Button>
          </div>
        </div>

        <hr className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Title:</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter title"
            />
            <label className="block mt-4 mb-1 font-medium">Status:</label>
            <Select
              defaultValue="draft"
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
              value={formData.status}
            >
              <SelectTrigger className="w-full border rounded-md p-2">
                <SelectValue
                  name="status"
                  value={formData.status}
                  className="w-full border rounded-md p-2"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <label className="block mt-4 mb-1 font-medium">Content Type:</label>

            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, contentType: value }))
              }
              value={formData.contentType}
            >
              <SelectTrigger className="w-full border rounded-md p-2">
                <SelectValue
                  name="contentType"
                  value={formData.contentType}
                  className="w-full border rounded-md p-2"
                  placeholder="Select Type..."
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Type...</SelectLabel>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="photos">Photo</SelectItem>
                  <SelectItem value="quotes">Quote</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description:</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2 h-[150px]"
              placeholder="Enter description"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
