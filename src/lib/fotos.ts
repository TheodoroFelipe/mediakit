import type { ImageMetadata } from 'astro';

// As fotos ficam em public/fotos/ (inclusive subpastas, como fotos/midia/)
// e passam pelo otimizador do Astro (AVIF/WebP).
const arquivos = import.meta.glob<{ default: ImageMetadata }>(
  '/public/fotos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

export function foto(arquivo: string | undefined): ImageMetadata | undefined {
  if (!arquivo || arquivo === 'PENDENTE') return undefined;
  const modulo = arquivos[`/public/fotos/${arquivo}`];
  if (!modulo) throw new Error(`Foto não encontrada em public/fotos/: ${arquivo}`);
  return modulo.default;
}
