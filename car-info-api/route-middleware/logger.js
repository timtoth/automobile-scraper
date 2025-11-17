const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  
  // 1. Perform an action (e.g., logging)
  console.log(`[${time}] ${req.method} request received for ${req.url}`);
  
  // 2. LOG request info to postgres

  // 3. IMPORTANT: Call next() to move to the next step
  next(); 
};

module.exports = logger;