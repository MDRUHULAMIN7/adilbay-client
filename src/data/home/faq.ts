export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What types of wood do you use?',
    answer: 'We exclusively build with premium seasoned hardwoods: Burmese Teak, American Walnut, and European Oak. All lumber is kiln-dried to protect against borers and warp.',
  },
  {
    id: 'faq-2',
    question: 'Do you offer a warranty on solid wood furniture?',
    answer: 'Yes! Every solid wood item comes with a comprehensive 10-year warranty against wood-boring insects, structural splits, and joint defects.',
  },
  {
    id: 'faq-3',
    question: 'Can I customize dimensions or fabric colors?',
    answer: 'Absolutely. We offer tailormade customizations for dining tables, bed frames, and sofas. Contact our design consultants to select fabrics and verify sizes.',
  },
  {
    id: 'faq-4',
    question: 'What is your delivery timeframe inside Bangladesh?',
    answer: 'Standard in-stock furniture delivers within 3–7 business days. Custom crafted heritage furniture takes approximately 3–4 weeks for timber seasoning, crafting, and delivery.',
  },
];
