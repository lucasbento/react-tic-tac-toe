import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { initialState as game } from '../../reducers/game';
import ConnectedApp, { App } from '../App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setupComponent() {
  const props = {
    ...game,
    actions: {
      gameRestart: jest.fn(),
      gameChoosePlayer: jest.fn(),
      newMark: jest.fn(),
    },
  };

  const wrapper = shallow(
    <App {...props} />,
  );

  return {
    props,
    wrapper,
  };
}

describe('<App />', () => {
  it('should render without exploding', () => {
    const store = mockStore({
      game,
    });

    const wrapper = shallow(
      <ConnectedApp store={store} />,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should choose symbol `X` on initialization', () => {
    const { wrapper, props } = setupComponent();

    // Simulate a click to choose the `X` symbol
    wrapper.find('Button[name="symbol-X"]').simulate('click');

    expect(props.actions.gameChoosePlayer.mock.calls).toEqual([
      ['X'],
    ]);

    // Mount component again
    const { wrapper: newWrapper, props: newProps } = setupComponent();

    // Simulate a click to choose the `O` symbol
    newWrapper.find('Button[name="symbol-O"]').simulate('click');

    expect(newProps.actions.gameChoosePlayer.mock.calls).toEqual([
      ['O'],
    ]);
  });

  it('should choose symbol `O` on initialization', () => {
    const { wrapper, props } = setupComponent();

    // Simulate a click to choose the `O` symbol
    wrapper.find('Button[name="symbol-O"]').simulate('click');

    expect(props.actions.gameChoosePlayer.mock.calls).toEqual([
      ['O'],
    ]);
  });

  it('should restart the game on button click', () => {
    const { wrapper, props } = setupComponent();

    wrapper.find('Button[name="restart"]').simulate('click');

    expect(props.actions.gameRestart.mock.calls.length).toBe(1);
  });
});
