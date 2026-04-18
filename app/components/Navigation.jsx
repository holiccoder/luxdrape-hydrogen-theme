import {useState} from 'react';
import {Link} from 'react-router';
import {ChevronDown, FileText, Briefcase, Users, Ruler, Wrench, ShoppingCart, Layers} from 'lucide-react';
import {Badge} from '~/components/ui/badge';

// Icon mapping for dropdown items
const iconMap = {
  'file-text': FileText,
  'briefcase': Briefcase,
  'users': Users,
  'ruler': Ruler,
  'wrench': Wrench,
  'shopping-cart': ShoppingCart,
  'layers': Layers,
};

export function Navigation({items}) {
  const [activeMenu, setActiveMenu] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <nav className="hidden md:flex items-center gap-1">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setActiveMenu(index)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {item.type === 'mega_menu' ? (
            <MegaMenuItem item={item} isActive={activeMenu === index} />
          ) : item.type === 'dropdown' ? (
            <DropdownMenuItem item={item} isActive={activeMenu === index} />
          ) : (
            <SimpleLinkItem item={item} />
          )}
        </div>
      ))}
    </nav>
  );
}

function MegaMenuItem({item, isActive}) {
  return (
    <>
      <button
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted/50 ${
          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {item.label}
        <ChevronDown className="h-4 w-4 transition-transform" />
      </button>

      {isActive && item.columns && (
        <div className="absolute top-full left-0 pt-4 z-50">
          <div className="rounded-xl border border-gray-200 bg-white shadow-lg p-6 min-w-[1000px]">
            <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))${item.featuredCard ? ' 300px' : ''}` }}>
              {item.columns.map((column, colIndex) => (
                <div key={colIndex}>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">{column.title}</h3>
                  
                  {column.layoutType === 'visual_grid' && column.blocks ? (
                    <div className="space-y-2">
                      {column.blocks.map((block, blockIndex) => (
                        <Link
                          key={blockIndex}
                          to={block.url}
                          className="group block"
                          target={block.url.startsWith('http') ? '_blank' : undefined}
                          rel={block.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {block.imageUrl ? (
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <img
                                src={block.imageUrl}
                                alt={block.label}
                                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                              />
                              <div>
                                <div className="text-sm font-medium text-foreground group-hover:text-primary">
                                  {block.label}
                                </div>
                                {block.subLabel && (
                                  <div className="text-[11px] text-muted-foreground mt-0.5">
                                    {block.subLabel}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col justify-center py-2 px-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <span className="text-sm text-foreground group-hover:text-primary">
                                {block.label}
                              </span>
                              {block.subLabel && (
                                <span className="text-[11px] text-muted-foreground mt-0.5">
                                  {block.subLabel}
                                </span>
                              )}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  ) : column.items ? (
                    <ul className="space-y-1">
                      {column.items.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            to={link.url}
                            className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                            target={link.url.startsWith('http') ? '_blank' : undefined}
                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            <span className="text-sm text-foreground group-hover:text-primary">
                              {link.label}
                            </span>
                            {link.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {link.badge}
                              </Badge>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              {item.featuredCard && (
                <div className="hidden lg:block">
                  <Link
                    to={item.featuredCard.url}
                    className="group block rounded-lg overflow-hidden border border-gray-200 bg-muted/30 hover:bg-muted/50 transition-colors"
                    target={item.featuredCard.url.startsWith('http') ? '_blank' : undefined}
                    rel={item.featuredCard.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.featuredCard.image && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.featuredCard.image}
                          alt={item.featuredCard.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-semibold text-sm mb-1 text-foreground">
                        {item.featuredCard.title}
                      </h4>
                      {(item.featuredCard.subtitle || item.featuredCard.subTitle) && (
                        <p className="text-xs text-muted-foreground">
                          {item.featuredCard.subtitle || item.featuredCard.subTitle}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DropdownMenuItem({item, isActive}) {
  return (
    <>
      <button
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted/50 ${
          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {item.label}
        <ChevronDown className="h-4 w-4 transition-transform" />
      </button>

      {isActive && item.items && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-2 min-w-[200px]">
            <ul className="space-y-1">
              {item.items.map((link, index) => {
                const IconComponent = link.icon ? iconMap[link.icon] : null;
                return (
                  <li key={index}>
                    <Link
                      to={link.url}
                      className="flex items-center gap-2 py-2 px-3 text-sm text-foreground hover:bg-muted/50 rounded-md transition-colors"
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function SimpleLinkItem({item}) {
  return (
    <Link
      to={item.url}
      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
      target={item.url.startsWith('http') ? '_blank' : undefined}
      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {item.label}
    </Link>
  );
}
