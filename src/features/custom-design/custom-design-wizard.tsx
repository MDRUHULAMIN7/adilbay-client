'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useToast } from '@/components/ui/toast';

const STEPS = [
  { id: 1, label: 'Type', subtitle: 'Choose Furniture Category' },
  { id: 2, label: 'Customize', subtitle: 'Select Style, Material & Color' },
  { id: 3, label: 'Pricing', subtitle: 'Pricing & Guarantee' },
  { id: 4, label: 'Order', subtitle: 'Submit Your Design Details' },
];

const FURNITURE_TYPES = [
  { id: 'bed', label: 'Bed', icon: '🛏️', description: 'King, Queen & Storage Beds' },
  { id: 'wardrobe', label: 'Wardrobe', icon: '🚪', description: '2-Door, 3-Door & Sliding' },
  { id: 'sofa', label: 'Sofa', icon: '🛋️', description: '2-Seater, L-Shape & Sectional' },
  { id: 'chair', label: 'Chair', icon: '🪑', description: 'Armchair, Lounge & Ergonomic' },
  { id: 'dressing', label: 'Dressing Table', icon: '💄', description: 'Mirror Vanity & Drawers' },
  { id: 'dining', label: 'Dining Table', icon: '🍽️', description: '4, 6 & 8 Seater Sets' },
  { id: 'table', label: 'Table', icon: '🪵', description: 'Coffee & Side Tables' },
  { id: 'desk', label: 'Office Desk', icon: '🖥️', description: 'Executive & Study Desks' },
  { id: 'storage', label: 'Storage', icon: '📦', description: 'Cabinets & Chest of Drawers' },
  { id: 'tv-cabinet', label: 'TV Cabinet', icon: '📺', description: 'Media Console Units' },
  { id: 'bookshelf', label: 'Bookshelf', icon: '📚', description: 'Open & Glass Shelves' },
  { id: 'dolna', label: 'Dolna / Swing', icon: '🛖', description: 'Solid Teak Wooden Swings' },
];

const PRESET_INSPIRATIONS = [
  {
    title: 'King Bed - Teak',
    type: 'Bed',
    size: 'King Size (6ft x 7ft)',
    material: 'Teak (Segun)',
    finish: 'Warm Matte',
    color: 'Walnut Brown',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: '3-Door Wardrobe',
    type: 'Wardrobe',
    size: '3-Door Heavy Duty',
    material: 'Teak (Segun)',
    finish: 'Glossy Finish',
    color: 'Natural Amber',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'L-Shape Luxury Sofa',
    type: 'Sofa',
    size: 'L-Shape 6-Seater',
    material: 'Teak + Premium Linen',
    finish: 'Natural Wood',
    color: 'Cream & Teak',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: '6-Seat Dining Set',
    type: 'Dining Table',
    size: '6-Seater Oval',
    material: 'Teak (Segun)',
    finish: 'Warm Glossy',
    color: 'Dark Teak',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=400',
  },
];

const SIZE_OPTIONS = ['2-Seater', '3-Seater', 'L-Shape', 'Sectional', 'Custom Dimensions'];
const MATERIAL_OPTIONS = [
  'Teak (Segun)',
  'American Walnut',
  'Mahogany',
  'MDF Board',
  'Melamine Board',
  'PVC Board',
  'Custom Wood',
];
const FINISH_OPTIONS = ['Glossy Lacquer', 'Warm Matte', 'Natural Wood Grain', 'PU Protective'];
const COLOR_POLISHES = [
  { name: 'Walnut Brown', hex: '#5c3a21' },
  { name: 'Natural Amber', hex: '#b87333' },
  { name: 'Mahogany Red', hex: '#4a150e' },
  { name: 'Matte Black', hex: '#1c1917' },
  { name: 'Cream Oak', hex: '#d6c7b2' },
];

