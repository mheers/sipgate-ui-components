import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ActiveCallCard from './ActiveCallCard.vue';
import CallTimer from './CallTimer.vue';
import CommunicationBadge from './CommunicationBadge.vue';
import DeviceStatusBadge from './DeviceStatusBadge.vue';
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

  it('does not create an empty tel link for an unusable number', () => {
    const wrapper = mount(PhoneNumber, { props: { value: 'nope' } });
    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.text()).toContain('nope');
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

describe('DeviceStatusBadge', () => {
  it('spells the state out by default', () => {
    const wrapper = mount(DeviceStatusBadge, { props: { status: 'dnd' } });
    expect(wrapper.text()).toBe('Do not disturb');
  });

  it('keeps the label for screen readers when the text is hidden', () => {
    const wrapper = mount(DeviceStatusBadge, {
      props: { status: 'busy', showLabel: false },
    });
    expect(wrapper.text()).toContain('Busy');
    expect(wrapper.find('.sr-only').exists()).toBe(true);
  });
});

describe('ActiveCallCard', () => {
  it('offers answer and decline for an incoming call', () => {
    const wrapper = mount(ActiveCallCard, {
      props: { number: '+493012345678', state: 'ringing', direction: 'inbound' },
    });
    expect(wrapper.text()).toContain('Answer');
    expect(wrapper.text()).toContain('Decline');
    expect(wrapper.text()).toContain('Ringing');
  });

  it('offers only a cancel action for an outgoing call', () => {
    const wrapper = mount(ActiveCallCard, {
      props: { number: '+493012345678', state: 'ringing', direction: 'outbound' },
    });
    expect(wrapper.text()).not.toContain('Answer');
    expect(wrapper.text()).toContain('Cancel call');
    expect(wrapper.text()).toContain('Calling');
  });
});
