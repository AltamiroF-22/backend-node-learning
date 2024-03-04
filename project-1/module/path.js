const path = require("path");

//Apenas o nome do arquivo atual
console.log(path.basename(__filename));

//Apenas do Diretório atual
console.log(path.basename(__dirname));

//extenção do arquivo
console.log(path.extname(__filename));

// criar um obj path
console.log(path.parse(__filename));

// Juntar caminho de arquivos
console.log(path.join(__dirname, "test", "test.html"));
