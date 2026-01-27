import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Blog from '@/lib/models/Blog';
import { handleError } from '@/lib/middleware/errorHandler';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findById(id).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    // Ensure content is an array
    if (!blog.content) {
      blog.content = [];
    }

    // Log for debugging
    console.log('Fetched blog for edit:', {
      id: blog._id,
      title: blog.title,
      contentLength: blog.content ? blog.content.length : 0,
      content: blog.content,
    });

    return NextResponse.json(
      {
        success: true,
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
