import '../Jest';

import {
  DataFormat
} from '../../../src/components/util';

describe('DataFormatTest', () => {
  describe('dataTime', () => {
    it('should dataTime', () => {
      expect(DataFormat.dataTime()).toMatch(new RegExp(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/));
    });
  });
});