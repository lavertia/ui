import assert from 'node:assert/strict';
import test from 'node:test';
import { themeVariables, themeStyle, tableColumns, visibleTableRows } from '../dist/index.js';

test('themes accept only allowlisted hexadecimal token values', () => {
    const input = { id: 'classic', tokens: {
        primary: '#123ABC', ring: 'url(javascript:alert(1))',
        'primary-foreground': '#ffffff', arbitrary: '#ffffff',
    } };
    assert.deepEqual(themeVariables(input), {
        '--lvt-primary': '#123ABC',
        '--lvt-primary-foreground': '#ffffff',
    });
    assert.equal(themeStyle(input), '--lvt-primary: #123ABC; --lvt-primary-foreground: #ffffff');
    assert.deepEqual(themeVariables(undefined), {});
});

test('shared table helpers preserve component protocol behavior', () => {
    const node = {
        type: 'table', key: 'root/members', props: {},
        components: [{ type: 'text-column', key: 'root/members/name', components: [],
            props: { name: 'name', searchable: true, sortable: true, toggleable: true } }],
    };
    const columns = tableColumns(node);
    assert.equal(columns[0]?.key, 'name');
    assert.deepEqual(visibleTableRows([{ name: 'Maya' }, { name: 'Ali' }], columns, 'ma', null, 'asc'), [{ name: 'Maya' }]);
});
