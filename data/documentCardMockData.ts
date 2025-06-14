export const mockDocuments: DocumentCardProps[] = [
  {
    id: "doc_001",
    title: "Project Proposal",
    createdAt: "2025-06-10T10:30:00Z",
  },
  {
    id: "doc_002",
    title: "Meeting Notes",
    createdAt: "2025-06-12T14:45:00Z",
  },
  {
    id: "doc_003",
    title: "User Guide Draft",
    createdAt: "2025-06-13T09:15:00Z",
  },
  {
    id: "doc_004",
    title: "Budget Plan",
    createdAt: "2025-06-14T08:00:00Z",
  },
];

interface DocumentCardProps {
  id?: string;
  title?: string;
  createdAt?: string;
  onDelete?: () => void;
}
