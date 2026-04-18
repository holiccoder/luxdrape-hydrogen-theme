import {useState, useEffect} from 'react';
import {Link} from 'react-router';

export function TopBar({items}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full bg-black text-white overflow-hidden relative h-10">
      <div className="w-[95%] max-w-[1600px] mx-auto h-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : isTransitioning && index === (currentIndex - 1 + items.length) % items.length
                  ? 'opacity-0 -translate-y-full'
                  : 'opacity-0 translate-y-full'
              }`}
            >
              {item.url ? (
                <Link
                  to={item.url}
                  className="text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap px-4"
                  target={item.url.startsWith('http') ? '_blank' : undefined}
                  rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.text}
                </Link>
              ) : (
                <span className="text-sm font-medium whitespace-nowrap px-4">
                  {item.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
