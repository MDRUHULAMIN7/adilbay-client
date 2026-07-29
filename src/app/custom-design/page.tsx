import { CustomDesignWizard } from '@/features/custom-design/custom-design-wizard';

export const metadata = {
  title: 'Make Your Own Design — Custom Woodcraft Studio | Furnixo',
  description:
    'Design your dream solid wood furniture your way. Choose wood, polish, dimensions, and submit for custom crafting by Furnixo master artisans.',
};

export default function CustomDesignPage() {
  return <CustomDesignWizard />;
}
