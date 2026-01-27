import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Blog from '@/lib/models/Blog';
import { handleError } from '@/lib/middleware/errorHandler';

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { type, content } = await req.json();

    if (!type || !content) {
      return NextResponse.json(
        {
          success: false,
          message: 'Type and content are required',
        },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    const newSection = {
      type,
      content,
      order: blog.content.length,
    };

    blog.content.push(newSection);
    await blog.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Content section added successfully',
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
