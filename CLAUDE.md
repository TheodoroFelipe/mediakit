# Media kit online — Theodoro Guimaraes

Site de uma página que funciona como media kit de atleta: abre rápido no celular, tem link próprio para mandar a marcas e gera um PDF A4 a partir do mesmo conteúdo.

## Objetivo
- Substituir os media kits em PDF/PPTX/HTML soltos por uma única fonte, sempre atualizada.
- Público: lojas e marcas (principalmente de Foz do Iguaçu) avaliando parceria ou patrocínio. Quem decide costuma abrir o link pelo WhatsApp ou Instagram, no celular.
- Ação esperada do visitante: entrar em contato (WhatsApp ou e-mail).

## Regras de conteúdo
- Idioma: português do Brasil.
- O sobrenome é "Guimaraes", sem acento. Nunca escrever "Guimarães".
- Nome da equipe: "Acquamaster Foz".
- Todo o texto e todos os números vêm de `src/data/mediakit.json`. Nada de conteúdo fixo dentro dos componentes.
- Campos com valor `"PENDENTE"` não aparecem no site. Nunca inventar número, resultado ou depoimento.
- Métricas de redes sociais sempre exibidas junto com a data de atualização (`metricas.atualizadoEm`).
- Única parceria ativa: GymCore. Não citar parceiros antigos.

## Referência de design
- `design/referencia.html` é a página aprovada no Claude Design. Abrir no navegador para ver. É a referência visual: reproduzir layout, cores, tipografia e espaçamentos, mas reescrever como componentes Astro + Tailwind (não copiar os estilos inline).
- `design/*.dc.html` são os arquivos originais do canvas (Main e as três direções de topo A, B e C). Só para consulta; não editar.
- Direção escolhida: **A, esportiva escura, com fotos grandes** emprestadas da direção editorial (B).
- Os textos entre colchetes na referência (ex.: `[FOTO ...]`, `[SEGUIDORES]`) são marcadores. No site, fotos vêm de `public/fotos/` e números do JSON.
- A partir de agora o código é a fonte da verdade do design. Mudanças feitas aqui não voltam para o canvas.

## Stack
- Astro (site estático) + Tailwind CSS, versões estáveis mais recentes.
- Hospedagem no GitHub Pages, publicado por GitHub Actions (ver "Publicação").
- Sem backend, sem banco, sem cookies de rastreamento.
- Fontes Barlow e Barlow Condensed, hospedadas no próprio projeto (`public/fonts/`), não via Google Fonts.

## Identidade visual
- Cores: navy `#08213F`, deep `#0B2E57`, pool `#1283C9`, aqua `#3FC1E8` (destaque, botões), lane-red `#E23B3B`, ink `#10223A`, muted `#5B6B80`, line `#DCE6F0`, paper `#F4F8FB`, link `#0B5E96`, borda escura `#3C5C82`, texto claro sobre navy `#D5E2F0`.
- Títulos em Barlow Condensed, caixa alta, peso 700/800. Texto em Barlow 400/500/600.
- Elemento gráfico: raia de piscina (faixa de 12px, segmentos azul/branco/vermelho) abaixo do topo e acima do rodapé.
- Seções alternam navy e claro (branco / paper).
- Fotos grandes: o topo é dividido ao meio com a foto principal sangrando até a borda direita; uma faixa de foto em largura total entre "Sobre" e "Resultados"; foto grande ao lado do destaque do Brasileiro; exemplos de conteúdo em 4:5.

## Seções da página (nesta ordem)
1. Topo: nav, nome gigante, linha "Media kit 2026 · Nadador master", frase curta, botões (parceria + Instagram), faixa com 3 números; foto principal à direita.
2. Números: cartões de métricas + data de atualização.
3. Sobre: bio + ficha (equipe, categoria, provas, rotina, cidade).
4. Faixa de foto em largura total com frase sobreposta.
5. Resultados: destaque do 76º Brasileiro Masters com foto, depois lista das outras competições.
6. Na mídia: cartões com link das matérias.
7. Conteúdo: quatro formatos com foto 4:5.
8. Parceiro atual (GymCore) e apoio à equipe.
9. Como trabalhar comigo: três formatos numerados + entregas.
10. Objetivo esportivo e calendário.
11. Rodapé/contato em navy.

## Funcionalidades
- Versão para impressão: `@media print` em A4, para "Salvar como PDF" sair com cara de kit profissional (1 a 2 páginas).
- Versões por marca: rota `/para/[marca]` lendo `src/data/propostas/*.json`, que troca a saudação e o bloco "Como trabalhar comigo" por uma proposta específica. Essas páginas levam `noindex`.
- Open Graph e imagem de prévia para o link ficar bonito no WhatsApp.
- Acessibilidade: contraste AA, texto alternativo em todas as fotos, navegação por teclado, HTML semântico.
- Desempenho: imagens otimizadas pelo Astro (AVIF/WebP), sem JavaScript desnecessário.
- Celular primeiro: em 390px o topo empilha (foto acima ou abaixo do nome), o nome reduz e os cartões viram uma coluna.

## Estrutura
```
design/            referência visual (não faz parte do site)
src/
  data/mediakit.json
  data/propostas/
  components/
  layouts/
  pages/index.astro
  pages/para/[marca].astro
public/
  fotos/
  fonts/
```

## Publicação (GitHub Pages)
- Workflow em `.github/workflows/deploy.yml` usando a action oficial do Astro (`withastro/action`) + `actions/deploy-pages`, disparado a cada push na `main`.
- No GitHub: Settings › Pages › Source = "GitHub Actions".
- `astro.config.mjs` precisa de `site` (ex.: `https://USUARIO.github.io`) e, se o repositório não se chamar `USUARIO.github.io`, de `base: '/NOME-DO-REPO'`.
- Com `base` definido, todo link interno, imagem, fonte e a rota `/para/[marca]` devem respeitar a base (usar `import.meta.env.BASE_URL` ou os helpers do Astro). Nunca caminho absoluto fixo começando com `/`.
- Imagem de Open Graph com URL absoluta (site + base).
- Domínio próprio no futuro: arquivo `public/CNAME` e `base` volta a ser `/`.

## Como trabalhar neste repositório
- Ambiente: macOS.
- Antes de dar algo por pronto: `npm run build` sem erros e conferir a página em largura de celular (390px), em desktop (1280px) e na prévia de impressão.
- Commits pequenos, mensagens em português.
- Ao atualizar resultados ou métricas, editar só o `mediakit.json`.
