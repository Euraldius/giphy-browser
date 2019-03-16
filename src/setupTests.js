import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock')

module.exports = {
  'setupTestFrameworkScriptFile': 'jest-enzyme',
  'testEnvironment': 'enzyme',
  'testEnvironmentOptions': {
    'enzymeAdapter': 'react16',
  },
};
