// Shared data and small helper functions

// Same menu as the old site: category -> subcategories
export const CATEGORIES = {
  Plants: ['Indoor', 'Outdoor', 'Hanging', 'Flowering'],
  Care: ['Garden Tools', 'Fertilizers', 'Decoration', 'Seeds'],
  'Eco-Friendly': ['Biodegradable Pots', 'Rain Barrels', 'Garden Lights']
};

// Banner picture shown at the top of the shop for each subcategory
export const BANNERS = {
  Indoor: '/images/19.jpg',
  Outdoor: '/images/29.jpg',
  Hanging: '/images/28.jpg',
  Flowering: '/images/27.jpg',
  'Garden Tools': '/images/26.jpg',
  Fertilizers: '/images/25.jpg',
  Decoration: '/images/24.jpg',
  Seeds: '/images/23.jpg',
  'Biodegradable Pots': '/images/22.jpg',
  'Rain Barrels': '/images/21.jpg',
  'Garden Lights': '/images/20.jpg'
};

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_low_to_high', label: 'Price: Low to High' },
  { value: 'price_high_to_low', label: 'Price: High to Low' },
  { value: 'name_a_to_z', label: 'Name: A-Z' },
  { value: 'name_z_to_a', label: 'Name: Z-A' }
];

// 1499 -> "₹1,499.00"
export function formatPrice(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// "2026-10-15T09:30:00.000Z" -> "15 Oct 2026"
export function formatDate(value) {
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// "1. Water it. 2. Feed it." -> ["Water it.", "Feed it."]
export function splitSteps(text) {
  return text
    .split(/(?:^|\s)\d+\.\s+/)
    .map((step) => step.trim())
    .filter((step) => step !== '');
}

// Shrinks a picture to at most 300 x 300 pixels and returns it as a small JPEG.
// A phone photo of several MB becomes a few KB, so it fits easily in the database.
export function shrinkImage(file, maxSize = 300) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; // transparent PNGs get a white background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not read that picture.'))), 'image/jpeg', 0.85);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('That file is not a picture we can read.'));
    };

    img.src = url;
  });
}
