import ContentTable from "@/components/feature/ContentTable";
import Sidebar from "@/components/feature/Sidebar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [contents, setContents] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const query = selectedType === "all" ? "" : `?type=${selectedType}`;
      const res = await fetch(`/api/contents${query}`);
      const data = await res.json();
      setContents(data);
    };
    fetchData();
  }, [selectedType]);

  const filteredContents = contents.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar onSelectType={setSelectedType} />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">All Content</h1>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter:</span>
              <Select onValueChange={setSelectedType} defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="quotes">Quotes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 text-black"
          >
            Create New Content
          </Button>
        </div>
        <ContentTable data={filteredContents} />
      </div>
    </div>
  );
}
