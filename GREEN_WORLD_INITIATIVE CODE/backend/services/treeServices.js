const { db } = require("./../db");
const { status, actions } = require("./../constants/index.js");

const getAllTrees = async () => {
  const response = [];
  const trees = db.collection("trees");
  const snapshot = await trees.get();
  snapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });
  return response;
};

const getMultipleTrees = async (treeIds) => {
  const response = [];
  const refs = treeIds.map((id) => db.doc(`trees/${id}`));
  const trees = await db.getAll(...refs);
  trees.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });
  return response;
};

const createTreeRequest = async (region, zone, kabina, address, uid) => {
  const requests = db.collection("requests");
  await requests.add({
    region,
    zone,
    kabina,
    address,
    uid,
    count: 1,
    status: status.PENDING,
    created: new Date(),
  });
};

const getTreeRequests = async (uid, status) => {
  const response = [];
  let query = db.collection("requests");
  if (uid) query = query.where("uid", "==", uid);
  if (status) query = query.where("status", "==", status);

  const snapshot = await query.get();
  snapshot.forEach((doc) => {
    response.push({
      requestId: doc.id,
      ...doc.data(),
      created: doc.data().created.toDate(),
    });
  });
  return response;
};

const editTreeRequest = async (requestId, payload) => {
  const request = db.collection("requests");
  await request.doc(requestId).update(payload);
};

const decideTreeRequest = async (requestId, action) => {
  const requestStatus =
    action === actions.APPROVED ? status.ACCEPTED : status.REJECTED;
  const request = db.collection("requests");
  await request.doc(requestId).update({
    status: requestStatus,
  });
};

module.exports = {
  getAllTrees,
  getMultipleTrees,
  createTreeRequest,
  getTreeRequests,
  editTreeRequest,
  decideTreeRequest,
};
