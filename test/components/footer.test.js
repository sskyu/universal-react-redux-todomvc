import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { getTextContent } from '../util';
import Footer from '../../src/common/components/Footer';
import style from '../../src/common/styles/components/footer.scss';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../src/common/constants/todoFilters';

function setup(propOverrides) {
  const props = Object.assign({
    completedCount   : 0,
    activeCount      : 0,
    filter           : SHOW_ALL,
    onClearCompleted : sinon.spy(),
    onShow           : sinon.spy()
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer {...props} />);
  const output = renderer.getRenderOutput();

  return { props, output };
}

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { output } = setup();
      assert(output.type === 'footer');
    });

    it('should display active count when 0', () => {
      const { output } = setup({ activeCount: 0 });
      const [ count ] = output.props.children;
      assert(getTextContent(count) === 'No items left');
    });

    it('should render filters', () => {
      const { output } = setup({ activeCount: 1 });
      const [ count ] = output.props.children;
      assert(getTextContent(count) === '1 item left');
    });

    it('should render filters', () => {
      const { output } = setup();
      const filters = output.props.children[1];

      assert(filters.type === 'ul');
      assert(filters.props.className === style.filters);
      assert(filters.props.children.length === 3);

      filters.props.children.forEach((filter, i) => {
        assert(filter.type === 'li');
        const a = filter.props.children;
        if (i === 0) {
          assert(a.props.className === style.filterSelected);
        } else {
          assert(a.props.className === '');
        }
        assert(a.props.children === {
          0: 'All',
          1: 'Active',
          2: 'Completed'
        }[i]);
      });
    });

    it('should call onShow when a filter is clicked', () => {
      const { output, props } = setup();
      const filters = output.props.children[1];
      const filterLink = filters.props.children[1].props.children;
      filterLink.props.onClick({});
      assert(props.onShow.calledWith(SHOW_ACTIVE));
    });

    it('should not show clear button when no completed todos', () => {
      const { output } = setup({ completedCount: 0 });
      const clear = output.props.children[2];
      assert(clear === undefined);
    });

    it('shoud render clear button when completed todos', () => {
      const { output } = setup({ completedCount: 1 });
      const clear = output.props.children[2];
      assert(clear.type === 'button');
      assert(clear.props.children === 'Clear completed');
    });

    it('shoud call onClearCompleted on clear button click', () => {
      const { output, props } = setup({ completedCount: 1 });
      const clear = output.props.children[2];
      clear.props.onClick({});
      assert(props.onClearCompleted.called);
    });
  });
});
