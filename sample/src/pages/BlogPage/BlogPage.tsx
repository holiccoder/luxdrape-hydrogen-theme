import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  ClockIcon,
  ArrowRightIcon,
  TagIcon,
  TrendingUpIcon,
  PaletteIcon,
  HomeIcon,
  LightbulbIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';

// ============================================
// Blog Data
// ============================================

const blogCategories = [
  { id: 'all', label: 'All Articles', icon: null },
  { id: 'buying-guide', label: 'Buying Guides', icon: LightbulbIcon },
  { id: 'decor', label: 'Home Decor', icon: HomeIcon },
  { id: 'trends', label: 'Trends', icon: TrendingUpIcon },
  { id: 'color', label: 'Color & Style', icon: PaletteIcon },
];

const blogPosts = [
  {
    id: '1',
    title: 'How to Choose the Perfect Curtains for Every Room',
    excerpt: 'A comprehensive guide to selecting the right fabric, length, and style for your living room, bedroom, kitchen, and more.',
    category: 'buying-guide',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    readTime: '8 min read',
    date: 'Mar 10, 2026',
    featured: true,
  },
  {
    id: '2',
    title: '2026 Window Treatment Trends You Need to Know',
    excerpt: 'From natural textures to bold colors, discover the top curtain and shade trends shaping home interiors this year.',
    category: 'trends',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    readTime: '5 min read',
    date: 'Mar 8, 2026',
    featured: true,
  },
  {
    id: '3',
    title: 'Linen vs Cotton: Which Fabric is Right for You?',
    excerpt: 'Compare the pros and cons of two popular curtain fabrics to make an informed decision for your home.',
    category: 'buying-guide',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    readTime: '6 min read',
    date: 'Mar 5, 2026',
    featured: false,
  },
  {
    id: '4',
    title: 'Small Space Solutions: Curtains That Make Rooms Look Bigger',
    excerpt: 'Expert tips on using window treatments to create the illusion of more space in compact apartments and homes.',
    category: 'decor',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    readTime: '4 min read',
    date: 'Mar 2, 2026',
    featured: false,
  },
  {
    id: '5',
    title: 'The Psychology of Color: Choosing Curtain Colors for Mood',
    excerpt: 'Learn how different colors affect your mood and which shades work best for bedrooms, offices, and living spaces.',
    category: 'color',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    readTime: '7 min read',
    date: 'Feb 28, 2026',
    featured: false,
  },
  {
    id: '6',
    title: 'Layering Window Treatments: A Designer\'s Guide',
    excerpt: 'Master the art of combining curtains with shades or blinds for a polished, high-end look.',
    category: 'decor',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    readTime: '6 min read',
    date: 'Feb 25, 2026',
    featured: false,
  },
  {
    id: '7',
    title: 'Sustainable Fabrics: Eco-Friendly Curtain Options',
    excerpt: 'Explore environmentally conscious fabric choices that don\'t compromise on style or quality.',
    category: 'trends',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda',
    readTime: '5 min read',
    date: 'Feb 22, 2026',
    featured: false,
  },
  {
    id: '8',
    title: 'Velvet Curtains: Adding Luxury to Your Home',
    excerpt: 'Why velvet is making a comeback and how to incorporate this rich fabric into your interior design.',
    category: 'color',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5f909e47df72474caafcd3b191e077fd_ve_miaoda',
    readTime: '5 min read',
    date: 'Feb 18, 2026',
    featured: false,
  },
];

// ============================================
// Blog Page Component
// ============================================

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_95%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]">
              Design Inspiration
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              The LuxDrape Journal
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Expert tips, design inspiration, and everything you need to know about 
              custom window treatments.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 h-12 text-base border-border bg-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-[hsl(220_25%_25%)] text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'all' && searchQuery === '' && (
        <section className="w-full bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUpIcon className="h-5 w-5 text-[hsl(220_25%_25%)]" />
              <h2 className="text-2xl font-semibold">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group cursor-pointer border border-border bg-card overflow-hidden"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {blogCategories.find((c) => c.id === post.category)?.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[hsl(220_25%_25%)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-medium text-[hsl(220_25%_25%)]">
                      Read Article
                      <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="w-full bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              {activeCategory === 'all' ? 'All Articles' : blogCategories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <span className="text-muted-foreground">
              {filteredPosts.length} articles
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <TagIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === 'all' && searchQuery === ''
                ? filteredPosts.filter((p) => !p.featured)
                : filteredPosts
              ).map((post) => (
                <article
                  key={post.id}
                  className="group cursor-pointer border border-border bg-card overflow-hidden"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {blogCategories.find((c) => c.id === post.category)?.label}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-[hsl(220_25%_25%)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="w-full bg-[hsl(220_25%_25%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Get Design Tips Delivered
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter for exclusive design tips, new product alerts, 
              and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="h-12 px-8 bg-white text-[hsl(220_25%_25%)] hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