export function CustomDesignWizard() {
  const { addToast } = useToast();
  const wizardTopRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedType, setSelectedType] = useState<string>('Sofa');
  const [selectedSize, setSelectedSize] = useState<string>('2-Seater');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Teak (Segun)');
  const [selectedFinish, setSelectedFinish] = useState<string>('Glossy Lacquer');
  const [selectedColor, setSelectedColor] = useState<string>('Walnut Brown');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  // User Details Form State
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userDistrict, setUserDistrict] = useState<string>('Mirpur, Dhaka');
  const [userBudget, setUserBudget] = useState<string>('30,000 - 50,000 BDT');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [roomPhoto, setRoomPhoto] = useState<string | null>(null);

  const [submittedOrder, setSubmittedOrder] = useState<{
    orderId: string;
    type: string;
    size: string;
    material: string;
    color: string;
    finish: string;
    name: string;
    phone: string;
  } | null>(null);

  const wizardCardRef = useRef<HTMLDivElement>(null);

  // Auto focus to wizard card top smoothly on step change
  useEffect(() => {
    if (wizardCardRef.current) {
      const rect = wizardCardRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.top > 250) {
        wizardCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentStep, submittedOrder]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_INSPIRATIONS[0]) => {
    setSelectedType(preset.type);
    setSelectedSize(preset.size);
    setSelectedMaterial(preset.material);
    setSelectedFinish(preset.finish);
    setSelectedColor(preset.color);
    addToast({
      title: `Applied "${preset.title}" Preset`,
      description: 'Design preferences pre-filled! You can customize them in Step 2.',
      variant: 'success',
    });
    setCurrentStep(2);
  };

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setReferenceImage(event.target?.result as string);
      addToast({
        title: 'Reference Image Uploaded',
        description: 'Photo attached to your custom design specification.',
        variant: 'info',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRoomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setRoomPhoto(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone) {
      addToast({
        title: 'Missing Required Fields',
        description: 'Please fill in your name and phone number so our team can reach out.',
        variant: 'warning',
      });
      return;
    }

    const orderId = `FX-DESIGN-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission = {
      orderId,
      type: selectedType,
      size: selectedSize,
      material: selectedMaterial,
      color: selectedColor,
      finish: selectedFinish,
      name: userName,
      phone: userPhone,
    };

    setSubmittedOrder(newSubmission);
    addToast({
      title: 'Design Order Submitted! 🎉',
      description: `Reference #${orderId} received. Our master craftsman will call you within 24 hours.`,
      variant: 'success',
    });
  };

  const getWhatsAppMessage = () => {
    const msg = `Hi Furnixo! I submitted a Custom Furniture Design:
*Order Reference:* ${submittedOrder?.orderId || 'Custom Draft'}
*Furniture Type:* ${selectedType}
*Size / Style:* ${selectedSize}
*Material:* ${selectedMaterial}
*Finish:* ${selectedFinish}
*Color:* ${selectedColor}
*Name:* ${userName || 'Customer'}
*Phone:* ${userPhone || 'Provided'}
*Location:* ${userDistrict}
*Budget Range:* ${userBudget}
*Special Notes:* ${specialRequirements || 'None'}

Please share estimated pricing and timber advice!`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="w-full bg-background min-h-screen text-foreground text-left">
      {/* Top Banner Header with Project Primary Theme Styling */}
      <div ref={wizardTopRef} className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-12 bg-stone-900 dark:bg-stone-950 text-white shadow-2xl border-b border-stone-800">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 z-0 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-96 w-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <Container variant="wide" className="relative z-10 flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold uppercase tracking-wider">
            <Icon name="star" className="h-3.5 w-3.5 text-primary fill-primary" />
            Furnixo Custom Studio
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-stone-100 tracking-tight">
            Make Your <span className="text-primary italic">Own Design</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed font-light mt-1">
            Design your dream furniture your way &mdash; we&apos;ll craft and deliver it right to your door.
          </p>
        </Container>

        {/* Step Indicator Tracker Bar with Animated Progress Line */}
        <div className="relative z-10 max-w-4xl mx-auto mt-8 px-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-stone-800 -translate-y-1/2 z-0 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    if (step.id < currentStep) setCurrentStep(step.id);
                  }}
                  className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground border-primary font-bold scale-105 shadow-lg shadow-primary/30'
                      : isCompleted
                      ? 'bg-stone-800 text-emerald-400 border-emerald-500/40 font-semibold'
                      : 'bg-stone-900 text-stone-400 border-stone-700 font-medium'
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-stone-950 text-primary'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {isCompleted ? '✓' : step.id}
                  </span>
                  <span className="text-xs hidden sm:inline">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Wizard Form Body Workspace */}
      <div ref={wizardCardRef} className="scroll-mt-28 w-full">
        <Container variant="wide" className="py-10 sm:py-14 max-w-4xl">
        {submittedOrder ? (
          /* Submission Success State Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-2xl flex flex-col items-center text-center gap-6"
          >
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center text-3xl shadow-lg">
              ✓
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Design Submitted Successfully
              </span>
              <Heading level={2} className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
                Thank You, {submittedOrder.name}!
              </Heading>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                Your custom design order reference is <strong className="text-foreground font-mono">{submittedOrder.orderId}</strong>. Our senior woodcraft consultant will call you at <span className="font-mono text-primary font-bold">{submittedOrder.phone}</span> within 24 hours.
              </p>
            </div>

            {/* Design Summary Recap Card */}
            <div className="w-full max-w-md p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs flex flex-col gap-2.5 text-left">
              <span className="font-bold text-foreground uppercase tracking-wider text-[11px] border-b border-stone-200 dark:border-stone-800 pb-2">
                Custom Specification Summary
              </span>
              <div className="grid grid-cols-2 gap-2 text-stone-600 dark:text-stone-300">
                <span>Furniture Type:</span>
                <strong className="text-foreground text-right">{submittedOrder.type}</strong>
                <span>Size / Style:</span>
                <strong className="text-foreground text-right">{submittedOrder.size}</strong>
                <span>Material Wood:</span>
                <strong className="text-foreground text-right">{submittedOrder.material}</strong>
                <span>Finish &amp; Color:</span>
                <strong className="text-foreground text-right">{submittedOrder.finish} ({submittedOrder.color})</strong>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-4 flex-wrap justify-center pt-2">
              <a
                href={`https://wa.me/8801742643763?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105 cursor-pointer"
              >
                <Icon name="messageSquare" className="h-4 w-4" />
                <span>Chat Now on WhatsApp</span>
              </a>

              <Link href="/shop">
                <Button variant="outline" size="md" className="font-bold text-xs uppercase tracking-wider cursor-pointer">
                  Explore Catalog
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Multi-Step Wizard View */
          <div className="p-6 sm:p-10 rounded-3xl bg-card border border-stone-200/80 dark:border-stone-800 shadow-xl flex flex-col gap-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: SELECT FURNITURE TYPE */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-1 pb-4 border-b border-stone-200/80 dark:border-stone-800">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      STEP 1 OF 4
                    </span>
                    <Heading level={2} className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
                      What would you like to build?
                    </Heading>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Choose a furniture category to get started with custom dimensions and wood timber selection.
                    </p>
                  </div>

                  {/* Furniture Category Grid Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {FURNITURE_TYPES.map((item) => {
                      const isSelected = selectedType.toLowerCase() === item.label.toLowerCase();

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedType(item.label)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 select-none ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-foreground shadow-md shadow-primary/15 scale-[1.02]'
                              : 'bg-background border-stone-200/80 dark:border-stone-800 hover:border-stone-400 text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          <span className="text-3xl">{item.icon}</span>
                          <span className="font-display font-bold text-xs sm:text-sm text-foreground">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-stone-400 font-medium leading-tight">
                            {item.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Inspiration Showcase Section */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-stone-200/80 dark:border-stone-800">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider font-display">
                          INSPIRATION &bull; WHAT OTHERS HAVE BUILT
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Click any preset to pre-fill your customization parameters instantly.
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {PRESET_INSPIRATIONS.map((preset) => (
                        <div
                          key={preset.title}
                          className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex flex-col gap-3 group hover:border-primary transition-all text-left"
                        >
                          <div className="relative h-28 w-full rounded-xl overflow-hidden bg-stone-200">
                            <Image
                              src={preset.image}
                              alt={preset.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="200px"
                              unoptimized
                            />
                          </div>
                          <div className="flex flex-col text-xs text-left gap-0.5">
                            <span className="font-bold text-foreground font-display truncate">{preset.title}</span>
                            <span className="text-[10px] text-stone-400">{preset.material} &bull; {preset.color}</span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleApplyPreset(preset)}
                            className="w-full text-[10px] font-bold uppercase tracking-wider py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            Use This Preset
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 1 Footer Action */}
                  <div className="flex justify-end pt-4 border-t border-stone-200/80 dark:border-stone-800">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleNextStep}
                      className="font-bold text-xs uppercase tracking-wider px-8 cursor-pointer shadow-md shadow-primary/20"
                    >
                      <span>NEXT STEP &rarr;</span>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CUSTOMIZE STYLE, MATERIAL & COLOR */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-1 pb-4 border-b border-stone-200/80 dark:border-stone-800">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      STEP 2 OF 4
                    </span>
                    <Heading level={2} className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
                      Customize Your <span className="text-primary italic">{selectedType}</span>
                    </Heading>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Choose your preferred style, material, finish, polish color, or attach reference photos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Style, Wood & Finish Controls */}
                    <div className="md:col-span-7 flex flex-col gap-6 text-left">
                      {/* Size / Style Chips */}
                      <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                          SIZE / STYLE
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SIZE_OPTIONS.map((sz) => {
                            const isChecked = selectedSize === sz;
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => setSelectedSize(sz)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isChecked
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Wood / Material Chips */}
                      <div className="flex flex-col gap-2.5 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                          WOOD / MATERIAL
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {MATERIAL_OPTIONS.map((mat) => {
                            const isChecked = selectedMaterial === mat;
                            return (
                              <button
                                key={mat}
                                type="button"
                                onClick={() => setSelectedMaterial(mat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isChecked
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                                }`}
                              >
                                {mat}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Finish Options */}
                      <div className="flex flex-col gap-2.5 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                          SURFACE FINISH
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {FINISH_OPTIONS.map((fn) => {
                            const isChecked = selectedFinish === fn;
                            return (
                              <button
                                key={fn}
                                type="button"
                                onClick={() => setSelectedFinish(fn)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isChecked
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                                }`}
                              >
                                {fn}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Polish Color Swatches */}
                      <div className="flex flex-col gap-2.5 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                          WOOD POLISH COLOR
                        </label>
                        <div className="flex items-center gap-3 flex-wrap">
                          {COLOR_POLISHES.map((col) => {
                            const isChecked = selectedColor === col.name;
                            return (
                              <button
                                key={col.name}
                                type="button"
                                onClick={() => setSelectedColor(col.name)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                  isChecked
                                    ? 'border-primary bg-primary/10 text-foreground ring-2 ring-primary'
                                    : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                                }`}
                              >
                                <span
                                  className="h-4 w-4 rounded-full border border-black/20 shrink-0"
                                  style={{ backgroundColor: col.hex }}
                                />
                                <span>{col.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Reference Image Upload & Selection Summary Card */}
                    <div className="md:col-span-5 flex flex-col gap-5">
                      {/* Design Reference Upload Box */}
                      <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center text-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-foreground">Share your design idea</span>
                          <span className="text-[11px] text-stone-400">Upload a photo, sketch, or Pinterest reference image (Optional)</span>
                        </div>

                        <label className="px-4 py-2 rounded-xl bg-background border border-stone-300 dark:border-stone-700 text-xs font-bold text-foreground hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-sm">
                          <span>{referenceImage ? 'Change Photo' : 'Upload Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleReferenceUpload}
                          />
                        </label>

                        {referenceImage && (
                          <div className="relative h-24 w-full rounded-xl overflow-hidden bg-stone-200 border border-stone-300 mt-1">
                            <Image src={referenceImage} alt="Reference Sketch" fill className="object-cover" unoptimized />
                          </div>
                        )}
                      </div>

                      {/* Selection Summary Box with Primary Theme Colors */}
                      <div className="p-5 rounded-2xl bg-stone-900 text-white border border-stone-800 flex flex-col gap-3 text-xs text-left">
                        <span className="font-bold text-primary uppercase tracking-widest text-[10px] border-b border-stone-800 pb-2">
                          YOUR SELECTION SO FAR
                        </span>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Furniture:</span>
                          <strong className="text-white">{selectedType}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Size / Style:</span>
                          <strong className="text-white">{selectedSize}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Material:</span>
                          <strong className="text-white">{selectedMaterial}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Finish:</span>
                          <strong className="text-white">{selectedFinish}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Color Polish:</span>
                          <strong className="text-primary font-bold">{selectedColor}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Footer Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-stone-800">
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={handlePrevStep}
                      className="font-bold text-xs cursor-pointer"
                    >
                      &larr; BACK
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleNextStep}
                      className="font-bold text-xs uppercase tracking-wider px-8 cursor-pointer shadow-md shadow-primary/20"
                    >
                      <span>NEXT STEP &rarr;</span>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PRICING & TIMELINE */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-1 pb-4 border-b border-stone-200/80 dark:border-stone-800">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      STEP 3 OF 4
                    </span>
                    <Heading level={2} className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
                      Pricing &amp; Delivery Guarantee
                    </Heading>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Every piece is unique &mdash; here is how our pricing and workshop craft works.
                    </p>
                  </div>

                  {/* Dark Pricing Banner */}
                  <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white text-center flex flex-col items-center gap-3 border border-stone-800 shadow-xl relative overflow-hidden">
                    <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl border border-primary/30">
                      🤝
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                      OUR PRICING POLICY
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-100">
                      Price is Always <span className="text-primary italic">Negotiable</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed font-light">
                      Submit your custom design, and our senior master craftsman will reach out to discuss the best price fitting your budget &mdash; no surprises.
                    </p>
                  </div>

                  {/* 3 Guarantee Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                        📞
                      </div>
                      <span className="font-bold text-xs text-foreground font-display">We Call You First</span>
                      <span className="text-[11px] text-stone-400">Free design advice within 2 hours</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                        🛡️
                      </div>
                      <span className="font-bold text-xs text-foreground font-display">No Advance Needed</span>
                      <span className="text-[11px] text-stone-400">0% deposit to submit your design</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                        🚚
                      </div>
                      <span className="font-bold text-xs text-foreground font-display">7-14 Days Delivery</span>
                      <span className="text-[11px] text-stone-400">Kiln-dried seasoned timber delivery</span>
                    </div>
                  </div>

                  {/* Summary Review Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-left">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-stone-400">FURNITURE</span>
                      <span className="font-bold text-foreground">{selectedType}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-stone-400">MATERIAL</span>
                      <span className="font-bold text-foreground">{selectedMaterial}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-stone-400">SIZE / STYLE</span>
                      <span className="font-bold text-foreground">{selectedSize}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-stone-400">COLOR POLISH</span>
                      <span className="font-bold text-primary">{selectedColor}</span>
                    </div>
                  </div>

                  {/* Step 3 Footer Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-stone-800">
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={handlePrevStep}
                      className="font-bold text-xs cursor-pointer"
                    >
                      &larr; BACK
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleNextStep}
                      className="font-bold text-xs uppercase tracking-wider px-8 cursor-pointer shadow-md shadow-primary/20"
                    >
                      <span>NEXT STEP &rarr;</span>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SUBMIT YOUR DESIGN */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-1 pb-4 border-b border-stone-200/80 dark:border-stone-800">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      STEP 4 OF 4
                    </span>
                    <Heading level={2} className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
                      Submit Your Design
                    </Heading>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Fill in your contact details &mdash; our master craftsman team will call you soon.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitDesign} className="flex flex-col gap-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase text-foreground">YOUR NAME *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mohammad Rafi Hossain"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase text-foreground">PHONE NUMBER *</label>
                        <input
                          type="tel"
                          required
                          placeholder="017XX-XXXXXX"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase text-foreground">DISTRICT / AREA *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mirpur, Dhaka"
                          value={userDistrict}
                          onChange={(e) => setUserDistrict(e.target.value)}
                          className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase text-foreground">BUDGET RANGE (OPTIONAL)</label>
                        <input
                          type="text"
                          placeholder="e.g. 30,000 - 50,000 BDT"
                          value={userBudget}
                          onChange={(e) => setUserBudget(e.target.value)}
                          className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                        />
                      </div>
                    </div>

                    {/* Room Photo Upload Box */}
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center text-center gap-2">
                      <span className="text-xl">📷</span>
                      <span className="font-bold text-xs text-foreground">Upload a photo of your room (Optional)</span>
                      <span className="text-[11px] text-stone-400">Helps us give better advice about sizing, timber match and fit.</span>
                      <label className="mt-1 px-4 py-1.5 rounded-xl bg-background border border-stone-300 dark:border-stone-700 text-xs font-bold cursor-pointer hover:bg-stone-100 transition-colors">
                        <span>{roomPhoto ? 'Photo Attached ✓' : 'Choose Room Photo'}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleRoomPhotoUpload} />
                      </label>
                    </div>

                    {/* Special Requirements Textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-foreground">SPECIAL REQUIREMENTS</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. I need extra height, 3 drawers, brass handles..."
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                        className="w-full bg-background border border-stone-300 dark:border-stone-700 rounded-xl p-3.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                      />
                    </div>

                    {/* Trust Banner */}
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                      <span>✓ Your design is saved securely. Our team will <strong>call you within 24 hours</strong>. No advance payment is needed.</span>
                    </div>

                    {/* Dual Actions: Submit + WhatsApp Us */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full py-4 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-primary/20"
                      >
                        SUBMIT MY DESIGN ✓
                      </Button>

                      <a
                        href={`https://wa.me/8801742643763?text=${getWhatsAppMessage()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <Icon name="messageSquare" className="h-4 w-4" />
                        <span>WhatsApp Us</span>
                      </a>
                    </div>

                    <div className="flex justify-start pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevStep}
                        className="font-bold text-xs cursor-pointer"
                      >
                        &larr; BACK
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Container>
      </div>
    </div>
  );
}

export default CustomDesignWizard;
