import {useState} from 'react';

/**
 * Real-Life Gallery section that renders images from the hydrogen_gallery metafield.
 * @param {{ product: object }} props
 */
export function RealLifeGallery({product}) {
  const galleryFields = product?.hydrogenGallery?.reference?.fields;
  const galleryField = galleryFields?.find((f) => f.key === 'gallery_image');
  const images = galleryField?.references?.nodes?.map((n) => n.image).filter(Boolean) || [];

  const [selectedImage, setSelectedImage] = useState(null);

  if (images.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-slate-900 mb-3">
            Real-Life Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our customers styled this product in their homes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={`${img.url}&width=400`}
                alt={img.altText || `Gallery image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-slate-800 hover:bg-white text-xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={`${selectedImage.url}&width=1200`}
              alt={selectedImage.altText || 'Gallery image'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}

