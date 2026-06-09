import { Navigate, useParams } from "react-router-dom";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { getBlogPost } from "@/data/blog-posts";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return <BlogPostLayout post={post} />;
}
