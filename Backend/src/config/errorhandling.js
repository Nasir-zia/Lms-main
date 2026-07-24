import mongoose from "mongoose";

const database_validation_handling = () => {
  const state = mongoose.connection.readyState;

  //  Connection status log
  const states = {
    0: " Disconnected",
    1: " Connected",
    2: " Connecting",
    3: " Disconnecting",
  };

  console.log(" Database Status:", states[state]);

  if (state !== 1) {
    console.log(" Database is not fully connected. Skipping duplicate check.");
    return;
  }

  //  List all collections
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error(" Error listing collections:", err);
      return;
    }

    console.log(" Collections Found:");
    const names = collections.map(c => c.name);
    names.forEach(n => console.log(" -", n));

    //  Detect duplicates (case-insensitive)
    const lowerMap = {};
    const duplicates = [];

    names.forEach(name => {
      const lower = name.toLowerCase();
      if (lowerMap[lower]) {
        duplicates.push(name);
      } else {
        lowerMap[lower] = true;
      }
    });

    if (duplicates.length > 0) {
      console.error(" Duplicate Collections Detected:");
      duplicates.forEach(d => console.log(" -", d));
    } else {
      console.log(" No duplicate collections found.");
    }
  });
};

export { database_validation_handling };
