import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Blog from '@/lib/models/Blog';
import { handleError } from '@/lib/middleware/errorHandler';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');

    let query = { status: 'published' };

    if (q) {
      query.$text = { $search: q };
    }

    if (category) {
      query.category = category;
    }

    if (tags) {
      const tagArray = typeof tags === 'string' ? [tags] : tags;
      query.tags = { $in: tagArray };
    }

    const blogs = await Blog.find(query)
      .select('-content')
      .sort('-createdAt');

    return NextResponse.json(
      {
        success: true,
        count: blogs.length,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
