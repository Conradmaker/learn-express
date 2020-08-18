const express = require("express");
const admin = require("./routes/admin"); //admin 호출
const contacts = require("./routes/contacts");
const nunjucks = require("nunjucks"); //nunjucks 호출
const logger = require("morgan"); //morgan 호출
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

nunjucks.configure("template", {
  //template폴더로 셋팅 (이름이 다르면 다른이름으로)
  autoescape: true, //js가 그대로 노출되는 태그를 걸러줌(보안상)
  express: app, //위에서 지정한 const app = express(); 선택
});

//미들웨어 셋팅
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));
//express.static:정적폴더를 추적해주는것

app.use((req, res, next) => {
  app.locals.isLogin = false;
  next();
});
// 이렇게 하면 위에서부터 타고 타고 아래 라우팅으로 넘어가기 때문에,
//isLogin을 템플릿에서 언제든지 접근할 수 있습니다.

app.get("/", (req, res) => {
  res.send("express start");
});

//미들웨어
function vipMiddleware(req, res, next) {
  console.log("최우선 미들웨어");
  next();
}

app.use("/admin", vipMiddleware, admin);
//  /admin url은 admin파일을 참고해라
app.use("/contacts", contacts);
//  /contacts url은 contacts파일을 참고해라

app.use((req, res, next) => {
  res.status(400).render("common/404.html");
});
//응답상태가 400번대면 404.html을 렌더링해라
app.use((req, res, _) => {
  res.status(500).render("common/500.html");
});
app.listen(port, () => {
  console.log("Express listening on port", port);
});
