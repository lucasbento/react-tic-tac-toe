import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import BoardSpace from '../BoardSpace';

function setupComponent() {
  const props = {
    column: 2,
    index: 1,
    value: 1,
    handleNewMark: jest.fn(),
    isWinnerMark: jest.fn(),
    getPlayerSymbol: () => 'X',
  };

  const wrapper = shallow(
    <BoardSpace {...props} />,
  );

  return {
    props,
    wrapper,
  };
}

describe('<BoardSpace />', () => {
  it('should render without exploding', () => {
    const { wrapper } = setupComponent();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handle new mark on board space click', () => {
    const { wrapper, props } = setupComponent();

    wrapper.find('li').first().simulate('click');

    expect(props.handleNewMark.mock.calls).toEqual([
      [props.column, props.index],
    ]);
  });
});
