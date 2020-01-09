import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import LoginForm from '../../src/components/LoginForm.vue';

describe('LoginForm.vue', () => {
  it('login form renders', () => {
    const wrapper = shallowMount(LoginForm, {});
    expect(wrapper.text()).to.include('LOGIN');
    expect(wrapper.text()).to.include('SUBMIT');
  });
});
