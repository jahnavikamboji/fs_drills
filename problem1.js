// Problem 1:
// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously
const fs = require("fs");

function createDirectory(callback) {
  fs.mkdir("./files", (err) => {
    if (err) {
      console.error("Error creating directory:", err);
      return;
    }
    console.log("Directory created");
    callback();
  });
}

function createFiles(data,callback) {
  for (let i = 1; i <= 3; i++) {
    const fileName = `./files/${i}.json`;
    const content = `${JSON.stringify(data, null, 2)}`;
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.error(`Error creating file ${fileName}`, err);
        return;
      }
      console.log(`${fileName}File created successfully`);
      if(i==3){
        callback();
      }
    });
  }
}

function deleteTheFiles() {
  for (let i = 1; i <= 3; i++) {
    const fileName = `files/${i}.json`; 
    fs.unlink(fileName, (err) => {
      if(err){
        console.log(err.message)
        return;
      }
      console.log(`${fileName} deleted successfully`);
    });
  }
}

let data = [
  { name: "jack", mail: "jack@gmail.com" },
  { name: "ron", mail: "ron@gmail.com" },
  { name: "harry", mail: "harry@gmail.com" },
];

function taskFiles() {
  createDirectory(() => {
    createFiles(data,() => {
      deleteTheFiles(() => {
        console.log("All tasks completed successfully");
      });
    });
  });
}

module.exports = taskFiles;