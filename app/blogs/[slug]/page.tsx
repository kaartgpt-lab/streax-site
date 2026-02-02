"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ContentSection {
  _id: string;
  type: "text" | "image";
  content: string;
  order: number;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  featuredImageUrl?: string;
  content: ContentSection[];
  author?: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  views: number;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${params.slug}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
      } else {
        setError(data.message || "Blog not found");
      }
    } catch (err) {
      setError("Error loading blog");
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-[#0b0d17] text-white min-h-screen py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="text-zinc-400 hover:text-white inline-block mb-8"
          >
            ← Back to Blogs
          </Link>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            <p className="mt-4 text-gray-400">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-[#0b0d17] text-white min-h-screen py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="text-zinc-400 hover:text-white inline-block mb-8"
          >
            ← Back to Blogs
          </Link>
          <div className="text-center py-12">
            <p className="text-red-400 text-xl">{error || "Blog not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-[#0b0d17] text-white min-h-screen py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blogs"
          className="text-zinc-400 hover:text-white inline-block mb-8 transition-colors"
        >
          ← Back to Blogs
        </Link>

        {/* Featured Image */}
        {blog.featuredImageUrl && (
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-gray-800 bg-gradient-to-r from-[#1B1E31] to-[#0F1222]">
            <img
              src={blog.featuredImageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Blog Header */}
        <div className="mb-8">
          {blog.category && (
            <span className="inline-block bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm mb-4">
              {blog.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            {blog.author && <span>By {blog.author}</span>}
            <span>•</span>
            <span>{formatDate(blog.createdAt)}</span>
            <span>•</span>
            <span>{blog.views} views</span>
          </div>
          {blog.description && (
            <p className="text-lg text-gray-300 mt-4">{blog.description}</p>
          )}
        </div>

        {/* Blog Content */}
        <div className="prose prose-invert max-w-none">
          {blog.content && blog.content.length > 0 ? (
            blog.content
              .sort((a, b) => a.order - b.order)
              .map((section, index) => {
                if (section.type === "image") {
                  return (
                    <div
                      key={section._id || `image-${index}`}
                      className="my-8 rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-r from-[#1B1E31] to-[#0F1222]"
                    >
                      <img
                        src={section.content}
                        alt="Blog content"
                        className="w-full h-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `
                              <div class="flex items-center justify-center p-8 text-gray-400">
                                <p>Image unavailable</p>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={section._id || `text-${index}`}
                      className="text-gray-300 leading-relaxed my-6 whitespace-pre-wrap"
                    >
                      {section.content}
                    </div>
                  );
                }
              })
          ) : (
            <p className="text-gray-400">No content available.</p>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
