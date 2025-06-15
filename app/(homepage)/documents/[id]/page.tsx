import DocumentEditorComponent from "@/components/DocumentEditorComponent";
import DocumentNavBarComponent from "@/components/DocumentNavBarComponent";

export default function DocumentDetailPage() {
  return (
    <div>
      <DocumentNavBarComponent />

      <div>
        <DocumentEditorComponent />
      </div>
    </div>
  );
}
