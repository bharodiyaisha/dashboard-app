import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteContents, fetchContents, updateContent } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import ActionBar from "./ActionBar";

export default function ContentTable({
  data,
  setSelectedContent,
  setShowForm,
  setData,
}) {
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const [loadingAction, setLoadingAction] = useState(null);

  const toggleSelectAll = () => {
    setSelectedContentIds((prev) =>
      prev.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const toggleSelectOne = (id) => {
    setSelectedContentIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selectedContentIds.includes(id);
  const isAllSelected =
    data.length > 0 && selectedContentIds.length === data.length;

  const refreshData = async () => {
    const refreshed = await fetchContents();
    setData(refreshed);
    setSelectedContentIds([]);
  };

  const handleDelete = async () => {
    setLoadingAction("delete");
    await deleteContents(selectedContentIds);
    await refreshData();
    setTimeout(() => {
      setLoadingAction(null);
    }, 100);
  };

  const handlePublish = async () => {
    setLoadingAction("publish");
    const updates = data
      .filter((item) => selectedContentIds.includes(item.id))
      .map((item) => ({ ...item, status: "published" }));

    await Promise.all(updates.map(updateContent));
    await refreshData();
    setTimeout(() => {
      setLoadingAction(null);
    }, 100);
  };

  return (
    <>
      {selectedContentIds.length > 0 && (
        <ActionBar
          selectedCount={selectedContentIds.length}
          onDelete={handleDelete}
          onPublish={handlePublish}
        />
      )}
      <div className="overflow-x-auto border rounded-md">
        {loadingAction && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          </div>
        )}
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow className="border-b border-gray-300">
              <TableHead>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </TableHead>
              {[
                "Title",
                "Content Type",
                "Status",
                "Access Tier",
                "Created At",
                "Actions",
              ].map((text) => (
                <TableHead
                  key={text}
                  className="font-semibold text-black border-x"
                >
                  {text}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="border-x">
                  <Checkbox
                    checked={isSelected(item.id)}
                    onCheckedChange={() => toggleSelectOne(item.id)}
                    className="cursor-pointer"
                  />
                </TableCell>
                <TableCell className="font-medium border-x">
                  {item.title}
                </TableCell>
                <TableCell className="border-x">{item.contentType}</TableCell>
                <TableCell className="border-x">{item.status}</TableCell>
                <TableCell className="border-x">{item.accessTier}</TableCell>
                <TableCell className="border-x">
                  {new Date(item.createdAt).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell className="border-x">
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => {
                        setSelectedContent(item);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => alert(`Title: ${item.title}`)}
                    >
                      Preview
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
