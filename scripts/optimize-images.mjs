/**
 * Portfolio Image Optimization Script
 * 1. Downloads devicon SVGs locally
 * 2. Converts local images to WebP using sharp
 */

import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── 1. DEVICON SVG DOWNLOADS ───────────────────────────────────────────────

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const icons = [
  'cplusplus/cplusplus-original.svg',
  'python/python-original.svg',
  'java/java-original.svg',
  'mysql/mysql-original.svg',
  'django/django-plain.svg',
  'flask/flask-original.svg',
  'docker/docker-original.svg',
  'kubernetes/kubernetes-plain.svg',
  'git/git-original.svg',
  'linux/linux-original.svg',
  'vscode/vscode-original.svg',
  'postman/postman-original.svg',
  'amazonwebservices/amazonwebservices-original-wordmark.svg',
  'amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'scikitlearn/scikitlearn-original.svg',
  'sqlite/sqlite-original.svg',
  'azuresqldatabase/azuresqldatabase-original.svg',
  'google/google-original.svg',
  'linkedin/linkedin-original.svg',
  'github/github-original.svg',
];

const iconsDir = path.join(ROOT, 'assets', 'icons');
mkdirSync(iconsDir, { recursive: true });

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function downloadIcons() {
  console.log('\n📥 Downloading devicon SVGs...');
  for (const icon of icons) {
    const filename = icon.replace('/', '-'); // e.g. cplusplus-original.svg (keep sub-path basename)
    const basename = icon.split('/')[1];     // e.g. cplusplus-original.svg
    const dest = path.join(iconsDir, basename);
    if (existsSync(dest)) {
      console.log(`  ✓ already exists: ${basename}`);
      continue;
    }
    const url = `${CDN}/${icon}`;
    try {
      await downloadFile(url, dest);
      console.log(`  ✓ ${basename}`);
    } catch (e) {
      console.error(`  ✗ ${basename}: ${e.message}`);
    }
  }
}

// ── 2. IMAGE CONVERSION TO WEBP ────────────────────────────────────────────

async function convertImages(sharp) {
  const jobs = [
    // Profile photos → assets/images/
    {
      src: path.join(ROOT, 'assets', 'profilephoto', 'profile-light.jpg'),
      dest: path.join(ROOT, 'assets', 'images', 'profile-light.webp'),
      opts: { width: 500, height: 500, fit: 'cover', quality: 82 },
    },
    {
      src: path.join(ROOT, 'assets', 'profilephoto', 'profile-dark.png'),
      dest: path.join(ROOT, 'assets', 'images', 'profile-dark.webp'),
      opts: { width: 500, height: 500, fit: 'cover', quality: 82 },
    },
    {
      src: path.join(ROOT, 'assets', 'profilephoto', 'profile.png'),
      dest: path.join(ROOT, 'assets', 'images', 'profile.webp'),
      opts: { width: 500, height: 500, fit: 'cover', quality: 82 },
    },
    // Project images → assets/projects/ (keep originals, add webp)
    {
      src: path.join(ROOT, 'assets', 'projects', 'project-ecommerce.png'),
      dest: path.join(ROOT, 'assets', 'projects', 'project-ecommerce.webp'),
      opts: { width: 800, height: 450, fit: 'cover', quality: 80 },
    },
    {
      src: path.join(ROOT, 'assets', 'projects', 'project-student.png'),
      dest: path.join(ROOT, 'assets', 'projects', 'project-student.webp'),
      opts: { width: 800, height: 450, fit: 'cover', quality: 80 },
    },
    {
      src: path.join(ROOT, 'assets', 'projects', 'project-ai.png'),
      dest: path.join(ROOT, 'assets', 'projects', 'project-ai.webp'),
      opts: { width: 800, height: 450, fit: 'cover', quality: 80 },
    },
    {
      src: path.join(ROOT, 'assets', 'projects', 'project-aws.png'),
      dest: path.join(ROOT, 'assets', 'projects', 'project-aws.webp'),
      opts: { width: 800, height: 450, fit: 'cover', quality: 80 },
    },
    // Certificates → assets/certificates/ (display size is small in card grid)
    {
      src: path.join(ROOT, 'assets', 'certificates', 'aws.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'aws.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'nptel.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'nptel.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'chatgpt.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'chatgpt.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'buildgenerativeaiapps.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'buildgenerativeaiapps.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'mastergenai.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'mastergenai.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'introtohardwareandoperatingsystem.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'introtohardwareandoperatingsystem.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'fundamentalofnetworkcommunication.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'fundamentalofnetworkcommunication.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'bitsandbytes.jpg'),
      dest: path.join(ROOT, 'assets', 'certificates', 'bitsandbytes.webp'),
      opts: { width: 600, quality: 75 },
    },
    {
      src: path.join(ROOT, 'assets', 'certificates', 'CSE Pathshala.png'),
      dest: path.join(ROOT, 'assets', 'certificates', 'cse-pathshala.webp'),
      opts: { width: 600, quality: 75 },
    },
  ];

  console.log('\n🖼️  Converting images to WebP...');
  for (const { src, dest, opts } of jobs) {
    if (existsSync(dest)) {
      console.log(`  ✓ already exists: ${path.basename(dest)}`);
      continue;
    }
    if (!existsSync(src)) {
      console.error(`  ✗ source not found: ${path.basename(src)}`);
      continue;
    }
    try {
      let s = sharp(src);
      if (opts.width || opts.height) {
        s = s.resize(opts.width, opts.height ?? null, { fit: opts.fit ?? 'inside', withoutEnlargement: true });
      }
      await s.webp({ quality: opts.quality ?? 80 }).toFile(dest);
      const { size } = (await import('fs')).statSync(dest);
      console.log(`  ✓ ${path.basename(dest)} (${Math.round(size / 1024)} KB)`);
    } catch (e) {
      console.error(`  ✗ ${path.basename(dest)}: ${e.message}`);
    }
  }
}

// ── MAIN ───────────────────────────────────────────────────────────────────

async function main() {
  // Download SVGs (always can do this without sharp)
  await downloadIcons();

  // Try to load sharp
  try {
    const { default: sharp } = await import('sharp');
    await convertImages(sharp);
  } catch (e) {
    console.warn('\n⚠️  sharp not available, skipping WebP conversion.');
    console.warn('   Install it with: npm install sharp --save-dev');
    console.warn('   Then re-run: node scripts/optimize-images.mjs');
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
