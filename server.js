const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const getNextId = (db, resource) => {
  const items = db.get(resource).value();
  if (!items || !items.length) return 1;

  const maxId = items.reduce((max, item) => {
    const id = typeof item.id === "number" ? item.id : parseInt(item.id);
    return id > max ? id : max;
  }, 0);

  return maxId + 1;
};

server.use((req, res, next) => {
  if (req.method === "GET" && req.query._page && req.query._limit) {
    const resourcePath = req.path.slice(1);
    const resources = router.db.get(resourcePath).value();

    if (!resources) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const totalCount = resources.length;
    res.header("X-Total-Count", totalCount);
  }
  next();
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    const resourcePath = req.path.slice(1); 
    const db = router.db;
    req.body.id = getNextId(db, resourcePath);
  }
  next();
});

server.use(middlewares);
server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
