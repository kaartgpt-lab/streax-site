"use client";

import { useState } from "react";

type BlogContentSection = {
  type: "text" | "image";
  content: string;
};

type Blog = {
  id: number;
  title: string;
  slug: string;
  featuredImage: string;
  contentSections: BlogContentSection[];
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title:
        "Virat Kohli, Rohit Sharma Wanted to Continue in Tests but Were Told to Go: India Legend Fires a Rocket at Agarkar",
      slug: "virat-kohli-rohit-sharma-wanted-to-continue-in-tests",
      featuredImage: "",
      contentSections: [],
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBlog, setNewBlog] = useState<Blog>({
    id: Date.now(),
    title: "",
    slug: "",
    featuredImage: "",
    contentSections: [],
  });

  // Add new content section
  const addContentSection = (type: "text" | "image") => {
    setNewBlog({
      ...newBlog,
      contentSections: [...newBlog.contentSections, { type, content: "" }],
    });
  };

  // Update content of a section
  const updateSectionContent = (index: number, content: string) => {
    const updatedSections = [...newBlog.contentSections];
    updatedSections[index].content = content;
    setNewBlog({ ...newBlog, contentSections: updatedSections });
  };

  // Create a new blog
  const handleCreateBlog = () => {
    if (!newBlog.title || !newBlog.slug)
      return alert("Title and Slug are required!");
    setBlogs([...blogs, { ...newBlog, id: Date.now() }]);
    setNewBlog({
      id: Date.now(),
      title: "",
      slug: "",
      featuredImage: "",
      contentSections: [],
    });
    setShowCreateForm(false);
  };

  return (
    <div className="p-6 py-20 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Blog Admin Dashboard</h1>

      {!showCreateForm ? (
        <>
          <button
            className="mb-6 px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowCreateForm(true)}
          >
            + Add New Blog
          </button>

          <div className="space-y-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex justify-between items-center border p-4 rounded-xl hover:shadow"
              >
                <div>
                  <strong className="text-sm">{blog.title}</strong>
                  <p className="text-xs text-gray-500">/{blog.slug}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-indigo-700 text-gray-100 rounded hover:bg-indigo-800 transition">
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-700 text-gray-100 rounded hover:bg-red-800 transition"
                    onClick={() =>
                      setBlogs(blogs.filter((b) => b.id !== blog.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="border p-6 rounded shadow-md space-y-4">
          <button
            className="mb-3 px-3 py-1 border rounded hover:bg-gray-100 transition"
            onClick={() => setShowCreateForm(false)}
          >
            Cancel
          </button>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Blog Title</label>
              <input
                type="text"
                className="border p-2 w-full rounded"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Blog URL Slug</label>
              <input
                type="text"
                className="border p-2 w-full rounded"
                value={newBlog.slug}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, slug: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Featured Image URL
              </label>
              <input
                type="text"
                className="border p-2 w-full rounded"
                value={newBlog.featuredImage}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, featuredImage: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Blog Content</label>
              <div className="space-y-2">
                {newBlog.contentSections.map((section, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-16 text-gray-700">
                      {section.type.toUpperCase()}:
                    </span>
                    <input
                      type="text"
                      placeholder={
                        section.type === "text"
                          ? "Enter text"
                          : "Enter image URL"
                      }
                      className="border p-2 w-full rounded"
                      value={section.content}
                      onChange={(e) =>
                        updateSectionContent(idx, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => addContentSection("text")}
                >
                  + Add Text Section
                </button>
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => addContentSection("image")}
                >
                  + Add Image Section
                </button>
              </div>
            </div>

            <button
              className="px-5 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
              onClick={handleCreateBlog}
            >
              Create Blog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
