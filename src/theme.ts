/** A strict, serializable theme contract shared by all Lavertia UI adapters. */
export const themeTokenNames = [
    'primary',
    'primary-foreground',
    'sidebar-primary',
    'sidebar-primary-foreground',
    'ring',
] as const;

export type ThemeTokenName = typeof themeTokenNames[number];

export interface LavertiaTheme {
    id: string;
    tokens: Partial<Record<ThemeTokenName, string>>;
}

/**
 * Accept only hex colors from the documented token allowlist. No CSS, URLs,
 * functions, or arbitrary properties may cross the PHP -> browser boundary.
 */
export function themeVariables(theme: LavertiaTheme | undefined): Record<string, string> {
    const variables: Record<string, string> = {};
    if (!theme || typeof theme !== 'object' || !theme.tokens || typeof theme.tokens !== 'object') {
        return variables;
    }

    for (const name of themeTokenNames) {
        const value = theme.tokens[name];
        if (typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)) {
            variables['--lvt-' + name] = value;
        }
    }

    return variables;
}

/** Useful for Svelte style attributes; values are already validated above. */
export function themeStyle(theme: LavertiaTheme | undefined): string {
    return Object.entries(themeVariables(theme))
        .map(([name, value]) => name + ': ' + value)
        .join('; ');
}
