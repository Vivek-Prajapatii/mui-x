import * as React from 'react';
import { BasePickerInputProps, UsePickerValueNonStaticProps } from '@mui/x-date-pickers/internals';
import { PickerComponentFamily } from '../describe.types';
import { DescribeValueOptions } from './describeValue.types';
import { testControlledUnControlled } from './testControlledUnControlled';
import { testPickerOpenCloseLifeCycle } from './testPickerOpenCloseLifeCycle';
import { testPickerActionBar } from './testPickerActionBar';

const TEST_SUITES = [testControlledUnControlled, testPickerOpenCloseLifeCycle, testPickerActionBar];

/**
 * Tests various aspects of the picker value.
 */
export function describeValue<TValue, C extends PickerComponentFamily>(
  ElementToTest: React.ElementType,
  getOptions: () => DescribeValueOptions<C, TValue>,
) {
  const { defaultProps } = getOptions();

  function WrappedElementToTest(
    props: BasePickerInputProps<TValue, any, any, any> & UsePickerValueNonStaticProps<TValue>,
  ) {
    return <ElementToTest {...defaultProps} {...props} />;
  }

  describe('Value API', () => {
    TEST_SUITES.forEach((testSuite) => {
      testSuite(WrappedElementToTest, getOptions);
    });
  });
}
