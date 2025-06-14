import DocumentCardComponent from "@/components/DocumentCardComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockDocuments } from "@/data/documentCardMockData";
import AuthenticatedNavBarComponent from "@/components/AuthenticatedNavBarComponent";

export default function Documents() {
  const docsData = mockDocuments;
  return (
    <div>
      <div>
        <AuthenticatedNavBarComponent />
      </div>
      <div className="w-screen h-fit px-[300px] py-10">
        <div className="flex justify-between">
          <h1 className="text-white text-4xl font-semibold">All Documents</h1>
          <Button
            className="
        text-white 
        bg-blue-500 p-7 
        rounded-2xl 
        hover:cursor-pointer 
        hover:bg-blue-400"
            variant={"default"}
          >
            <Plus /> Start a blank document
          </Button>
        </div>
        <div className="py-10">
          {docsData?.map((doc, index) => {
            return (
              <DocumentCardComponent
                key={index}
                id={doc?.id}
                title={doc?.title}
                createdAt={doc?.createdAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
