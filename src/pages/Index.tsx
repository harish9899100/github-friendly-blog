
import { useState } from "react";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost } from "@/components/BlogPost";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedPost } from "@/components/FeaturedPost";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything from setup to deployment.",
    content: `React and TypeScript make a powerful combination for building modern web applications. In this post, we'll explore how to set up a project, create components, and leverage TypeScript's type safety.

## Why React + TypeScript?

TypeScript brings static typing to JavaScript, which helps catch errors early in development and provides better IDE support. When combined with React, it creates a robust development experience.

## Getting Started

First, create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This sets up everything you need to start building with React and TypeScript.

## Creating Your First Component

Here's a simple example of a TypeScript React component:

\`\`\`tsx
interface Props {
  name: string;
  age: number;
}

const User: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};
\`\`\`

The beauty of TypeScript is that it will catch type errors at compile time, making your code more reliable.`,
    author: "John Doe",
    date: "2024-06-15",
    likes: 42,
    comments: 8,
    tags: ["React", "TypeScript", "Web Development"],
    featured: true,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring emerging trends and technologies that are shaping the future of web development in 2024 and beyond.",
    content: `The web development landscape is constantly evolving. Let's explore the trends that are shaping the future of how we build for the web.

## Key Trends

1. **AI-Powered Development Tools**: Tools like GitHub Copilot are changing how we write code
2. **Edge Computing**: Bringing computation closer to users for better performance
3. **WebAssembly**: Running high-performance applications in the browser
4. **Jamstack Architecture**: Static sites with dynamic functionality

These trends are not just buzzwords - they're fundamental shifts in how we approach web development.`,
    author: "Jane Smith",
    date: "2024-06-12",
    likes: 35,
    comments: 12,
    tags: ["Future", "Trends", "Web Development"],
    featured: false
  },
  {
    id: 3,
    title: "Building Accessible Web Applications",
    excerpt: "A comprehensive guide to creating web applications that are accessible to all users, including those with disabilities.",
    content: `Web accessibility ensures that websites and applications can be used by everyone, including people with disabilities. Here's how to build more accessible web applications.

## Core Principles

The WCAG guidelines are built on four principles:
- **Perceivable**: Information must be presentable in ways users can perceive
- **Operable**: Interface components must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough to be interpreted by assistive technologies

## Practical Tips

1. Use semantic HTML elements
2. Provide alternative text for images
3. Ensure keyboard navigation works
4. Use sufficient color contrast
5. Test with screen readers

Building accessible applications isn't just the right thing to do - it often results in better UX for everyone.`,
    author: "Mike Johnson",
    date: "2024-06-10",
    likes: 28,
    comments: 6,
    tags: ["Accessibility", "UX", "Web Standards"],
    featured: false
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState(blogPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to DevBlog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and thoughts on web development, 
            technology, and software engineering.
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <FeaturedPost post={featuredPost} onLike={handleLike} />
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogPost key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
