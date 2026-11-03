/** A serializable selection, not a bundled UI implementation. */
export interface LavertiaUiKit {
    id: string;
}

export const DEFAULT_UI_KIT = 'default';

/** Only safe, stable component/kit identifiers cross the Inertia boundary. */
export function isUiKitId(value: unknown): value is string {
    return typeof value === 'string' && value.length <= 96
        && /^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)?$/.test(value);
}

export function activeUiKitId(uiKit?: LavertiaUiKit): string {
    const id = uiKit?.id ?? DEFAULT_UI_KIT;
    if (!isUiKitId(id)) {
        throw new Error('Invalid Lavertia UI Kit identifier.');
    }
    return id;
}
