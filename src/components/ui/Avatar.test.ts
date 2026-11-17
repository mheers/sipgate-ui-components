import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Avatar from './Avatar.vue';

describe('Avatar', () => {
  it('announces the name and presence', () => {
    const wrapper = mount(Avatar, { props: { name: 'Anna de Vries', status: 'online' } });
    expect(wrapper.attributes('role')).toBe('img');
    expect(wrapper.attributes('aria-label')).toBe('Anna de Vries, online');
    expect(wrapper.text()).toContain('AV');
  });

  it('stays out of the accessibility tree when decorative', () => {
    const wrapper = mount(Avatar, { props: { name: 'Anna', decorative: true } });
    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('falls back to initials when the image fails', async () => {
    const wrapper = mount(Avatar, { props: { name: 'Anna', src: '/missing.jpg' } });
    await wrapper.find('img').trigger('error');
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.text()).toContain('AN');
  });
});
