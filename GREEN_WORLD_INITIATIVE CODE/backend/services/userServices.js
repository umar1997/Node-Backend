const { db, admin } = require("./../db");
const { roles } = require("../constants/index.js");

const getUserById = async (uid) => {
  const query = db.collection("users").doc(uid);
  const doc = await query.get();
  if (!doc.exists) return null;
  else return { id: doc.id, ...doc.data() };
};

const getAllUsers = async (role = null) => {
  const response = [];
  let query = db.collection("users");
  if (role) query = query.where("role", "==", role);

  const snapshot = await query.get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    const { region, zone, kabina } = data.adminDetails;
    response.push({ uid: doc.id, ...data, region, zone, kabina });
  });
  return response;
};

const createAuthUser = async (email, password, role = roles.ADMIN) => {
  const user = await admin.auth().createUser({
    email,
    password,
    displayName: role,
  });
  return user.uid;
};

const createUser = async (
  uid,
  fullName,
  mobile,
  email,
  role,
  adminDetails = null,
  password = null
) => {
  if (!uid.length && role === roles.ADMIN)
    uid = await createAuthUser(email, password);

  const users = db.collection("users");
  let userDetails = {
    fullName,
    mobile,
    email,
    treeIds: [],
    role,
  };

  if (adminDetails !== null)
    userDetails = Object.assign({}, userDetails, { adminDetails });
  await users.doc(uid).set(userDetails);
};

const updateAdmin = async (uid, region, zone, kabina) => {
  await db.collection("users").doc(uid).update({
    adminDetails: { region, zone, kabina },
  });
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateAdmin,
};
