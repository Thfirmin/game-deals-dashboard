# 🎯 Desafio Frontend: Game Deals Dashboard - CheapShark API

Desenvolva um __dashboard de ofertas de jogos__ utilizando a [CheapShark API][cheap-shark-api-doc] com foco em __design moderno e experiência de usuário__.

## ⚙️ Tecnologias Recomendadas

- [ReactJS][reactjs-doc]
- [TailwindCSS][tailwindcss-doc]
- Qualquer biblioteca de UI como:
  - [Shadcn/UI][shadcn-doc]
  - [Lucide Icons][lucide-icons-doc]
  - [Radix UI][radix-ui-doc]
  - outros similares
- [Axios][axios-doc]
- [TypeScript][typescript-doc] (Opcional)

## 📌 Funcionalidades obrigatórias

1. Data table de jogos

- Exibir os jogos retornados pela API `/deals` em um __data table__.
- A tabela deve conter:
    - Nome do jogo
    - Preço atual
    - Preço original
    - Porcentagem de desconto
    - Loja
    - Nota (Deal Rating)

> Pode usar bibliotecas como `@tanstack/react-table`, `shadcn/ui` (data-table), ou criar sua própria.

2. Filtros e selects

- Filtro por __loja__ (StoreID)
- Filtro por __faixa de preço__ (LowerPrice e UpperPrice)
- Filtro por __porcentagem minima de desconto__
- Select para __ordenar__ por:
    - Price
    - Savings
    - Deal Rating
- Campo de __busca por título__

3. Modal de Detalhes

- Ao clicar em uma linha da tabela ou card, abrir um modal com mais detalhes sobre o jogo:
    - Nome do jogo
    - Imagem maior
    - Preços (atual e original)
    - Loja
    - Histórico de menor preço (historicalLow)
    - Link para compra

4. Componentização

- Criar componentes reutilizáveis, organizados por pastas:
    - `<DataTable />`
    - `<GameModal />`
    - `<FilterSidebar />` ou `<FilterControls />`
    - `<Select />`, `<Input />`, `<PriceRange />`
    - `<GameCard />` (Caso deseje um modo de vizualização alternativo)

5. Design e UX

- Layout moderno e responsivo
- Modais, transições suaves e boa hierarquia visual
- Ícones e elementos interativos com feedback visual (hover, foco, loading)
- Tema escuro/claro (opcional)

6. Extras (Diferenciais)

- Scroll infinito ou paginação
- Salvamento de favoritos com localStorage/cookies
- Skeleton loaders
- Toggle para mudar entre __modo tabela__ e __modo cards__

<!-- Footer -->

> _Desafio idealizado pela equipe da [Leader Empresarial][leader-empresarial] - 08/2025_

<!-- React README -->

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

<!-- Links -->

[cheap-shark-api-doc]:<https://apidocs.cheapshark.com/>
[reactjs-doc]:<https://react.dev/>
[tailwindcss-doc]:<https://tailwindcss.com/>
[shadcn-doc]:<https://ui.shadcn.com/>
[lucide-icons-doc]:<https://lucide.dev/icons/>
[radix-ui-doc]:<https://www.radix-ui.com/>
[axios-doc]:<https://axios-http.com/ptbr/docs/intro>
[typescript-doc]:<https://www.typescriptlang.org/>
[leader-empresarial]:<https://www.leaderempresarial.com.br/>
