const { json } = require("body-parser");
const http = require("http");
const port = 7070;

const users = [
  {
    id: 1,
    name: "altamiro",
    lastename: "junior",
    age: 22,
    addres: [
      {
        street: "the book is on the table",
        number: 14,
        block: "d-day",
      },
    ],
    email: "thebookisonthetable@desk.com",
  },
  {
    id: 22,
    name: "carla",
    lastename: "silva",
    age: 30,
    addres: [
      {
        street: "sunset boulevard",
        number: 45,
        block: "c-cube",
      },
    ],
    email: "carla.silva@email.com",
  },
  {
    id: 3,
    name: "pedro",
    lastename: "gonçalves",
    age: 28,
    addres: [
      {
        street: "mountain view",
        number: 21,
        block: "b-building",
      },
    ],
    email: "pedro.g@email.com",
  },
];

const serve = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.writeHead(200, { "Context-Type": "text/html" });
    res.end("<h1>Home page</h1>");
  }
  if (req.url === "/users") {
    res.writeHead(200, { "Context-Type": "application/json" });
    res.end(JSON.stringify(users));
  }

  if (req.url.startsWith("/user/")) {
    const userId = parseInt(req.url.split("/")[2]);

    const user = users.find((user) => user.id === userId);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

serve.listen(port, () => console.log(`http://localhost:${port}`));









// const { json } = require("body-parser");
// const http = require("http");
// const port = 7070;

// const users = [
//   {
//     id: 1,
//     name: "altamiro",
//     lastename: "junior",
//     age: 22,
//     addres: [
//       {
//         street: "the book is on the table",
//         number: 14,
//         block: "d-day",
//       },
//     ],
//     email: "thebookisonthetable@desk.com",
//   },
//   {
//     id: 22,
//     name: "carla",
//     lastename: "silva",
//     age: 30,
//     addres: [
//       {
//         street: "sunset boulevard",
//         number: 45,
//         block: "c-cube",
//       },
//     ],
//     email: "carla.silva@email.com",
//   },
//   {
//     id: 3,
//     name: "pedro",
//     lastename: "gonçalves",
//     age: 28,
//     addres: [
//       {
//         street: "mountain view",
//         number: 21,
//         block: "b-building",
//       },
//     ],
//     email: "pedro.g@email.com",
//   },
// ];

// const serve = http.createServer((req, res) => {
//   if (req.url === "/home") {
//     res.writeHead(200, { "Context-Type": "text/html" });
//     res.end("<h1>Home page</h1>");
//   }
//   if (req.url === "/users") {
//     res.writeHead(200, { "Context-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   }

//   if (req.url.startsWith("/user/")) {
//     const userId = parseInt(req.url.split("/")[2]);

//     const user = users.find((user) => user.id === userId);

//     if (user) {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(user));
//     } else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "User not found" }));
//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Endpoint not found" }));
//   }
// });

// serve.listen(port, () => console.log(`http://localhost:${port}`));
