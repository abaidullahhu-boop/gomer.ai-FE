import { Navigate, useParams } from "react-router-dom";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { getResearchPost } from "@/data/research-posts";

export default function ResearchPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getResearchPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/research" replace />;
  }

  return <BlogPostLayout post={post} backTo="/research" backLabel="Back to Research" />;
}
