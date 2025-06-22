"use client";

import { useState, useEffect } from "react";
import CommentSectionComponent from "@/components/CommentSectionComponent";
import DocumentEditorComponent from "@/components/DocumentEditorComponent";
import DocumentNavBarComponent from "@/components/DocumentNavBarComponent";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockDocuments } from "@/data/documentCardMockData";
import toast from "react-hot-toast";

interface Document {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function DocumentDetailPage() {
  const params = useParams();
  const documentId = params.id as string;
  
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if it's an existing document from mock data
        const existingDoc = mockDocuments.find(doc => doc.id === documentId);
        
        if (existingDoc) {
          setDocument({
            ...existingDoc,
            content: `<h1>${existingDoc.title}</h1><p>This is the content for ${existingDoc.title}. Start editing to modify this document.</p>`,
          });
        } else {
          // It's a new document
          setDocument({
            id: documentId,
            title: "Untitled Document",
            content: "",
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        toast.error("Failed to load document");
      } finally {
        setIsLoading(false);
      }
    };

    if (documentId) {
      loadDocument();
    }
  }, [documentId]);

  const handleSave = async (content: string) => {
    setIsSaving(true);
    
    try {
      // Simulate API save
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setDocument(prev => prev ? {
        ...prev,
        content,
        updatedAt: new Date().toISOString(),
      } : null);
      
    } catch (error) {
      toast.error("Failed to save document");
      throw error; // Re-throw to let the editor handle the error
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    try {
      // Simulate API call to update title
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setDocument(prev => prev ? { 
        ...prev, 
        title: newTitle,
        updatedAt: new Date().toISOString(),
      } : null);
      
      // In a real app, you might also want to update the document list
      // or trigger a refetch of the document data
      
    } catch (error) {
      toast.error("Failed to update document title");
      throw error; // Re-throw to let the editor handle the error
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white/80">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-semibold mb-4">Document not found</h1>
          <Link href="/documents" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <DocumentNavBarComponent />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/documents">
          <div className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 group">
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Documents
          </div>
        </Link>

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1">
            <DocumentEditorComponent
              initialContent={document.content}
              onSave={handleSave}
              documentTitle={document.title}
              isReadOnly={false}
              onTitleChange={handleTitleChange}
            />
          </div>

          <div className="xl:w-80">
            <div className="sticky top-6">
              <CommentSectionComponent documentId={documentId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
