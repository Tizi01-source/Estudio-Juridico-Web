// Genera copias optimizadas (WebP) de las imágenes originales de assets/.
// Los originales NO se modifican: todo se escribe en public/img/ con otro nombre.
// Uso: npm run imagenes
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const ORIGEN = 'assets';
const DESTINO = 'public/img';
mkdirSync(DESTINO, { recursive: true });

// Foto del hero (versión sin bandera)
// Horizontal para escritorio y recorte vertical (centro) para celular
const fondo = sharp(`${ORIGEN}/fondo1.jpg`);
const { width: anchoFondo, height: altoFondo } = await fondo.metadata();

for (const ancho of [1280, 1920]) {
  await sharp(`${ORIGEN}/fondo1.jpg`).resize(ancho).webp({ quality: 60 }).toFile(`${DESTINO}/hero-${ancho}.webp`);
}

const anchoVertical = Math.round(altoFondo * 2 / 3);
const recorteVertical = { left: Math.round((anchoFondo - anchoVertical) / 2), top: 0, width: anchoVertical, height: altoFondo };
for (const ancho of [480, 720, 960]) {
  await sharp(`${ORIGEN}/fondo1.jpg`).extract(recorteVertical).resize(ancho).webp({ quality: 55 }).toFile(`${DESTINO}/hero-vertical-${ancho}.webp`);
}

// Logos: se recorta el espacio transparente que los rodea
const logoHero = await sharp(`${ORIGEN}/logoInicio.png`).trim().toBuffer();
for (const ancho of [320, 640, 960, 1200]) {
  await sharp(logoHero).resize(ancho).webp({ quality: 90 }).toFile(`${DESTINO}/logo-hero-${ancho}.webp`);
}

const logoNav = await sharp(`${ORIGEN}/logo1.png`).trim().toBuffer();
for (const ancho of [64, 128]) {
  await sharp(logoNav).resize(ancho).webp({ quality: 90 }).toFile(`${DESTINO}/logo-nav-${ancho}.webp`);
}

const medidas = async (buffer) => { const m = await sharp(buffer).metadata(); return `${m.width}x${m.height}`; };
console.log('Logo hero recortado:', await medidas(logoHero));
console.log('Logo menú recortado:', await medidas(logoNav));
console.log('Recorte vertical del hero:', `${anchoVertical}x${altoFondo}`);
