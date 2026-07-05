# Restaurante Recanto e Sabor

Site institucional do Restaurante Recanto e Sabor, buffet de comida caseira localizado no Centro de Balneário Camboriú.

A aplicação apresenta o restaurante, as modalidades de buffet, fotos reais, depoimentos, localização e canais de contato. A arquitetura prioriza geração estática, baixo custo de JavaScript, acessibilidade e SEO local.

## Visão técnica

- Astro 7 com saída estática em `dist/`.
- TypeScript 6 com configuração estrita.
- CSS próprio, sem framework de estilos.
- Fontes DM Sans e Fraunces fornecidas por `@fontsource`.
- Imagens locais processadas por `astro:assets`.
- Swiper 14 para os carrosséis.
- GLightbox para a visualização ampliada da galeria.
- Content Collections e Zod para validação dos depoimentos.
- `@astrojs/sitemap` para geração do sitemap XML.

O projeto requer Node.js 22.12 ou superior e npm 9.6.5 ou superior. A última validação foi executada com Node.js 24 e npm 11.

## Execução local

```sh
npm install
npm run dev
```

O servidor do Astro normalmente fica disponível em `http://localhost:4321`.

### Scripts

| Comando | Comportamento |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run check` | Executa diagnósticos do Astro e TypeScript. |
| `npm run build` | Gera o site estático em `dist/`. |
| `npm run preview` | Serve localmente o build de `dist/`. |
| `npm run verify` | Executa `check` e `build` em sequência. |

`npm run verify` representa a validação técnica completa usada no projeto.

## Estrutura

```text
.
├── public/
│   ├── images/logo-site.jpg   # Imagem com URL pública para metadados
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── assets/images/         # Fotos processadas pelo Astro
│   ├── components/
│   │   ├── FoodCarousel.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── ReviewSlider.astro
│   │   └── forms/FormContact.astro
│   ├── data/
│   │   ├── config.ts          # Dados comerciais compartilhados
│   │   ├── menus.ts           # Navegação
│   │   └── reviews.json       # Fonte dos depoimentos
│   ├── layouts/Layout.astro   # Documento global e metadados
│   ├── pages/                 # Rotas estáticas
│   ├── styles/global.css      # Sistema visual
│   └── content.config.ts      # Schema dos depoimentos
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Rotas

| URL | Origem | Responsabilidade |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Home, buffet, depoimentos, mapa e CTAs. |
| `/about-us/` | `src/pages/about-us.astro` | Apresentação institucional. |
| `/gallery/` | `src/pages/gallery.astro` | Cardápio visual e galeria de fotos. |
| `/contact/` | `src/pages/contact.astro` | Dados comerciais e contato via WhatsApp. |
| `/privacy-policy/` | `src/pages/privacy-policy.astro` | Política de privacidade. |
| `/404.html` | `src/pages/404.astro` | Página de erro marcada com `noindex`. |
| `/menu` | `astro.config.mjs` | Compatibilidade com URL antiga; redireciona para `/gallery`. |

`/menu` é uma rota de compatibilidade e não faz parte do sitemap. No build estático sem adapter, o Astro materializa essa regra como uma página HTML de redirecionamento. Hospedagens com suporte a redirects nativos podem representar a mesma regra como HTTP 301.

## Fluxo de dados

### Configuração comercial

`src/data/config.ts` é a fonte única para:

- Nome e idioma do site.
- Cor de tema.
- Telefone em formato E.164.
- Links de telefone e WhatsApp.
- Endereço e Google Maps.
- Instagram e Facebook.
- Horário de atendimento.

Esses valores são consumidos pelo cabeçalho, rodapé, layout, página de contato, botões flutuantes e JSON-LD. Essa centralização evita divergência entre a interface e os metadados.

### Navegação

`src/data/menus.ts` define os links compartilhados pelo cabeçalho e rodapé. A lista usa `as const`, preservando os valores literais no TypeScript.

### Depoimentos

`src/data/reviews.json` armazena os depoimentos no formato:

```json
{
  "id": 1,
  "author": "Nome do cliente",
  "review": "Texto do depoimento"
}
```

`src/content.config.ts` carrega o JSON com o loader de arquivos do Astro. O schema importado de `astro/zod` valida `author` e `review` durante sincronização de conteúdo e build. `ReviewSlider.astro` acessa os registros com `getCollection("reviews")`.

### Imagens

As fotos exibidas nas páginas ficam em `src/assets/images/` e entram no build por imports estáticos. Os componentes `Image` e `Picture` geram dimensões, `srcset` e variações AVIF/WebP.

`public/images/logo-site.jpg` é uma cópia destinada aos metadados que precisam de URL pública estável, como Open Graph e JSON-LD. A imagem principal da home usa `priority`, resultando em `loading="eager"`, `decoding="sync"` e `fetchpriority="high"` no HTML final.

## Componentes

### `Layout.astro`

Define a estrutura compartilhada por todas as páginas:

- Fontes e CSS global.
- `title`, description e canonical.
- Open Graph e Twitter Card.
- Diretivas de indexação.
- JSON-LD do tipo `Restaurant`.
- Cabeçalho, rodapé e conteúdo principal.
- CTAs flutuantes de Instagram e WhatsApp.
- Animações progressivas por `IntersectionObserver`.

As propriedades opcionais do layout são `title`, `description`, `image` e `noindex`. A rota 404 usa `noindex`; as demais páginas utilizam o comportamento indexável padrão.

