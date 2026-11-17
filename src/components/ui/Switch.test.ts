import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Switch from './Switch.vue';

describe('Switch', () => {
  it('emits the next value when toggled', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, label: 'Do not disturb' },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('renders the description and links the label', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        label: 'Call recording',
        description: 'Keep recordings for 90 days.',
      },
    });
    expect(wrapper.text()).toContain('Call recording');
    expect(wrapper.text()).toContain('Keep recordings for 90 days.');
    const id = wrapper.find('button').attributes('id');
    expect(wrapper.find('label').attributes('for')).toBe(id);
  });
});
