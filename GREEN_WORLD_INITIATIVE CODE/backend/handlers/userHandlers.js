const userServices = require("../services/userServices.js");
const { roles } = require("../constants/index.js");

const getUserHandler = async (req, res) => {
  const { uid } = req.params;
  const response = await userServices.getUserById(uid);
  res.send(JSON.stringify(response));
};

const getAllUsersHandler = async (_, res) => {
  const response = await userServices.getAllUsers();
  res.send(JSON.stringify(response));
};

const getAllAdminsHandler = async (_, res) => {
  const response = await userServices.getAllUsers(roles.ADMIN);
  res.send(JSON.stringify(response));
};

const createUserHandler = async (req, res) => {
  const { uid, fullName, mobile, email, role } = req.body;
  await userServices.createUser(uid, fullName, mobile, email, role);
  res.status(200).json({ status: "ok" });
};

const createAdminHandler = async (req, res) => {
  const {
    uid,
    fullName,
    mobile,
    email,
    region,
    zone,
    kabina,
    password,
  } = req.body;
  const adminDetails = { region, zone, kabina };
  await userServices.createUser(
    uid,
    fullName,
    mobile,
    email,
    roles.ADMIN,
    adminDetails,
    password
  );
  res.status(200).json({ status: "ok" });
};

const editAdminHandler = async (req, res) => {
  const { uid } = req.params;
  const { region, zone, kabina } = req.body;
  await userServices.updateAdmin(uid, region, zone, kabina);
  res.status(200).json({ status: "ok" });
};

module.exports = {
  getUserHandler,
  getAllUsersHandler,
  getAllAdminsHandler,
  createUserHandler,
  createAdminHandler,
  editAdminHandler,
};
