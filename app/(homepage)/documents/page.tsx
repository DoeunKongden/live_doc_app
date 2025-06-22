"use client";

import { useState, useEffect } from "react";
import DocumentCardComponent from "@/components/DocumentCardComponent";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Loader2 } from "lucide-react";
import { mockDocuments } from "@/data/documentCardMockData";
import AuthenticatedNavBarComponent from "@/components/AuthenticatedNavBarComponent";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Documents() {
  const [docsData, setDocsData] = useState(mockDocuments);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateDocument = async () => {
    setIsCreating(true);
    
    try {
      // Simulate API call to create document
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new document ID
      const newDocId = `doc_${Date.now()}`;
      
      // Create new document object
      const newDocument = {
        id: newDocId,
        title: "Untitled Document",
        createdAt: new Date().toISOString(),
      };
      
      // Add to local state (in real app, this would be handled by the API)
      setDocsData(prev => [newDocument, ...prev]);
      
      // Show success message
      toast.success("New document created!");
      
      // Navigate to the new document
      router.push(`/documents/${newDocId}`);
      
    } catch (error) {
      toast.error("Failed to create document. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      // Simulate API call to delete document
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from local state
      setDocsData(prev => prev.filter(doc => doc.id !== id));
      
    } catch (error) {
      toast.error("Failed to delete document. Please try again.");
    }
  };

  // Listen for document updates (in a real app, this might be done via websockets or polling)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'documentUpdates') {
        const updates = JSON.parse(e.newValue || '{}');
        setDocsData(prev => prev.map(doc => {
          if (updates[doc.id]) {
            return { ...doc, ...updates[doc.id] };
          }
          return doc;
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div>
        <AuthenticatedNavBarComponent />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-white text-4xl font-semibold mb-2">All Documents</h1>
            <p className="text-white/70">Create and manage your documents</p>
          </div>
          <Button
            onClick={handleCreateDocument}
            disabled={isCreating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-5 w-5" />
                Start a blank document
              </>
            )}
          </Button>
        </div>

        {/* Quick Start Section */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={handleCreateDocument}
              disabled={isCreating}
              className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Blank Document</h3>
                <p className="text-white/60 text-sm">Start with a clean slate</p>
              </div>
            </button>

            <button className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">From Template</h3>
                <p className="text-white/60 text-sm">Choose from templates</p>
              </div>
            </button>

            <button className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Import File</h3>
                <p className="text-white/60 text-sm">Upload existing document</p>
              </div>
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-6">Recent Documents</h2>
          <div className="grid grid-cols-1 gap-4">
            {docsData?.length > 0 ? (
              docsData.map((doc, index) => (
                <DocumentCardComponent
                  key={doc.id || index}
                  id={doc?.id}
                  title={doc?.title}
                  createdAt={doc?.createdAt}
                  onDelete={handleDeleteDocument}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white/60" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">No documents yet</h3>
                <p className="text-white/60 mb-6">Create your first document to get started</p>
                <Button
                  onClick={handleCreateDocument}
                  disabled={isCreating}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Document
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
