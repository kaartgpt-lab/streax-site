"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogsForAdmin,
  getBlogForEdit,
  BlogData,
  BlogContentSection,
} from "@/lib/api/blogService";
import { useAuth } from "@/lib/contexts/AuthContext";
import ProtectedPage from "@/lib/components/ProtectedPage";

function AdminBlogsContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState<BlogData>({
    title: "",
    slug: "",
    description: "",
    featuredImageUrl: "",
    content: [],
    author: "",
    category: "",
    tags: [],
    status: "draft",
  });

  // Load blogs on component mount
  useEffect(() => {
    loadBlogs();
  }, []);

  // Fetch all blogs
  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBlogsForAdmin();
      if (response.success && response.data) {
        setBlogs(response.data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load blogs";
      setError(errorMessage);
      console.error("Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new content section
  const addContentSection = (type: "text" | "image") => {
    setNewBlog({
      ...newBlog,
      content: [...newBlog.content, { type, content: "", order: newBlog.content.length }],
    });
  };

  // Update content of a section
  const updateSectionContent = (index: number, content: string) => {
    const updatedSections = [...newBlog.content];
    updatedSections[index].content = content;
    setNewBlog({ ...newBlog, content: updatedSections });
  };

  // Remove content section
  const removeSection = (index: number) => {
    setNewBlog({
      ...newBlog,
      content: newBlog.content.filter((_, i) => i !== index),
    });
  };

  // Create or Update blog
  const handleSaveBlog = async () => {
    try {
      if (!newBlog.title) {
        setError("Title is required!");
        return;
      }

      setSubmitting(true);
      setError(null);

      console.log("Saving blog with data:", newBlog);

      if (editingId) {
        // Update existing blog
        const response = await updateBlog(editingId, newBlog);
        console.log("Update response:", response);
        if (response.success && response.data) {
          setBlogs(
            blogs.map((b) => (b?._id === editingId ? response.data : b)).filter((b) => b !== undefined) as BlogData[]
          );
        }
      } else {
        // Create new blog
        const response = await createBlog(newBlog);
        console.log("Create response:", response);
        if (response.success && response.data) {
          setBlogs([response.data, ...blogs]);
        }
      }

      // Reset form
      setNewBlog({
        title: "",
        slug: "",
        description: "",
        featuredImageUrl: "",
        content: [],
        author: "",
        category: "",
        tags: [],
        status: "draft",
      });
      setShowCreateForm(false);
      setEditingId(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save blog";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Edit blog
  const handleEditBlog = async (blog: BlogData) => {
    try {
      // Fetch the blog with all content to ensure we have everything
      const response = await getBlogForEdit(blog._id || "");
      if (response.success && response.data) {
        const fullBlog = response.data;
        console.log("Loaded blog for editing:", {
          title: fullBlog.title,
          contentLength: fullBlog.content ? fullBlog.content.length : 0,
          content: fullBlog.content,
        });
        setNewBlog({
          ...fullBlog,
          content: fullBlog.content || [],
          tags: fullBlog.tags || [],
        });
        setEditingId(fullBlog._id || null);
        setShowCreateForm(true);
      } else {
        setError("Failed to load blog for editing");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load blog for editing";
      console.error("Error loading blog for edit:", err);
      setError(errorMessage);
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id: string | undefined) => {
    if (!id) return;

    try {
      setSubmitting(true);
      setError(null);
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete blog";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel edit/create
  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingId(null);
    setNewBlog({
      title: "",
      slug: "",
      description: "",
      featuredImageUrl: "",
      content: [],
      author: "",
      category: "",
      tags: [],
      status: "draft",
    });
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="p-6 py-20 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Blog Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Welcome, <span className="text-blue-400">{user?.username}</span></span>
          <button
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded">
          {error}
        </div>
      )}

      {!showCreateForm ? (
        <>
          <button
            className="mb-6 px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            onClick={() => setShowCreateForm(true)}
            disabled={loading || submitting}
          >
            + Add New Blog
          </button>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No blogs yet. Create your first blog!
            </div>
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex justify-between items-center border border-gray-700 p-4 rounded-xl hover:border-gray-500 hover:shadow-lg transition bg-gray-900"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-gray-100">{blog.title}</strong>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          blog.status === "published"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {blog.status}
                      </span>
                      {blog.views && (
                        <span className="text-xs text-gray-400">
                          👁️ {blog.views} views
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      /{blog.slug}
                    </p>
                    {blog.description && (
                      <p className="text-xs text-gray-400 mt-1">
                        {blog.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 bg-indigo-700 text-gray-100 rounded hover:bg-indigo-800 transition disabled:opacity-50"
                      onClick={() => handleEditBlog(blog)}
                      disabled={submitting}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-700 text-gray-100 rounded hover:bg-red-800 transition disabled:opacity-50"
                      onClick={() => setDeleteConfirm(blog._id || "")}
                      disabled={submitting || deleteConfirm !== null}
                    >
                      {submitting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="border border-gray-700 p-6 rounded-lg shadow-md space-y-4 bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-100">
              {editingId ? "Edit Blog" : "Create New Blog"}
            </h2>
            <button
              className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition text-gray-300"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-300">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-300">
                Description
              </label>
              <textarea
                className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                rows={2}
                value={newBlog.description || ""}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, description: e.target.value })
                }
                placeholder="Enter blog description"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-300">
                Featured Image URL
              </label>
              <input
                type="text"
                className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                value={newBlog.featuredImageUrl || ""}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, featuredImageUrl: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-300">
                  Author
                </label>
                <input
                  type="text"
                  className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                  value={newBlog.author || ""}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, author: e.target.value })
                  }
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                  value={newBlog.category || ""}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, category: e.target.value })
                  }
                  placeholder="e.g., Technology"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                  value={newBlog.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setNewBlog({
                      ...newBlog,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-300">
                  Status
                </label>
                <select
                  className="border border-gray-600 bg-gray-800 text-gray-100 p-2 w-full rounded focus:border-blue-500 focus:outline-none"
                  value={newBlog.status || "draft"}
                  onChange={(e) =>
                    setNewBlog({
                      ...newBlog,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-gray-300">
                Blog Content
              </label>
              <div className="space-y-2">
                {(!newBlog.content || newBlog.content.length === 0) ? (
                  <p className="text-sm text-gray-500">
                    No content sections yet. Add one below.
                  </p>
                ) : (
                  newBlog.content.map((section, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-gray-800 border border-gray-700 rounded"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-300 uppercase">
                            {section.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            #{idx + 1}
                          </span>
                        </div>
                        <textarea
                          placeholder={
                            section.type === "text"
                              ? "Enter text content..."
                              : "Enter image URL..."
                          }
                          className="border border-gray-600 bg-gray-700 text-gray-100 p-2 w-full rounded text-sm focus:border-blue-500 focus:outline-none"
                          rows={section.type === "text" ? 2 : 1}
                          value={section.content}
                          onChange={(e) =>
                            updateSectionContent(idx, e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="mt-2 px-2 py-1 bg-red-700 text-white text-xs rounded hover:bg-red-800 transition"
                        onClick={() => removeSection(idx)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  onClick={() => addContentSection("text")}
                >
                  + Add Text Section
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                  onClick={() => addContentSection("image")}
                >
                  + Add Image Section
                </button>
              </div>
            </div>

            <button
              className="px-5 py-3 w-full bg-blue-700 text-white rounded hover:bg-blue-800 transition font-semibold disabled:opacity-50"
              onClick={handleSaveBlog}
              disabled={submitting || !newBlog.title}
            >
              {submitting ? "Saving..." : editingId ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Delete Blog?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
                onClick={() => setDeleteConfirm(null)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                onClick={() => handleDeleteBlog(deleteConfirm)}
                disabled={submitting}
              >
                {submitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogs() {
  return (
    <ProtectedPage>
      <AdminBlogsContent />
    </ProtectedPage>
  );
}
