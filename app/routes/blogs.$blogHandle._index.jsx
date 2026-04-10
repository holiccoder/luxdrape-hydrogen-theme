import {Link, useLoaderData} from 'react-router';
import {Image, getPaginationVariables} from '@shopify/hydrogen';
import {
  SearchIcon,
  ClockIcon,
  ArrowRightIcon,
  TagIcon,
  TrendingUpIcon,
} from 'lucide-react';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {Input} from '~/components/ui/input';
import {Badge} from '~/components/ui/badge';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.blog.title ?? ''} blog`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request, params}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables,
      },
    }),
  ]);

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.blogHandle, data: blog});

  return {blog};
}

function loadDeferredData() {
  return {};
}

export default function Blog() {
  /** @type {LoaderReturnData} */
  const {blog} = useLoaderData();
  const articles = blog.articles?.nodes ?? [];
  const featuredArticles = articles.slice(0, 2);
  const remainingArticles = articles.slice(2);

  return (
    <>
      <section className="w-full bg-[hsl(220_25%_95%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]">
              {blog.title}
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {blog.seo?.title || blog.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {blog.seo?.description ||
                'Stories, guides, and design inspiration from our latest journal entries.'}
            </p>

            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles on this page..."
                className="w-full pl-12 h-12 text-base border-border bg-background"
                onChange={(event) => {
                  const query = event.currentTarget.value.toLowerCase();
                  const cards = document.querySelectorAll('[data-blog-article]');

                  cards.forEach((card) => {
                    const searchableText =
                      card.getAttribute('data-search')?.toLowerCase() || '';
                    card.style.display =
                      query === '' || searchableText.includes(query) ? '' : 'none';
                  });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {featuredArticles.length > 0 ? (
        <section className="w-full bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUpIcon className="h-5 w-5 text-[hsl(220_25%_25%)]" />
              <h2 className="text-2xl font-semibold">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="w-full bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">All Articles</h2>
            <span className="text-muted-foreground">
              {blog.articles?.nodes?.length ?? 0} articles
            </span>
          </div>

          {remainingArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {remainingArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          ) : featuredArticles.length === 0 ? (
            <div className="text-center py-16">
              <TagIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : null}

          <PaginatedResourceSection
            connection={blog.articles}
            resourcesClassName="hidden"
          >
            {() => null}
          </PaginatedResourceSection>
        </div>
      </section>
    </>
  );
}

/**
 * @param {{
 *   article: ArticleItemFragment;
 *   loading?: HTMLImageElement['loading'];
 *   featured?: boolean;
 * }}
 */
function ArticleCard({article, loading, featured = false}) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article
      className="group cursor-pointer border border-border bg-card overflow-hidden"
      data-blog-article
      data-search={`${article.title} ${article.excerpt || ''} ${article.author?.name || ''}`}
    >
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
        {article.image ? (
          <div className={featured ? 'aspect-[16/9] overflow-hidden' : 'aspect-[4/3] overflow-hidden'}>
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className={featured ? 'p-6' : 'p-5'}>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary" className="text-xs">
              {article.blog.handle}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {publishedAt}
            </span>
          </div>
          <h3
            className={`font-semibold mb-2 group-hover:text-[hsl(220_25%_25%)] transition-colors ${
              featured ? 'text-xl' : 'line-clamp-2'
            }`}
          >
            {article.title}
          </h3>
          {article.excerpt ? (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>
          ) : null}
          <div className="flex items-center text-sm font-medium text-[hsl(220_25%_25%)]">
            Read Article
            <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    blog {
      handle
    }
    contentHtml
    excerpt
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle._index').Route} Route */
/** @typedef {import('storefrontapi.generated').ArticleItemFragment} ArticleItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
