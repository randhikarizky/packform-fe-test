export type Technology = {
  name: string;
  description: string;
  links: Array<{
    title: string;
    url: string;
  }>;
};
export const technologies: Technology[] = [
  {
    name: "Next.js",
    description:
      "Next.js is the leading framework in the React ecosystem, featuring server-side rendering and static site generation among other rendering techniques. Utilizing its file-based routing architecture and its zero-config design principle, it is designed to enhance both the user and developer experience.",
    links: [
      {
        title: "Website",
        url: "https://nextjs.org/",
      },
      {
        title: "Docs",
        url: "https://nextjs.org/docs",
      },
      {
        title: "Learn Next.js",
        url: "https://nextjs.org/learn",
      },
      {
        title: "GitHub",
        url: "https://github.com/vercel/next.js",
      },
      {
        title: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Next.js",
      },
    ],
  },
  {
    name: "React",
    description:
      "React is a JavaScript library for building declarative and flexible user interfaces in a functional paradigm. Being the most popular front-end library in the world, it enables developers to create reusable UI components that can be composed to build complex web applications.",
    links: [
      {
        title: "Website",
        url: "https://reactjs.org/",
      },
      {
        title: "Docs",
        url: "https://reactjs.org/docs/getting-started.html",
      },
      {
        title: "GitHub",
        url: "https://github.com/facebook/react",
      },
      {
        title: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
      },
    ],
  },
  {
    name: "TypeScript",
    description:
      "TypeScript is a programming language developed and maintained by Microsoft. It is a syntactical superset of JavaScript, adding static typing to the language. TypeScript shows useful type errors to developers during development in modern IDEs, saving time developers would have otherwise spent debugging the software at runtime.",
    links: [
      {
        title: "Website",
        url: "https://www.typescriptlang.org/",
      },
      {
        title: "Docs",
        url: "https://www.typescriptlang.org/docs/",
      },
      {
        title: "GitHub",
        url: "https://github.com/microsoft/TypeScript",
      },
      {
        title: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/TypeScript",
      },
    ],
  },
  {
    name: "Emotion",
    description:
      "Emotion is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.",
    links: [
      {
        title: "Website",
        url: "https://emotion.sh/",
      },
      {
        title: "Docs",
        url: "https://emotion.sh/docs/introduction",
      },
      {
        title: "GitHub",
        url: "https://github.com/emotion-js/emotion",
      },
    ],
  },
  {
    name: "Material UI",
    description:
      "Material UI is a React UI component library that implements Google's material design guidelines. It features pre-built with components ranging from basic buttons and form input fields to tooltips and modals.",
    links: [
      {
        title: "Website",
        url: "https://material-ui.com/",
      },
      {
        title: "Docs",
        url: "https://material-ui.com/getting-started/installation/",
      },
      {
        title: "GitHub",
        url: "https://github.com/mui-org/material-ui",
      },
    ],
  },
  {
    name: "ESLint",
    description:
      "ESLint is a tool for linting JavaScript and TypeScript code. It is used to check for errors in code and to enforce coding conventions. It can be configured to use custom rule sets and is often run both by code editors during development as well as in CI/CD.",
    links: [
      {
        title: "Website",
        url: "https://eslint.org/",
      },
      {
        title: "Configuration",
        url: "https://eslint.org/docs/user-guide/configuring/",
      },
      {
        title: "Rules",
        url: "https://eslint.org/docs/rules/",
      },
      {
        title: "GitHub",
        url: "https://github.com/eslint/eslint",
      },
    ],
  },
  {
    name: "Prettier",
    description:
      "Prettier is a tool for formatting code. It is optimized for readability and consistency, and its opinionated nature ensures developers won't spent time debating code formatting configurations. Prettier normally runs in a pre-commit hook to ensure code is formatted before it is committed.",
    links: [
      {
        title: "Website",
        url: "https://prettier.io/",
      },
      {
        title: "Docs",
        url: "https://prettier.io/docs/en/index.html",
      },
      {
        title: "Options",
        url: "https://prettier.io/docs/en/options.html",
      },
      {
        title: "GitHub",
        url: "https://github.com/prettier/prettier",
      },
    ],
  },
  {
    name: "npm",
    description:
      "npm is the default package manager for Node.js. It consists of a command-line client, also called npm, and an online database of packages, called the npm registry, that enable developers to share and reuse code.",
    links: [
      {
        title: "Website",
        url: "https://www.npmjs.com/",
      },
      {
        title: "Docs",
        url: "https://docs.npmjs.com/",
      },
      {
        title: "GitHub",
        url: "https://github.com/npm/cli",
      },
    ],
  },
];
