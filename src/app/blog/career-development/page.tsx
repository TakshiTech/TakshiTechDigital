
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

//meta tags
export const metadata = {
  title: 'Career Development with Digital Marketing Skills | Web Digital Bazaar',
  description: 'Learn how WDB empowers career development with digital marketing training, real-time experience, upskilling, and personalized growth opportunities.',
  openGraph: {
    title: 'Career Development with Digital Marketing Skills',
    description: 'Learn how WDB empowers career development with digital marketing training, real-time experience, upskilling, and personalized growth opportunities.',
    images: ['/images/blogs/enabling-growth-how-the-best-digital-marketing-company-in-india-empowers-businesses.avif'],
    type: 'article',
  },
};

// Hardcode the blog post data
const blog = {
  slug: 'career-development',
  title: 'Career Development',
  tag: 'Digital Marketing',
  date: 'June 30, 2025',
  image: 'https://kpmg.com/adobe/dynamicmedia/deliver/dm-aid--192358d2-d97a-47bf-8828-7224b8e485c5/tax-intelligence-solution-gst-data-analytics.jpg?preferwebp=true&quality=82',
  content: `
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Career Development</h1>
    <p class=" text-gray-600 mb-6">Career growth is ingrained in Web Digital Bazaar's culture and is not merely a perk. We invest in every team member’s growth through upskilling programs, certifications, mentoring, and cross-functional training. No matter your role or experience level, you’ll find clear pathways to advancement and continuous learning.</p>

    <p class="text-gray-600 mb-4">Our goal is to ensure that your career evolves with your aspirations. With regular performance feedback and leadership support, WDB empowers you to take control of your professional future.</p>
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