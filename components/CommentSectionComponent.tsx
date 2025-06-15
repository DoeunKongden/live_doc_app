import { Button } from "./ui/button";

export default function CommentSectionComponent() {
  return (
    <div className="w-90 border rounded-2xl shadow-sm bg-[#0B1526]">
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {/* Existing Comments */}
        <div className="space-y-3">
          <div className="bg-[#0B1526] text-white p-3 rounded-2xl border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                John Doe
              </span>
              <span className="text-xs">2 min ago</span>
            </div>
            <p className="text-sm ">
              This section needs more detail about the implementation.
            </p>
          </div>

          <div className="bg-[#0B1526] p-3 rounded-2xl text-white border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Jane Smith
              </span>
              <span className="text-xs">5 min ago</span>
            </div>
            <p className="text-sm">
              Great work on the formatting! The headings look perfect.
            </p>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="border-t p-4">
        <div className="space-y-3">
          <textarea
            placeholder="Add a comment..."
            className="w-full p-3 border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Shift + Enter to add line
            </span>
            <Button size="sm" className="bg-blue-600 rounded-2xl hover:cursor-pointer hover:bg-blue-700">
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
