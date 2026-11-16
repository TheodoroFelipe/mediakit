import mediakit from '../data/mediakit.json';

export const mk = mediakit;
export const t = mediakit.textos;

const PENDENTE = 'PENDENTE';

/** Verdadeiro quando o valor existe e não está marcado como "PENDENTE". */
export function ok<T>(valor: T | null | undefined): valor is T {
  if (valor === null || valor === undefined) return false;
  if (typeof valor === 'string') return valor.trim() !== '' && valor.trim() !== PENDENTE;
  if (Array.isArray(valor)) return valor.length > 0;
  return true;
}

/** Números viram texto no formato brasileiro; textos passam direto. */
export function numero(valor: string | number): string {
  return typeof valor === 'number' ? valor.toLocaleString('pt-BR') : valor;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;

function paraData(iso: string) {
  return new Date(`${iso}T12:00:00Z`);
}

/** "2026-06-20" → "20 de junho de 2026". Textos que não são data passam direto. */
export function dataLonga(valor: string): string {
  if (!ISO.test(valor)) return valor;
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(paraData(valor));
}

/** "2026-11-28" → "28 nov". */
export function dataCurta(valor: string): string {
  if (!ISO.test(valor)) return valor;
  const d = paraData(valor);
  const mes = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' })
    .format(d)
    .replace('.', '');
  return `${d.getUTCDate()} ${mes}`;
}

/** "2026-11-01" → "2026". */
export function ano(valor: string): string {
  return ISO.test(valor) ? valor.slice(0, 4) : valor;
}

/** Caminho que respeita o `base` do Astro (GitHub Pages). */
export function url(caminho: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${caminho.replace(/^\//, '')}`;
}

/** "Peito, livre e borboleta" a partir da lista de provas ("50m peito", ...). */
export function estilos(provas: string[]): string {
  const unicos = [...new Set(provas.map((p) => p.split(' ').slice(1).join(' ').toLowerCase()))];
  const lista = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(unicos);
  return lista.charAt(0).toUpperCase() + lista.slice(1);
}
