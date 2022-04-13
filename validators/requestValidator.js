const requestValidator = (body) => {
  if (!body.url) {
    return { isValid: false, message: "URL not passed" };
  }

  const urlParts = new URL(body.url);
  if (!urlParts.searchParams.get("EdpNo")) {
    return { isValid: false, message: "Invalid URL" };
  }

  return { isValid: true };
};

module.exports = requestValidator;
