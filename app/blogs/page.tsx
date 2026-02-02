"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  featuredImageUrl?: string;
  author?: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  views: number;
}

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs?status=published&limit=20");
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError("Failed to load blogs");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-[#0b0d17] text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-6xl font-extrabold mb-4">BLOG</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Gain access to exclusive data-driven insights.
        </p>

        {/* Subscribe */}
        <div className="flex justify-center items-center gap-3 mb-16 max-w-md mx-auto">
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            <p className="mt-4 text-gray-400">Loading blogs...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No blogs published yet.</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="bg-[#13172A] rounded-2xl p-5 border border-gray-800 hover:border-pink-500 transition-all duration-300 block"
              >
                {/* Featured Image */}
                <div className="h-40 rounded-xl mb-4 overflow-hidden bg-gradient-to-r from-[#1B1E31] to-[#0F1222] border border-gray-700">
                  {blog.featuredImageUrl ? (
                    <img
                      src={blog.featuredImageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `
                            <div class="flex items-center justify-center h-full text-center p-4">
                              <div>
                                <h2 class="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                                  ${blog.category || "Blog"}
                                </h2>
                                <p class="text-xs text-gray-400 mt-1">
                                  ${blog.author || "Streax"}
                                </p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-center p-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                          {blog.category || "Blog"}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                          {blog.author || "Streax"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Blog content */}
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {formatDate(blog.createdAt)}
                  </p>
                  {blog.description && (
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {blog.description}
                    </p>
                  )}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {blog.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
