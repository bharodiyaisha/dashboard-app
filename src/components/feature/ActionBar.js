import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ActionBar({ selectedCount, onDelete, onPublish }) {
  return (
    <div className="p-4 my-4 border gap-2 border-blue-200 bg-indigo-50 rounded-md flex flex-wrap items-center">
      <span className="text-sm font-medium text-gray-800">
        {selectedCount} item(s) selected.
      </span>

      <div className="flex gap-2 mt-2 md:mt-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 text-black cursor-pointer"
            >
              Delete Selected
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the
                selected content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="cursor-pointer">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant="outline"
          className="bg-white hover:bg-gray-100 text-black cursor-pointer"
          onClick={onPublish}
        >
          Publish Selected
        </Button>
      </div>
    </div>
  );
}
