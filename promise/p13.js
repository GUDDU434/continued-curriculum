let interval = setInterval(() => {
  console.log("Loading...");
}, 1000);

setTimeout(() => {
  console.log("Loaded successfully!");
  clearInterval(interval);
}, 5000);