### `Header.astro`

Renderiza a faixa de endereço e horário, a marca, a navegação desktop e o menu móvel. O comportamento móvel usa JavaScript nativo, `aria-expanded`, fechamento externo e tecla `Escape`.

### `Footer.astro`

Combina dados comerciais, horário, navegação e links sociais. O ano é calculado durante o build.

### `FoodCarousel.astro`

Usa Swiper com os módulos `Navigation`, `Keyboard`, `Autoplay` e `A11y`. As imagens são responsivas e o autoplay é desativado quando o navegador informa preferência por movimento reduzido.

### `ReviewSlider.astro`

Obtém os depoimentos da Content Collection e usa Swiper com paginação, autoplay e mensagens acessíveis em português.

### `FormContact.astro`

O formulário não envia dados para um backend. No submit, os campos são convertidos em uma mensagem e o navegador abre a conversa do restaurante no WhatsApp.

## CSS e interface

`src/styles/global.css` concentra reset, tokens, componentes, animações e media queries. Não existe runtime de CSS nem pipeline Tailwind.

Os tokens de `:root` representam a identidade visual:

- `--tomato` e `--tomato-dark`: marca e ações principais.
- `--leaf` e `--leaf-dark`: contraste institucional.
- `--saffron`: detalhes de destaque.
- `--cream` e `--paper`: superfícies.
- `--ink` e `--muted`: hierarquia de texto.

Os layouts responsivos usam breakpoints em `900px` e `600px`. A versão móvel transforma os CTAs flutuantes de contato em botões circulares com ícones.

## JavaScript no cliente

O Astro processa os scripts dos componentes como módulos TypeScript. O projeto envia JavaScript apenas para interações que não podem ser resolvidas por HTML e CSS:

- Menu móvel.
- Carrosséis.
- Lightbox da galeria.
- Composição da mensagem de WhatsApp.
- Revelação visual ao entrar no viewport.

Os dois scripts `is:inline` do layout possuem execução intencional: um serializa o JSON-LD e o outro adiciona a classe `js` antes da primeira pintura. Sem JavaScript, os elementos com `data-reveal` permanecem visíveis.

## Acessibilidade

- Link de salto para o conteúdo principal.
- Foco visível por teclado.
- Hierarquia com um `h1` por página.
- Textos alternativos relacionados às fotos reais.
- Nomes acessíveis nos links sociais e controles.
- Menu móvel com estado semântico.
- Módulo A11y nos carrosséis.
- Suporte a `prefers-reduced-motion` no CSS e no autoplay.
- Conteúdo funcional sem animações ou JavaScript.

## SEO e indexação

### Metadados e dados estruturados

Cada página indexável recebe título, descrição, canonical absoluta, Open Graph, Twitter Card e `max-image-preview:large`.

O JSON-LD usa o tipo `Restaurant` e descreve nome, telefone, endereço, cozinha, faixa de preço, cardápio visual, mapa, redes sociais e horário via `OpeningHoursSpecification`. O schema não publica avaliações agregadas ou estrelas sem dados verificáveis.

### `robots.txt`

`public/robots.txt` permite o rastreamento geral e declara o sitemap absoluto:

```text
User-agent: *
Allow: /

Sitemap: https://recantoesabor.com/sitemap-index.xml
```

Recursos de `/_astro/`, CSS e imagens permanecem rastreáveis para permitir a renderização completa pelos indexadores.

### Sitemap

`@astrojs/sitemap` gera `dist/sitemap-index.xml` e `dist/sitemap-0.xml`. O filtro configurado em `astro.config.mjs` remove `/menu`, pois essa rota representa apenas um redirect.

O sitemap não publica `priority` ou `changefreq`. Também não publica `lastmod`, porque o projeto ainda não possui uma fonte por página para datas de alteração significativa.

## Build e publicação

`npm run build` gera arquivos HTML, CSS, JavaScript e imagens otimizadas em `dist/`. O diretório pode ser servido por qualquer hospedagem estática.

Os arquivos em `/_astro/` possuem hash no nome e são adequados a cache longo. HTML, `robots.txt` e sitemap não possuem hash e representam documentos atualizáveis.

O domínio canônico configurado é `https://recantoesabor.com`. A hospedagem redireciona a variante com `www` para esse domínio. A regra `/menu` → `/gallery` existe no build do Astro; quando a hospedagem oferece redirects nativos, a mesma regra pode ser promovida para HTTP 301 sem alterar o código das páginas.

## Modernizações aplicadas

- Atualização para Astro 7, Swiper 14 e TypeScript 6.
- Migração dos schemas para `astro/zod`.
- Remoção de `baseUrl`, deprecated no TypeScript 6; o alias `~/*` usa `./src/*` explicitamente.
- Substituição da propriedade CSS deprecated `clip` por `clip-path`.
- Remoção de Alpine.js, MDX, Tailwind, Masonry e Typography.
- Conversão da política de privacidade de MDX para Astro.
- Remoção de componentes do template, dados fictícios, fontes e imagens sem uso.
- Centralização dos dados comerciais.
- Consolidação do cardápio visual em `/gallery`.
- Inclusão de sitemap, `robots.txt`, canonical e JSON-LD local.
- Imagens responsivas com AVIF, WebP e prioridade para a LCP.
- Carrosséis acessíveis e compatíveis com movimento reduzido.
- CTAs flutuantes para Instagram e WhatsApp.
- Fluxo reproduzível de diagnósticos e build com `npm run verify`.
