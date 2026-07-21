const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_MAPPING = {
  // Hero
  'public/images/hero/hero-1.jpg': 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
  'public/images/hero/hero-2.jpg': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  'public/images/hero/hero-3.jpg': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',

  // Categories
  'public/images/categories/living.jpg': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
  'public/images/categories/bedroom.jpg': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80',
  'public/images/categories/dining.jpg': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=500&q=80',
  'public/images/categories/office.jpg': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=500&q=80',
  'public/images/categories/outdoor.jpg': 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=500&q=80',
  'public/images/categories/storage.jpg': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=80',

  // Collections
  'public/images/collections/nordic.jpg': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
  'public/images/collections/walnut.jpg': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80',
  'public/images/collections/heritage.jpg': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',

  // Avatars
  'public/images/avatars/client-1.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'public/images/avatars/client-2.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'public/images/avatars/client-3.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  'public/images/placeholders/avatar.jpg': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',

  // Products
  'public/images/products/teak-dining-1.jpg': 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
  'public/images/products/teak-dining-2.jpg': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80',
  'public/images/products/walnut-bed-1.jpg': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
  'public/images/products/walnut-bed-2.jpg': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80',
  'public/images/products/ash-chair-1.jpg': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
  'public/images/products/ash-chair-2.jpg': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80',
  'public/images/products/walnut-desk-1.jpg': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
  'public/images/products/walnut-desk-2.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  'public/images/products/outdoor-lounge-1.jpg': 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=600&q=80',
  'public/images/products/outdoor-lounge-2.jpg': 'https://images.unsplash.com/photo-1582582621959-a0a27ffb85da?auto=format&fit=crop&w=600&q=80',
  'public/images/products/oak-cabinet-1.jpg': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
  'public/images/products/oak-cabinet-2.jpg': 'https://images.unsplash.com/photo-1601084881623-cef5a7de37d4?auto=format&fit=crop&w=600&q=80',
  'public/images/products/floating-shelves-1.jpg': 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&w=600&q=80',
  'public/images/products/floating-shelves-2.jpg': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
  'public/images/products/nightstand-1.jpg': 'https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?auto=format&fit=crop&w=600&q=80',
  'public/images/products/nightstand-2.jpg': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',

  // Gallery
  'public/images/gallery/ig-1.jpg': 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=400&q=80',
  'public/images/gallery/ig-2.jpg': 'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=400&q=80',
  'public/images/gallery/ig-3.jpg': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80',
  'public/images/gallery/ig-4.jpg': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
  'public/images/gallery/ig-5.jpg': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80',
  'public/images/gallery/ig-6.jpg': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80',
};

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: Status Code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting image downloads...');
  for (const [targetPath, url] of Object.entries(IMAGES_MAPPING)) {
    const fullPath = path.resolve(__dirname, '..', targetPath);
    const dir = path.dirname(fullPath);

    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(fullPath)) {
      console.log(`Already exists: ${targetPath}`);
      continue;
    }

    try {
      console.log(`Downloading: ${targetPath}`);
      await download(url, fullPath);
      console.log(`Completed: ${targetPath}`);
    } catch (error) {
      console.error(`Error downloading ${targetPath}:`, error.message);
    }
  }
  console.log('All image operations completed!');
}

run();
