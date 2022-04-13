const dummyToken = "qwer1234";

// Mock auth, can be replaces with jwt for real world scenarios.
const auth = (req) => {
  const requestToken = req.headers["auth"];

  if (!requestToken || requestToken != dummyToken) {
    return false;
  }
  return true;
};

module.exports = auth;
