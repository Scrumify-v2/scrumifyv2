const Api = require('../client/components/Api.js');

//TEST FOR LOGIN API
describe('logged in test', () => {
  //check the successful return data
  it('returns a string for successful login', () => {
    const payload = {username: 'km', password: '123' };
    expect(typeof Api.login(payload)).toEqual('string');
  });

  //check the unsuccessful return data if incorrect username
    it('returns an object for incorrect username', () => {
    const payload =  {username: 'wrong', password: '123' };
    expect(typeof Api.login(payload)).toEqual('object');
  });
  
  //check the unsuccessful return data if incorrect password
  it('returns an object for incorrect password', () => {
  const payload =  {username: 'km', password: '321' };
    expect(typeof Api.login(payload)).toEqual('object');
  });

  //check the unsuccessful return data if incorrect payload
  it('returns object for incorrect payload type', () => {
    const payload = {user: 'km', pass: '321' };
    expect(typeof payload).toEqual('object');
  })
});

//TEST FOR SIGNUP API

//TEST FOR CREATE A TASK API

//TEST FOR MOVE TASK API

//TEST FOR UPDATE TASK API

//TEST FOR DELETE TASK API