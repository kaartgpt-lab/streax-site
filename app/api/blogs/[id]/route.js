import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Blog from '@/lib/models/Blog';
import generateSlug from '@/lib/utils/slugGenerator';
import { handleError } from '@/lib/middleware/errorHandler';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

  
    let blog = await Blog.findOne({ slug: id });

    if (!blog) {
      blog = await Blog.findById(id);
    }

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog post not found',
        },
        { status: 404 }
      );
    }


    blog.views += 1;
    await blog.save();

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

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { title, description, featuredImageUrl, content, author, category, tags, status } = await req.json();

    let blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog post not found',
        },
        { status: 404 }
      );
    }


    if (title) {
      blog.title = title;
      blog.slug = generateSlug(title);
    }
    if (description !== undefined) blog.description = description;
    if (featuredImageUrl !== undefined) blog.featuredImageUrl = featuredImageUrl;
    if (content !== undefined) blog.content = Array.isArray(content) ? content : [];
    if (author !== undefined) blog.author = author;
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) blog.tags = tags;
    if (status !== undefined) blog.status = status;

    blog = await blog.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post updated successfully',
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post deleted successfully',
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
