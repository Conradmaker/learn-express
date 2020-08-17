const express = require("express");
const admin = require("./routes/admin"); //admin 호출
const contacts = require("./routes/contacts");
const nunjucks = require("nunjucks"); //nunjucks 호출
const logger = require("morgan"); //morgan 호출

const app = express();
const port = 3000;

nunjucks.configure("template", {
  //template폴더로 셋팅 (이름이 다르면 다른이름으로)
  autoescape: true, //js가 그대로 노출되는 태그를 걸러줌(보안상)
  express: app, //위에서 지정한 const app = express(); 선택
});

//미들웨어 셋팅
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("express start");
});
//
function vipMiddleware(req, res, next) {
  console.log("최우선 미들웨어");
  next();
}

app.use("/admin", vipMiddleware, admin);
//  /admin url은 admin파일을 참고해라
app.use("/contacts", contacts);
//  /contacts url은 contacts파일을 참고해라

app.listen(port, () => {
  console.log("Express listening on port", port);
});
