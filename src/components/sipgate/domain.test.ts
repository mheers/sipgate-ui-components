import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CallTimer from './CallTimer.vue';
import CommunicationBadge from './CommunicationBadge.vue';
import PhoneNumber from './PhoneNumber.vue';

describe('PhoneNumber', () => {
  it('renders a formatted tel link', () => {
    const wrapper = mount(PhoneNumber, { props: { value: '+49 30 12345678' } });
    const link = wrapper.find('a');
    expect(link.text()).toBe('+49 30 1234 5678');
    expect(link.attributes('href')).toBe('tel:+493012345678');
  });

  it('renders a plain span when links are disabled', () => {
    const wrapper = mount(PhoneNumber, {
      props: { value: '+49 30 12345678', link: false },
    });
    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.text()).toContain('+49 30 1234 5678');
  });
});

describe('CallTimer', () => {
  it('renders a fixed duration', () => {
    const wrapper = mount(CallTimer, { props: { seconds: 65 } });
    expect(wrapper.text()).toBe('1:05');
    expect(wrapper.attributes('aria-label')).toContain('1 min');
  });
});

describe('CommunicationBadge', () => {
  it('labels a missed call', () => {
    const wrapper = mount(CommunicationBadge, {
      props: { type: 'call', direction: 'missed' },
    });
    expect(wrapper.text()).toBe('Missed call');
  });

  it('labels an SMS', () => {
    const wrapper = mount(CommunicationBadge, { props: { type: 'sms' } });
    expect(wrapper.text()).toBe('SMS');
  });
});
