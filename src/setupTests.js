import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

Enzyme.configure({ adapter: new Adapter() });

module.exports = {
  'setupTestFrameworkScriptFile': 'jest-enzyme',
  'testEnvironment': 'enzyme',
  'testEnvironmentOptions': {
    'enzymeAdapter': 'react16',
  },
};
