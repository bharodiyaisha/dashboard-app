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

const ActionDialog = ({
  title,
  description,
  onConfirm,
  actionText,
  okText,
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="outline"
        className="bg-white hover:bg-gray-100 text-black cursor-pointer"
      >
        {actionText}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} className="cursor-pointer">
          {okText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default function ActionBar({ selectedCount, onDelete, onPublish }) {
  return (
    <div className="p-4 my-4 border gap-2 border-blue-200 bg-indigo-50 rounded-md flex flex-wrap items-center">
      <span className="text-sm font-medium text-gray-800">
        {selectedCount} item(s) selected.
      </span>

      <div className="flex gap-2 mt-2 md:mt-0">
        <ActionDialog
          title="Are you absolutely sure?"
          description="This action cannot be undone. It will permanently delete the selected content."
          onConfirm={onDelete}
          actionText="Delete Selected"
          okText="Delete"
        />
        <ActionDialog
          title="Are you absolutely sure?"
          description="This action cannot be undone. The status of the selected content will be updated to 'Published'."
          onConfirm={onPublish}
          actionText="Publish Selected"
          okText="Publish"
        />
      </div>
    </div>
  );
}
