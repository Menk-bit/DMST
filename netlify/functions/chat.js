const data = await response.json();

return {
  statusCode: 200,
  body: JSON.stringify({
    debug: data
  })
};
