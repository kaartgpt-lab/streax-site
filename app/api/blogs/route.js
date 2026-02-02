import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Blog from '@/lib/models/Blog';
import generateSlug from '@/lib/utils/slugGenerator';
import { handleError } from '@/lib/middleware/errorHandler';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status') || 'published'; // Default to published for public
    const sort = searchParams.get('sort') || '-createdAt';

    const skip = (page - 1) * limit;

    const query = { status }; // Only show published blogs by default

    const blogs = await Blog.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-content');

    const total = await Blog.countDocuments(query);

    return NextResponse.json(
      {
        success: true,
        data: blogs,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { title, description, featuredImageUrl, content, author, category, tags, status } = await req.json();


    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: 'Title is required',
        },
        { status: 400 }
      );
    }


    let slug = generateSlug(title);


    let existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {

      slug = `${slug}-${Date.now()}`;
    }


    const contentArray = Array.isArray(content) ? content : [];

    const blog = await Blog.create({
      title,
      slug,
      description,
      featuredImageUrl,
      content: contentArray,
      author,
      category,
      tags: tags || [],
      status: status || 'draft',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
