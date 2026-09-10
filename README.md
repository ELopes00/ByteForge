# ByteForge

Site institucional (estático, multi-página) para a **ByteForge**, uma loja fictícia de informática em geral — notebooks, desktops, componentes, periféricos e serviços de manutenção — criada como projeto de apresentação.

> Loja: Rua João Batista, Bairro Cinturão Verde, Boa Vista - RR
>
> **Observação:** este é um projeto de demonstração/estudo. Os produtos, preços, endereço e dados de contato são fictícios ou meramente ilustrativos, mesmo usando marcas e modelos reais como referência de mercado.

## O que é este projeto

É um site de e-commerce/institucional montado em HTML, CSS e JavaScript puros (sem frameworks, sem back-end), pensado para simular uma loja de informática real: catálogo de produtos com preços em reais (R$), identidade visual própria, página de contato com formulário e mapa, e uma central de dúvidas com busca. Todo o texto do site foi escrito em **inglês** (proposital, como exercício), mas este README está em português para facilitar a apresentação em aula.

## Estrutura de pastas

```
ByteForge/
├── index.html          → Página inicial
├── product.html         → Catálogo de produtos
├── identity.html        → Identidade visual da marca
├── contact.html         → Contato e endereço
├── faq.html              → Central de dúvidas (FAQ)
├── 404.html              → Página de erro (link quebrado / página inexistente)
├── robots.txt            → Diretivas para crawlers de busca
├── css/
│   └── style.css        → Todo o estilo visual do site (cores, fontes, layout)
├── js/
│   └── main.js           → Toda a interatividade do site (menus, filtros, busca, formulários)
├── assets/
│   └── products/         → Fotos reais dos produtos usadas no catálogo
└── README.md             → Este arquivo
```

## Explicação de cada aba (página)

### 🏠 `index.html` — Página inicial (Home)
A "vitrine" da loja. Contém:
- **Cabeçalho (menu de navegação)**: logo da ByteForge e links para todas as outras páginas, presente em todas elas.
- **Hero (banner principal)**: frase de efeito, resumo do que a loja oferece e botões de ação ("Browse the catalog" e "About ByteForge").
- **Números de destaque**: quantidade de aparelhos vendidos, tempo médio de reparo e avaliação média dos clientes.
- **"Por que escolher a ByteForge"**: três cartões explicando os diferenciais da loja (hardware testado, reparos rápidos, garantia de 2 anos).
- **Produtos em destaque**: amostra de 3 produtos do catálogo, com preço e situação de estoque.
- **Newsletter**: campo de e-mail para "assinar" alertas de promoções (funciona apenas visualmente, não envia e-mail de verdade).
- **Rodapé**: repetido em todas as páginas, com links rápidos, endereço, telefone e e-mail da loja.

### 🛒 `product.html` — Catálogo de produtos
Onde ficam os produtos à venda, organizados por categoria:
- **Filtros por categoria**: botões (All, Laptops, Desktops, Components, Peripherals, Services) que mostram/escondem os produtos na hora, sem recarregar a página — feito em JavaScript (`js/main.js`).
- **Cartões de produto**: cada um mostra uma foto real do equipamento, com o fundo removido (PNG transparente), diretamente sobre o fundo em gradiente azul do card, além de nome, especificações técnicas, características extras, preço em R$ e status de estoque (Em estoque / Estoque baixo). Cada produto tem **duas fotos reais**: ao passar o mouse sobre a imagem, ela gira em 3D (CSS `rotateY`) e troca para uma segunda foto, mostrando o produto em outra posição/ângulo. As fotos estão em `assets/products/` (arquivo sem sufixo = foto 1, arquivo terminado em "2" = foto 2) e foram obtidas de fotos de produto reais, com o fundo removido por processamento de imagem, para fins de demonstração/apresentação — este é um projeto de protótipo, não uma loja em produção.
- **Produtos reais de mercado usados como referência**: Notebook Dell Inspiron 15, Notebook Lenovo IdeaPad 3, PC Gamer com Ryzen 5 5600 + RTX 4060, PC Desktop com Intel i3-12100, Fonte Corsair CV650, SSD Kingston NV2, Teclado Mecânico Redragon Kumara, Webcam Logitech C920, além de um serviço de diagnóstico completo.
- **"Como funciona nosso serviço de reparo"**: 4 passos explicando o processo de manutenção (diagnóstico grátis → aprovação do orçamento → reparo → retirada com garantia).

