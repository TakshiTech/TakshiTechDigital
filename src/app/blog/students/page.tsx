
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

//meta tags
export const metadata = {
  title: 'Digital Marketing Opportunities for Students By Takshi Tech Digital ',
  description: 'WDB offers students exciting career-starting roles, internships, and digital learning experiences to build skills and confidence for the future.',
  openGraph: {
    title: 'Digital Marketing Opportunities for Students By Takshi Tech Digital',
    description: 'WDB offers students exciting career-starting roles, internships, and digital learning experiences to build skills and confidence for the future.',
    images: ['/images/blogs/enabling-growth-how-the-best-digital-marketing-company-in-india-empowers-businesses.avif'],
    type: 'article',
  },
};

// Hardcode the blog post data
const blog = {
  slug: 'students',
  title: 'students',
  tag: 'Digital Marketing',
  date: 'June 25, 2025',
  image: 'https://assets.kpmg.com/is/image/kpmgcloud/students:cq5dam-web-1976-878?wid=1488&hei=662',
  content: `
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Students</h1>
    <p class=" text-gray-600 mb-6">WDB is the perfect launchpad for students eager to explore the digital marketing and tech landscape. Our internship and entry-level programs offer hands-on experience, real-world projects, and close mentorship from industry experts. You’ll gain practical knowledge while contributing meaningfully from day one.</p>

    <p class="text-gray-600 mb-4">We believe in nurturing young talent with structured learning, exposure to diverse teams, and guidance that accelerates both personal and professional growth. If you’re passionate, curious, and ready to learn, WDB is where your journey begins.</p>
  `,
};

// Hardcode related posts (same tag, excluding the current post)
const relatedPosts = [
  {
    slug: 'students',
    title: 'Students',
    date: 'June 25, 2025',
    tag: 'Digital Marketing',
  },
  {
    slug: 'how-to-write-release-notes',
    title: 'How to Write Release Notes: Best Practices, Template, Tools, and Examples for Product Releases',
    tag: 'Product Management',
    date: 'Jan 02, 2025',
  },
  {
    slug: '30-best-product-management-tools-for-2024',
    title: '30 Best Product Management Tools for 2024',
    tag: 'Product Management',
    date: 'Dec 30, 2025',
  },
];

export default function BlogPostPage() {
  return (
    <>

      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-12 mt-20">
        {/* Back to Blog Link */}
        <Link href="/careers" className="text-purple-600 hover:underline mb-4 inline-block">
          ← Back to Careers
        </Link>

        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {blog.tag} — {blog.date}
          </p>
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg mb-6"
            />
          )}
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-lg text-gray-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedBlog, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <p className="text-xs text-purple-600 mb-1">
                    {relatedBlog.tag} — {relatedBlog.date}
                  </p>
                  <Link href={`/blog/${relatedBlog.slug}`}>
                    <h4 className="text-md font-bold text-purple-700 hover:underline cursor-pointer">
                      {relatedBlog.title}
                    </h4>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}