import {Link, useLoaderData} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {ArrowLeftIcon, ClockIcon} from 'lucide-react';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {Badge} from '~/components/ui/badge';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.article.title ?? ''} article`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request, params}) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return {article};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData() {
  return {};
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const {article} = useLoaderData();
  const {title, image, contentHtml, author, blog} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="bg-background">
      <section className="w-full bg-[hsl(220_25%_95%)]">
        <div className="blog-article-shell mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <Link
            to={`/blogs/${blog?.handle}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(220_25%_25%)] transition-colors mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to {blog?.handle || 'blog'}
          </Link>
          <div className="w-full">
            <Badge className="mb-4 bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]">
              {blog?.handle || 'Article'}
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-5">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                <time dateTime={article.publishedAt}>{publishedDate}</time>
              </span>
              {author?.name ? (
                <span className="inline-flex items-center gap-1.5">
                  By <span className="text-foreground">{author.name}</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="blog-article-shell mx-auto px-4 sm:px-6 lg:px-8">
          {image ? (
            <div className="overflow-hidden rounded-[1.5rem] bg-muted shadow-sm mb-10">
              <Image
                data={image}
                sizes="(min-width: 1024px) 60vw, 100vw"
                loading="eager"
                className="w-full h-auto object-cover"
              />
            </div>
          ) : null}
          <article
            dangerouslySetInnerHTML={{__html: contentHtml}}
            className="blog-article-content"
          />
        </div>
      </section>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        blog {
          handle
        }
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
