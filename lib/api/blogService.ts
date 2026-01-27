// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

// Get authorization header
const getAuthHeader = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface BlogContentSection {
  type: "text" | "image";
  content: string;
  order?: number;
  _id?: string;
}

export interface BlogData {
  _id?: string;
  title: string;
  slug?: string;
  description?: string;
  featuredImageUrl?: string;
  content: BlogContentSection[];
  author?: string;
  category?: string;
  tags?: string[];
  status?: "draft" | "published";
  views?: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface PaginationData {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface BlogsListResponse {
  success: boolean;
  data: BlogData[];
  pagination: PaginationData;
}

/**
 * Create a new blog post
 */
export async function createBlog(blogData: BlogData): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create blog");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

/**
 * Get all blogs with pagination and filtering
 */
export async function getAllBlogs(
  page = 1,
  limit = 10,
  status = "published"
): Promise<BlogsListResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status,
      sort: "-createdAt",
    });

    const response = await fetch(`${API_BASE_URL}/blogs?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

/**
 * Get all blogs for admin (including drafts)
 */
export async function getAllBlogsForAdmin(): Promise<BlogsListResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs?page=1&limit=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

/**
 * Get a single blog by ID or slug
 */
export async function getBlogById(idOrSlug: string): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${idOrSlug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch blog");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

/**
 * Get a single blog by ID for editing (with all content)
 */
export async function getBlogForEdit(id: string): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/edit/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch blog for editing");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog for edit:", error);
    throw error;
  }
}

/**
 * Update a blog post
 */
export async function updateBlog(
  id: string,
  blogData: Partial<BlogData>
): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update blog");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id: string): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete blog");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}

/**
 * Search blogs with filters
 */
export async function searchBlogs(
  query?: string,
  category?: string,
  tags?: string[]
): Promise<ApiResponse<BlogData[]>> {
  try {
    const params = new URLSearchParams({
      ...(query && { q: query }),
      ...(category && { category }),
      ...(tags && tags.length > 0 && { tags: tags.join(",") }),
    });

    const response = await fetch(`${API_BASE_URL}/blogs/search?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search blogs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
}

/**
 * Add a content section to a blog
 */
export async function addContentSection(
  blogId: string,
  section: BlogContentSection
): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(section),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add content section");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding content section:", error);
    throw error;
  }
}

/**
 * Remove a content section from a blog
 */
export async function removeContentSection(
  blogId: string,
  sectionId: string
): Promise<ApiResponse<BlogData>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs/${blogId}/content/${sectionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to remove content section");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing content section:", error);
    throw error;
  }
}

export default {
  createBlog,
  getAllBlogs,
  getAllBlogsForAdmin,
  getBlogById,
  getBlogForEdit,
  updateBlog,
  deleteBlog,
  searchBlogs,
  addContentSection,
  removeContentSection,
};

/**
 * ===== AUTHENTICATION FUNCTIONS =====
 */

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      username: string;
      role: string;
    };
  };
}

/**
 * Login admin user
 */
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Verify current auth token
 */
export async function verifyAuth(): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying auth:", error);
    throw error;
  }
}

/**
 * Logout (clear token on frontend)
 */
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}
