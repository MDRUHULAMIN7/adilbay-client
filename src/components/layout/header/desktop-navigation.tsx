import { MAIN_NAVIGATION } from '@/config/navigation';
import { MegaMenu } from '../mega-menu';

export function DesktopNavigation() {
  const getItemVisibilityClass = (index: number) => {
    if (index === 3) return 'hidden xl:block'; // Item 4 (Industrial Furniture) shows on xl+
    if (index === 2) return 'hidden lg:block'; // Item 3 (Corporate Furniture) shows on lg+
    return 'block'; // Items 1 & 2 (Home, Education) show on md+
  };

  return (
    <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 xl:gap-5 whitespace-nowrap shrink-0" aria-label="Main navigation">
      {MAIN_NAVIGATION.map((item, index) => (
        <div key={item.id} className={getItemVisibilityClass(index)}>
          <MegaMenu item={item} isFirst={index === 0} />
        </div>
      ))}
    </nav>
  );
}
export default DesktopNavigation;
