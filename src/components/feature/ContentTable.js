import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ContentTable({ data }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="bg-gray-100 border-b border-gray-300">
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            <TableHead className="font-semibold text-black border-x">Title</TableHead>
            <TableHead className="font-semibold text-black border-x">
              Content Type
            </TableHead>
            <TableHead className="font-semibold text-black border-x">Status</TableHead>
            <TableHead className="font-semibold text-black border-x">
              Access Tier
            </TableHead>
            <TableHead className="font-semibold text-black border-x">
              Created At
            </TableHead>
            <TableHead className="font-semibold text-black border-x">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i} className="hover:bg-gray-50">
              <TableCell className="border-x">
                <input type="checkbox" />
              </TableCell>
              <TableCell className="font-medium border-x">{item.title}</TableCell>
              <TableCell className="border-x">{item.contentType}</TableCell>
              <TableCell className="border-x">{item.status}</TableCell>
              <TableCell className="border-x">{item.accessTier}</TableCell>
              <TableCell className="border-x">{item.createdAt}</TableCell>
              <TableCell className="border-x">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white hover:bg-gray-100 text-black cursor-pointer"
                  onClick={() => alert(`Title: ${item.title}`)}
                >
                  Preview
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
