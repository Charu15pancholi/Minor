const express = require("express");
const router = express.Router();
const {
  handleShowHomePage,
  handleShowDashboard,
  handleShowProfile,
  handleShowUploadPDF,
  handleUploadPDF,
  handleShowLoginPage,
  handleLoginUser,
  handleShowRegisterPage,
  handleRegisterUser,
  handleLogoutUser,
} = require("../controllers/mainController");

router.get("/", handleShowHomePage);

router.get("/dashboard", handleShowDashboard);
router.get("/profile", handleShowProfile);
router.get("/uploadpdf", handleShowUploadPDF);
router.post("/uploadpdf", handleUploadPDF);

router.get("/login", handleShowLoginPage);
router.post("/login", handleLoginUser);
router.get("/register", handleShowRegisterPage);
router.post("/register", handleRegisterUser);
router.get("/logout", handleLogoutUser);

module.exports = router;
