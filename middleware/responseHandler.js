module.exports = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // If already formatted, send through
    if (data && data.success !== undefined) {
      return originalJson(data);
    }
    // Wrap into standardized success response
    return originalJson({ success: true, data });
  };
  next();
};