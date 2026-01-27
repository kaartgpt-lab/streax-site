import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Blog from '@/lib/models/Blog';
import { handleError } from '@/lib/middleware/errorHandler';

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id, sectionId } = await params;

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

    blog.content = blog.content.filter((section) => section._id.toString() !== sectionId);
    await blog.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Content section removed successfully',
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
