const express = require("express");

function testMiddleware(req, res, next) {
  console.log("첫번째 미들웨어");
  next();
}

function testMiddleware2(req, res, next) {
  console.log("두번째 미들웨어");
  next();
}

const router = express.Router();
//express에 Router을 가져온다

router.get("/", testMiddleware, testMiddleware2, (req, res) => {
  //미들웨어를 중간에 넣어주면 앞에서부터 실행된다.
  res.send("admin 이후 url");
});
//  /admin url 생성

//만약 /admin/products를 넣고싶다면
router.get("/products", (req, res) => {
  res.render("admin/products.html", {
    message: "hello!",
    online: "express",
  });
  //app.js에서 템플릿폴더를 지정했기 때문에 template폴더 이후 경로
});

router.get("/products/write", (req, res) => {
  res.render("admin/write.html");
});

router.post("/products/write", (req, res) => {
  res.send(req.body.name);
});

module.exports = router;
//내보내준다.
