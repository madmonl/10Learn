require('dotenv').config({ path: '.env.test' });
// This file helps us configure the environment we want to 
// run tests from. heps enzyme run with the adapter.
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({
    adapter: new Adapter()
});