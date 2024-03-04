const fs = require("fs");
const path = require("path");

// Criar uma pasta

// fs.mkdir(path.join(__dirname, "/test"), (err) => {
//   if (err) return console.log("Erro:", err);
//   console.log("pasta criada com sucesso");
// });

// Criar um arquivo
fs.writeFile(path.join(__dirname, "test", "test.txt"), "hello 1 ", (err) => {
  if (err) return console.log(err);
  console.log("arquivo criada com sucesso");

  // add a um arquivo
  fs.appendFile(path.join(__dirname, "test", "test.txt"), " hello 2", (err) => {
    if (err) return console.log(err);
    console.log("segungo txt adicionado com sucesso");
  });

  // ler arquivo
  fs.readFile(
    path.join(__dirname, "test", "test.txt"),
    "utf-8",
    (err, data) => {
      if (err) return console.log(err);
      console.log(data);
    }
  );
});
