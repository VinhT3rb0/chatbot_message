import express from "express";
import path from "path";

let configViewEngine = (app) => {
    app.use(express.static(path.join(__dirname, "../public"))); // Đường dẫn tuyệt đối tới thư mục public
    app.set("view engine", "ejs"); // Sử dụng EJS làm view engine
    app.set("views", path.join(__dirname, "../views")); // Đường dẫn tuyệt đối tới thư mục views
};

export default configViewEngine;
