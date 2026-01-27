"use client";
import { useState, useEffect } from "react";
import { getAllBlogs, BlogData } from "@/lib/api/blogService";
import Link from "next/link";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    loadBlogs(currentPage);
  }, [currentPage]);

  const loadBlogs = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBlogs(page, itemsPerPage, "published");
      if (response.success && response.data) {
        setBlogs(response.data);
        setTotalPages(response.pagination?.pages || 1);
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="bg-[#0b0d17] text-white py-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-4">BLOG</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Gain access to exclusive data-driven insights.
          </p>

          {/* Subscribe */}
          <div className="flex justify-center items-center gap-3 mb-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500 text-sm"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all">
              Subscribe
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No blogs published yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#13172A] rounded-2xl p-5 border border-gray-800 hover:border-pink-500 transition-all duration-300 cursor-pointer group"
                >
                  {/* Featured Image or Placeholder */}
                  <div className="h-40 rounded-xl mb-4 flex items-center justify-center text-center bg-gradient-to-br from-[#1B1E31] to-[#0F1222] border border-gray-700 overflow-hidden">
                    {blog.featuredImageUrl ? (
                      <img
                        src={blog.featuredImageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                          <span className="text-pink-500">
                            {blog.category || "Blog"}
                          </span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                          {blog.tags?.join(" • ") || "Insights"}
                        </p>
                        <div className="text-[10px] text-gray-500 mt-2 bg-[#1F2236] px-2 py-1 inline-block rounded-md">
                          {formatDate(blog.createdAt)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Blog content */}
                  <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-pink-400 transition">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-xs mb-2">
                    {formatDate(blog.createdAt)}
                  </p>

                  {blog.description && (
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                      {blog.description}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{blog.author || "Admin"}</span>
                    <span>👁️ {blog.views || 0}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-600 rounded hover:border-pink-500 disabled:opacity-50 transition"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded transition ${
                      currentPage === page
                        ? "bg-pink-500 text-white"
                        : "border border-gray-600 hover:border-pink-500"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-600 rounded hover:border-pink-500 disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
