import { World } from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { RenderResult } from '@testing-library/react';

export interface TestingLibraryWorld extends World {
  pickle?: ITestCaseHookParameter[ 'pickle' ] | null;
  component?: RenderResult;
}
