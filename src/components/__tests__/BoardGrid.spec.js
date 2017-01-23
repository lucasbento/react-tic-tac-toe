import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { initialState } from '../../reducers/game';

import BoardGrid from '../BoardGrid';

function setupComponent() {
  const props = {
    grid: initialState.boardGrid,
    handleNewMark: jest.fn(),
    isWinnerMark: jest.fn(),
    getPlayerSymbol: jest.fn(),
  };

  const wrapper = shallow(
    <BoardGrid {...props} />,
  );

  return {
    props,
    wrapper,
  };
}

describe('<BoardGrid />', () => {
  it('should render without exploding', () => {
    const { wrapper } = setupComponent();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
