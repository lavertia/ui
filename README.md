# @lavertia/ui

Framework-neutral **production UI runtime** for Lavertia. The playground is a test application, not an ownership boundary.

This package contains the versioned component protocol and shared table utilities migrated from `lavertia/panels/resources/stubs/shared/types.ts`, plus the allowlisted PHP-to-CSS theme bridge. It has no React, Vue, Svelte, Laravel or Inertia runtime dependency.

## Theme contract

Lavertia pages receive a `lavertia.theme` object from Panels:

```json
{ "id": "classic", "tokens": { "primary": "#b45309", "primary-foreground": "#ffffff", "sidebar-primary": "#b45309", "sidebar-primary-foreground": "#ffffff", "ring": "#d97706" } }
```

Import `@lavertia/ui/theme.css` once in the framework page, add class `lvt-root` and apply `themeVariables(lavertia.theme)` (React/Vue) or `themeStyle(lavertia.theme)` (Svelte) to its root. The visual classes `lvt-primary`, `lvt-nav-active`, `lvt-eyebrow`, `lvt-stat-primary`, `lvt-focus`, `lvt-input` use semantic tokens.

The browser revalidates token **keys and hex colors**; PHP validates independently. Arbitrary CSS is not supported. The CSS has default values when no theme is configured.

## Development

```sh
npm install
npm test
```

Not published to npm: for alpha applications use `npm install github:lavertia/ui#main`. Pin to a commit for reproducible builds. Dependencies should ultimately be released and versioned together. See the frontend packages `react-ui`, `vue-ui` and `svelte-ui`.
