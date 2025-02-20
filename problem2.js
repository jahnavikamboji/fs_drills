// Problem 2:
// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Read the given file lipsum.txt
// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const fs = require("fs");

function readTheLipsum(callback) {
  fs.readFile("lipsum.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading lipsum.txt:", err);
      return;
    }
    console.log("Read lipsum.txt successfully.");
    callback(data);
  });
}

function convertToUpperCase(data, callback) {
  const upperCaseData = data.toUpperCase();
  const fileName = "../uppercase.txt";

  fs.writeFile(`${fileName}`, upperCaseData, (err) => {
    if (err) {
      console.error("Error writing", fileName, ":", err);
      return;
    }
    console.log("uppercase.txt created successfully.");
  });
  fs.writeFile('../filenames.txt', `${fileName}\n`, (err) => {
    if (err) {
      console.error("Error writing", `${fileName}`, ":", err);
      return;
    }
    console.log("uppercase.txt is added to filenames successfully.");
    callback(data);
  });
}

function convertToLowerAndSplit(callback) {
  fs.readFile("../uppercase.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading uppercase.txt:", err.message);
      return;
    }
    const lowerCaseData = data.toLowerCase();
    const sentences = lowerCaseData.split(".").join("\n");
    const fileName = "../lowercase.txt";

    fs.writeFile(`${fileName}`, sentences, (err) => {
      if (err) {
        console.error("Error writing", fileName, ":", err);
        return;
      }
      console.log("lowercase.txt created successfully.");
    });
    fs.appendFile('../filenames.txt', `${fileName}\n`, (err) => {
      if (err) {
        console.error("Error writing", fileName, ":", err);
        return;
      }
      console.log("lowercase.txt is added to filenames successfully.");
      callback(data);
    });
  });
}

function sortFileContents(callback) {
  fs.readFile("../lowercase.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading sorted.txt:", err);
      return;
    }
    const sortedData = data.trim().split("\n").sort().join("\n");
    const fileName = "../sorted.txt";

    fs.writeFile(`${fileName}`, sortedData, (err) => {
      if (err) {
        console.error("Error writing", fileName, ":", err);
        return;
      }
      console.log("sorted.txt created successfully.");
    });
    fs.appendFile('../filenames.txt', `${fileName}\n`, (err) => {
      if (err) {
        console.error("Error writing", fileName, ":", err.message);
        return;
      }
      console.log("sorted.txt is added to filenames successfully.");
      callback(data);
    });
  });
}

function toDeleteFiles(callback) {
  fs.readFile("../filenames.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const filesToDelete = data.split('\n').filter( ele => ele.length > 0);
    console.log('asdlfkjhalksjdfhaljsdhflkadshfakjdshlfahsdfj',filesToDelete)
    let count = 1;
    filesToDelete.forEach((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.error(`Error deleting ${file}:`, err);
        } else {
          console.log(`${file} deleted successfully!`);
        }
        count++;
        if (count == 4) {
          callback();
        }
      });
    });
  });
}
// /adsfasdfasdf

function executeTask() {
  readTheLipsum((data) => {
    convertToUpperCase(data, () => {
      convertToLowerAndSplit(() => {
        sortFileContents(() => {
          toDeleteFiles(() => {
            console.log("All tasks completed successfully.");
          });
        });
      });
    });
  });
}
// executeTask();

module.exports = executeTask;