### 🎨 `identity.html` — Identidade visual da marca
Um "manual de marca" (brand guide), explicando visualmente como a ByteForge se apresenta:
- **História da loja**: texto contando a origem fictícia da ByteForge (aberta em 2014, em Boa Vista).
- **Logotipo**: o símbolo da marca (um "B" estilizado em formato de chip/circuito) mostrado em diferentes fundos (claro, escuro, azul) e as regras de uso (o que pode e o que não pode fazer com o logo).
- **Paleta de cores**: as cores oficiais da marca, com seus códigos hexadecimais (azul elétrico, tinta/grafite escuro, ciano, cinza-azulado e um tom claro de fundo).
- **Tipografia**: as fontes usadas no site (Space Grotesk para títulos, Inter para textos) e como cada uma se aplica.
- **Estilo de imagem e tom de voz**: como devem ser as fotos dos produtos e como a marca "fala" com o cliente (linguagem simples, direta, sem enrolação).

### 📍 `contact.html` — Contato e endereço
Como o cliente entra em contato com a loja:
- **Informações de contato**: endereço (Rua João Batista, Bairro Cinturão Verde, Boa Vista - RR), telefone, e-mail e horário de funcionamento.
- **Mapa estilizado**: uma representação visual (feita em CSS, não é um mapa real do Google Maps) só para indicar a localização da loja no layout.
- **Formulário de contato**: campos de nome, e-mail, assunto e mensagem. Ao enviar, aparece uma mensagem de confirmação na tela — mas como não há um servidor por trás, nenhum e-mail é realmente enviado (é só para demonstrar a interface).

### ❓ `faq.html` — Central de dúvidas (Help Center)
Perguntas frequentes organizadas por tema, no formato "sanfona" (accordion — clica e abre/fecha a resposta):
- **Barra de busca**: digite uma palavra (ex: "warranty") e o JavaScript filtra na hora só as perguntas relacionadas.
- **Categorias**: Orders & Shipping (pedidos e envio), Repairs & Warranty (reparos e garantia), Products & Compatibility (produtos e compatibilidade), Returns & Refunds (trocas e devoluções).
- **Menu lateral fixo**: acompanha a rolagem da página e permite pular direto para cada categoria.
- **Chamada final**: convite para o cliente entrar em contato caso não tenha encontrado a resposta.

## Como as páginas se conectam

Todas as 5 páginas compartilham o mesmo cabeçalho (menu) e rodapé, e usam os mesmos dois arquivos por trás:

- **`css/style.css`**: define toda a aparência — cores, fontes, tamanhos, espaçamentos, grades de produtos, botões, responsividade (o site se adapta para celular e tablet).
- **`js/main.js`**: dá vida à página — abre/fecha o menu no celular, controla o accordion do FAQ, faz a busca funcionar, filtra os produtos por categoria, e trata o envio dos formulários (contato e newsletter).

## Como visualizar o site

É um site 100% estático (sem instalação de nada). Duas formas de abrir:

**Opção 1 — Direto no navegador:**
Basta dar duplo clique no arquivo `index.html`.

**Opção 2 — Com um servidor local (recomendado):**
```bash
npx serve .
```
Depois acesse `http://localhost:3000` no navegador.

## Publicado no GitHub

Este projeto está versionado com Git e publicado em:
`https://github.com/ELopes00/ByteForge`

## Revisão de qualidade, acessibilidade e SEO

Este site passou por uma revisão de front-end que endereçou:

- **Acessibilidade**: navegação por teclado no accordion do FAQ (`role="button"`, `tabindex`, Enter/Espaço), link "Skip to content", `aria-expanded`/`aria-pressed` sincronizados via JS no menu mobile e nos filtros de produto, ícones puramente decorativos marcados com `aria-hidden`, rótulos para os campos de e-mail (newsletter) e busca (FAQ) que só tinham `placeholder`, e contraste do rodapé ajustado para atender WCAG AA.
- **SEO/compartilhamento**: metatags Open Graph e Twitter Card em todas as páginas, `theme-color`, dados estruturados `schema.org/ElectronicsStore` (endereço, telefone e horário) na página de contato, `robots.txt` e página `404.html` personalizada.
- **Performance**: a fonte do Google Fonts passou de `@import` (bloqueia a renderização) para `<link rel="preconnect">` + `<link rel="stylesheet">` no `<head>`.
- **Higiene do projeto**: comentário de cabeçalho do CSS ainda citava o nome antigo do projeto ("CircuitHub"); `.gitignore` adicionado.

**Limitações conhecidas (este é um site estático, sem back-end):**
- Os formulários de contato e newsletter só simulam o envio no navegador — nenhum e-mail é realmente enviado. Para uso real com clientes, é necessário um back-end (ou serviço de formulário como Formspree/Netlify Forms) antes de publicar.
- Não há certificado HTTPS, cabeçalhos de segurança (CSP, HSTS) nem proteção antispam — esses dependem do provedor de hospedagem escolhido (GitHub Pages, Netlify, Vercel etc.) e devem ser configurados na hospedagem final.
- As imagens de produto (`assets/products/`) estão na faixa de 100–400KB cada; antes de ir ao ar, vale convertê-las para WebP/AVIF para reduzir o tempo de carregamento.
