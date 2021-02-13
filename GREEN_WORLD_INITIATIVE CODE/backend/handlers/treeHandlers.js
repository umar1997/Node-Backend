const treeServices = require("../services/treeServices.js");
const { status } = require("../constants/index.js");

const getUserTreesHandler = async (req, res) => {
  const { treeIds } = req.body;
  const response = await treeServices.getMultipleTrees(treeIds);
  res.send(JSON.stringify(response));
};

const getAllTreesHandler = async (_, res) => {
  const response = await treeServices.getAllTrees();
  res.send(JSON.stringify(response));
};

const createTreeRequestHandler = async (req, res) => {
  const { region, zone, kabina, address, uid } = req.body;
  await treeServices.createTreeRequest(region, zone, kabina, address, uid);
  res.status(200).json({ status: "ok" });
};

const getTreeRequestsHandler = async (req, res) => {
  const { uid, status } = req.query;
  const response = await treeServices.getTreeRequests(uid, status);
  res.send(JSON.stringify(response));
};

const editTreeRequestHandler = async (req, res) => {
  const { requestId } = req.params;
  const payload = req.body;
  await treeServices.editTreeRequest(requestId, payload);
  res.status(200).json({ status: "ok" });
};

const decideTreeRequestHandler = async (req, res) => {
  const { requestId, action } = req.query;
  await treeServices.decideTreeRequest(requestId, action);
  res.status(200).json({ status: "ok" });
};

module.exports = {
  getUserTreesHandler,
  getAllTreesHandler,
  createTreeRequestHandler,
  getTreeRequestsHandler,
  editTreeRequestHandler,
  decideTreeRequestHandler,
};
