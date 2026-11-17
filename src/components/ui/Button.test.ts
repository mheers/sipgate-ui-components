import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('disables itself and keeps its label while loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Sending' },
    });

    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
    expect(button.attributes('aria-busy')).toBe('true');
    // The label stays in the layout (and the accessibility tree) so the width
    // does not jump when the spinner appears.
    expect(wrapper.text()).toContain('Sending');
    expect(wrapper.find('.opacity-0').exists()).toBe(true);
  });

  it('emits click and respects the native type', async () => {
    const wrapper = mount(Button, { props: { type: 'submit' }, slots: { default: 'Save' } });
    expect(wrapper.attributes('type')).toBe('submit');
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
