import {useEffect, useState, useCallback} from 'react';
import {Star} from 'lucide-react';

/**
 * Write a Review Form component
 */
function WriteReviewForm({productId}) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (rating === 0 || !name || !email || !body) return;

    setSubmitting(true);
    try {
      const res = await fetch('https://judge.me/api/v1/reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          shop_domain: 'zi3ym0-dh.myshopify.com',
          platform: 'shopify',
          id: productId,
          name,
          email,
          rating,
          title,
          body,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  }, [rating, name, email, title, body, productId]);

  if (submitted) {
    return (
      <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
        <p className="text-emerald-800 font-medium">Thank you for your review!</p>
        <p className="text-emerald-600 text-sm mt-1">Your review has been submitted and will appear after approval.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-6 border-2 border-slate-800 text-slate-800 font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors"
        >
          Write a Review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Write a Review</h3>

          {/* Star Rating */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Summarize your experience"
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-sm font-medium text-gray-700">Review *</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
              placeholder="Share your experience with this product..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="px-6 py-2.5 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Customer Reviews section that renders Judge.me widget HTML.
 * Loads Judge.me's JS to hydrate the widget (enables "Write a review" form).
 */
export function CustomerReviews({judgeMeReviews}) {
  const widgetHtml = judgeMeReviews?.widget;

  useEffect(() => {
    if (!widgetHtml) return;
    const existingScript = document.querySelector('script[src*="judge.me"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.judge.me/widget_prebuilt.js';
    script.async = true;
    script.dataset.shopDomain = 'zi3ym0-dh.myshopify.com';
    document.body.appendChild(script);
  }, [widgetHtml]);

  if (!widgetHtml) {
    return null;
  }

  // Extract product external ID from widget for the form submission
  const productIdMatch = widgetHtml.match(/data-product-url='\/products\/([^']+)'/);
  const productHandle = productIdMatch ? productIdMatch[1] : null;

  return (
    <div className="mt-16 pt-16 border-t border-gray-200">
      <style
        dangerouslySetInnerHTML={{
          __html: judgeMeStyles,
        }}
      />
      <WriteReviewForm productId={productHandle} />
      <div
        className="jdgm-widget"
        dangerouslySetInnerHTML={{__html: widgetHtml}}
      />
    </div>
  );
}

const judgeMeStyles = `
  /* Judge.me Widget Styles */
  .jdgm-rev-widg {
    display: block !important;
    font-family: inherit;
    color: #1e293b;
  }

  /* Header */
  .jdgm-rev-widg__header {
    margin-bottom: 2rem;
  }
  .jdgm-rev-widg__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.75rem;
  }
  .jdgm-rev-widg__summary {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .jdgm-rev-widg__summary-stars {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .jdgm-rev-widg__summary-text {
    font-size: 0.875rem;
    color: #6b7280;
  }

  /* Stars */
  .jdgm-star {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    position: relative;
  }
  .jdgm-star::before {
    content: '★';
    font-size: 1.125rem;
    line-height: 1;
  }
  .jdgm-star.jdgm--on::before {
    color: #f59e0b;
  }
  .jdgm-star.jdgm--off::before {
    color: #d1d5db;
  }

  /* Histogram */
  .jdgm-histogram {
    display: flex !important;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 1.5rem;
    max-width: 320px;
  }
  .jdgm-histogram__row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
  }
  .jdgm-histogram__star {
    display: flex;
    align-items: center;
    gap: 1px;
    min-width: 90px;
  }
  .jdgm-histogram__star .jdgm-star {
    width: 0.75rem;
    height: 0.75rem;
  }
  .jdgm-histogram__star .jdgm-star::before {
    font-size: 0.75rem;
  }
  .jdgm-histogram__bar {
    flex: 1;
    height: 8px;
    background: #f3f4f6;
    border-radius: 4px;
    overflow: hidden;
  }
  .jdgm-histogram__bar-content {
    height: 100%;
    background: #f59e0b;
    border-radius: 4px;
    transition: width 0.3s;
  }
  .jdgm-histogram__percentage {
    min-width: 32px;
    text-align: right;
    color: #6b7280;
    font-size: 0.75rem;
  }
  .jdgm-histogram__frequency {
    min-width: 24px;
    color: #9ca3af;
    font-size: 0.75rem;
  }
  .jdgm-histogram__clear-filter {
    display: none;
  }

  /* Sort wrapper (hide) */
  .jdgm-rev-widg__sort-wrapper {
    display: none;
  }

  /* Reviews list */
  .jdgm-rev-widg__body {
    display: block !important;
  }
  .jdgm-rev-widg__reviews {
    display: flex !important;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Individual review */
  .jdgm-rev {
    display: block !important;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background: #fff;
  }
  .jdgm-divider-top {
    border-top: none;
  }
  .jdgm-rev__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  .jdgm-rev__icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #475569;
    font-size: 0.875rem;
  }
  .jdgm-rev__rating {
    display: flex;
    align-items: center;
    gap: 1px;
  }
  .jdgm-rev__rating .jdgm-star {
    width: 0.875rem;
    height: 0.875rem;
  }
  .jdgm-rev__rating .jdgm-star::before {
    font-size: 0.875rem;
  }
  .jdgm-rev__timestamp {
    font-size: 0.75rem;
    color: #9ca3af;
  }
  .jdgm-rev__br {
    flex-basis: 100%;
    height: 0;
  }
  .jdgm-rev__buyer-badge-wrapper {
    display: inline-flex;
  }
  .jdgm-rev__buyer-badge::after {
    content: 'Verified Purchase';
    font-size: 0.6875rem;
    font-weight: 500;
    color: #047857;
    background: #ecfdf5;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }
  .jdgm-rev__author-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }
  .jdgm-rev__author {
    font-weight: 500;
    color: #1e293b;
    font-size: 0.875rem;
  }
  .jdgm-rev__location,
  .jdgm-rev__source {
    display: none;
  }

  /* Review content */
  .jdgm-rev__content {
    margin-top: 0.5rem;
  }
  .jdgm-rev__custom-form {
    display: none;
  }
  .jdgm-rev__title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #0f172a;
    display: block;
    margin-bottom: 0.25rem;
  }
  .jdgm-rev__body {
    font-size: 0.875rem;
    line-height: 1.6;
    color: #4b5563;
  }
  .jdgm-rev__body p {
    margin: 0;
  }

  /* Review pictures */
  .jdgm-rev__pics {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    flex-wrap: wrap;
  }
  .jdgm-rev__pic-link {
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: 0.375rem;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    transition: border-color 0.2s;
  }
  .jdgm-rev__pic-link:hover {
    border-color: #94a3b8;
  }
  .jdgm-rev__pic-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .jdgm-rev__vids {
    display: none;
  }

  /* Transparency badge */
  .jdgm-rev__transparency-badge-wrapper {
    display: none;
  }

  /* Review actions (hide votes/social) */
  .jdgm-rev__actions {
    display: none;
  }

  /* Reply from store */
  .jdgm-rev__reply {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.375rem;
    border-left: 3px solid #cbd5e1;
  }
  .jdgm-rev__reply:empty,
  .jdgm-rev__reply:has(> :empty:only-child) {
    display: none;
    padding: 0;
    margin: 0;
  }
  .jdgm-rev__reply:not(:empty) {
    margin-bottom: 0.375rem;
  }
  .jdgm-rev__replier::after {
    content: 'Store Reply';
    font-size: 0.75rem;
    font-weight: 600;
    color: #475569;
  }
  .jdgm-rev__reply-content {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #4b5563;
  }
  .jdgm-rev__reply-content p {
    margin: 0 0 0.5rem 0;
  }
  .jdgm-rev__reply-content p:last-child {
    margin-bottom: 0;
  }

  /* Pagination (hide) */
  .jdgm-paginate {
    display: none !important;
  }
  .jdgm-rev-widg__paginate-spinner-wrapper {
    display: none;
  }

  /* Write review link (hide) */
  .jdgm-write-rev-link {
    display: none !important;
  }

  /* Spinner (hide) */
  .jdgm-spinner {
    animation: none;
  }
  .jdgm-rev__timestamp.jdgm-spinner::after {
    content: attr(data-content);
  }

  /* Loading state for images */
  .jdgm-rev__pic-link.jdgm--loading .jdgm-rev__pic-img {
    opacity: 1;
  }
  .jdgm-rev__pic-link.jdgm--loading .jdgm-rev__pic-img[data-src] {
    content: attr(data-src);
  }
`;

