const express = require("express");

const router = express.Router();
//express에 Router을 가져온다

router.get("/", (req, res) => {
  res.send("admin 이후 url");
});
//  /admin url 생성

//만약 /admin/products를 넣고싶다면
router.get("/products", (req, res) => {
  res.render("/admin/products.html", {
    message: "hello!",
  });
  //app.js에서 템플릿폴더를 지정했기 때문에 template폴더 이후 경로
});

module.exports = router;
//내보내준다.
