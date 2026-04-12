import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { IconArrowLeft, IconCalendar, IconClock } from "@tabler/icons-react";

export const metadata = {
  title: "Blog — Shivam Patel",
  description: "Thoughts on software engineering, projects, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 sm:pt-40 pb-16 px-4">
      <div className="mx-auto max-w-2xl">
        <BlurFade delay={0.005} inView>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Thoughts on software engineering, projects, and things I find
            interesting.
          </p>
        </BlurFade>

        {posts.length === 0 ? (
          <BlurFade delay={0.01} inView>
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          </BlurFade>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post, idx) => (
              <BlurFade key={post.slug} delay={0.01 + idx * 0.05} inView>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="rounded-xl border p-6 transition-all hover:shadow-md hover:border-foreground/20 bg-background">
                    <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mt-2 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <IconCalendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <IconClock className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
