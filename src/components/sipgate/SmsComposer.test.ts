import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SmsComposer from './SmsComposer.vue';

describe('SmsComposer', () => {
  it('shows character and segment counts', () => {
    const wrapper = mount(SmsComposer, {
      props: { modelValue: 'Hello', recipient: '+4915112345678' },
    });
    expect(wrapper.text()).toContain('5 chars');
    expect(wrapper.text()).toContain('1 segment');
    expect(wrapper.text()).toContain('GSM-7');
  });

  it('switches to UCS-2 for emoji', () => {
    const wrapper = mount(SmsComposer, {
      props: { modelValue: 'Hi 😀', recipient: '+4915112345678' },
    });
    expect(wrapper.text()).toContain('UCS-2');
  });

  it('emits a typed send payload', async () => {
    const wrapper = mount(SmsComposer, {
      props: { modelValue: 'Hello', recipient: '+4915112345678' },
    });
    const send = wrapper.findAll('button').find((button) => button.text().includes('Send'));
    await send?.trigger('click');
    const events = wrapper.emitted('send');
    expect(events).toHaveLength(1);
    expect(events?.[0]?.[0]).toMatchObject({
      message: 'Hello',
      recipient: '+4915112345678',
      analysis: { segments: 1, encoding: 'gsm7' },
    });
  });

  it('sends with ctrl+enter', async () => {
    const wrapper = mount(SmsComposer, {
      props: { modelValue: 'Hello', recipient: '+4915112345678' },
    });
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', ctrlKey: true });
    expect(wrapper.emitted('send')).toHaveLength(1);
  });

  it('blocks sending without a recipient when the field is shown', () => {
    const wrapper = mount(SmsComposer, {
      props: { modelValue: 'Hello', recipient: '' },
    });
    const send = wrapper.findAll('button').find((button) => button.text().includes('Send'));
    expect(send?.attributes('disabled')).toBeDefined();
  });

  it('disables sending for an empty message', () => {
    const wrapper = mount(SmsComposer, {
      props: { modelValue: '', recipient: '+4915112345678' },
    });
    const send = wrapper.findAll('button').find((button) => button.text().includes('Send'));
    expect(send?.attributes('disabled')).toBeDefined();
  });
});
