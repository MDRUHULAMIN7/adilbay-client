import { MAIN_NAVIGATION } from '@/config/navigation';
import { MegaMenu } from '../mega-menu';

export function DesktopNavigation() {
  const getItemVisibilityClass = (index: number) => {
    if (index >= 4) return 'hidden 2xl:block'; // Items 5 & 6 (About Us, Contact) show on 2xl (1536px+)
    if (index === 3) return 'hidden xl:block';  // Item 4 (Industrial Furniture) hidden on 1024px (lg), shows on xl (1280px+)
    if (index === 2) return 'hidden lg:block';  // Item 3 (Corporate Furniture) shows on 1024px (lg+)
    return 'block'; // Items 1 & 2 (Home, Education) show on md (768px+)
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
