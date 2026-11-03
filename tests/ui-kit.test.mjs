import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_UI_KIT, activeUiKitId, isUiKitId } from '../dist/index.js';

test('UI kit selection is optional and defaults to the built-in renderer', () => {
    assert.equal(DEFAULT_UI_KIT, 'default');
    assert.equal(activeUiKitId(), 'default');
    assert.equal(activeUiKitId({ id: 'shadcn' }), 'shadcn');
    assert.equal(activeUiKitId({ id: 'vendor.my-kit' }), 'vendor.my-kit');
});

test('invalid or arbitrary UI kit identifiers are not accepted', () => {
    for (const id of ['../shadcn', 'A', 'bad/name', 'ui..kit', 'bad kit', '']) {
        assert.equal(isUiKitId(id), false);
        assert.throws(() => activeUiKitId({ id }), /Invalid Lavertia UI Kit/);
    }
});
