import CommentSectionComponent from "@/components/CommentSectionComponent";
import DocumentEditorComponent from "@/components/DocumentEditorComponent";
import DocumentNavBarComponent from "@/components/DocumentNavBarComponent";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function DocumentDetailPage() {
  return (
    <div>
      <DocumentNavBarComponent />

      <Link href={"/documents"}>
        <div className="text-white mx-24 hover:cursor-pointer hover:text-blue-900 mt-10">
          <ArrowLeftIcon size={40} />
        </div>
      </Link>
      <div className="flex gap-x-10">
        <DocumentEditorComponent />

        <div className="text-white mt-10">
          <CommentSectionComponent />
        </div>
      </div>
    </div>
  );
}
