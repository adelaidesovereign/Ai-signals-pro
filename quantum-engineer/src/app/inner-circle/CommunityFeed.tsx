"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Comment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

type Post = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  comments: Comment[];
};

export function CommunityFeed({
  initialPosts,
  canPost,
  currentUserName,
}: {
  initialPosts: Post[];
  canPost: boolean;
  currentUserName: string;
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setLoading(true);
    const res = await fetch("/api/community/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: draft }),
    });
    if (res.ok) {
      const { post } = await res.json();
      setPosts([
        {
          id: post.id,
          body: post.body,
          createdAt: post.createdAt,
          author: currentUserName,
          comments: [],
        },
        ...posts,
      ]);
      setDraft("");
    }
    setLoading(false);
  }

  async function comment(postId: string, body: string) {
    const res = await fetch("/api/community/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, body }),
    });
    if (res.ok) {
      const { comment } = await res.json();
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    id: comment.id,
                    body: comment.body,
                    createdAt: comment.createdAt,
                    author: currentUserName,
                  },
                ],
              }
            : p,
        ),
      );
    }
  }

  return (
    <div className="space-y-6">
      {canPost ? (
        <form
          onSubmit={createPost}
          className="rounded-soft border border-sage/15 bg-cream-warm p-6 shadow-card"
        >
          <Textarea
            id="new-post"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            placeholder="What is alive for you in the practice today?"
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/55">
              Posting as {currentUserName}
            </p>
            <Button type="submit" size="sm" disabled={loading || !draft.trim()}>
              {loading ? "Posting" : "Post"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-soft border border-sage/15 bg-cream-warm p-6 text-sm text-sage-deep/75">
          Join the Inner Circle to post and reply. The feed is visible in
          preview once you are in.
        </div>
      )}

      <div className="space-y-6">
        {posts.length === 0 && (
          <p className="text-sm italic text-sage-deep/60">
            The feed is quiet right now. The first post is always the one that
            opens the room.
          </p>
        )}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            canReply={canPost}
            onComment={(body) => comment(post.id, body)}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
  canReply,
  onComment,
}: {
  post: Post;
  canReply: boolean;
  onComment: (body: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    await onComment(draft);
    setDraft("");
    setOpen(true);
  }

  return (
    <article className="rounded-soft border border-sage/10 bg-cream-warm p-6 shadow-card">
      <div className="flex items-center justify-between">
        <p className="font-serif text-lg text-sage">{post.author}</p>
        <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/50">
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-sage-deep/90">
        {post.body}
      </p>

      {post.comments.length > 0 && (
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 font-sans text-[11px] uppercase tracking-[0.15em] text-sage hover:text-sage-deep"
        >
          {open ? "Hide" : `Show ${post.comments.length} replies`}
        </button>
      )}

      {open && post.comments.length > 0 && (
        <div className="mt-4 space-y-3 border-l border-sage/15 pl-4">
          {post.comments.map((c) => (
            <div key={c.id}>
              <p className="font-sans text-xs text-sage">{c.author}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-sage-deep/85">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {canReply && (
        <form onSubmit={submit} className="mt-4 flex gap-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Reply"
            className="flex-1 rounded-soft border border-sage/20 bg-cream px-4 py-2 text-sm text-sage-deep outline-none focus:border-sage"
          />
          <Button type="submit" size="sm" variant="secondary">
            Send
          </Button>
        </form>
      )}
    </article>
  );
}
