const express = require("express");
const router = express.Router();
const userHandlers = require("../handlers/userHandlers.js");
const treeHandlers = require("../handlers/treeHandlers.js");
const locationHandlers = require("../handlers/locationHandlers.js");

const routes = (app) => {
  ////////////////// TREE ROUTES //////////////////

  router.get("/allTrees", (req, res) => {
    treeHandlers.getAllTreesHandler(req, res);
  });

  router.post("/userTrees", (req, res) => {
    treeHandlers.getUserTreesHandler(req, res);
  });

  router.get("/treeRequests", (req, res) => {
    treeHandlers.getTreeRequestsHandler(req, res);
  });

  router.post("/createTreeRequest", (req, res) => {
    treeHandlers.createTreeRequestHandler(req, res);
  });

  router.post("/editTreeRequest/:requestId", (req, res) => {
    treeHandlers.editTreeRequestHandler(req, res);
  });

  router.post("/decideTreeRequest", (req, res) => {
    treeHandlers.decideTreeRequestHandler(req, res);
  });

  ////////////////// USER ROUTES //////////////////

  router.get("/allUsers", (req, res) => {
    userHandlers.getAllUsersHandler(req, res);
  });

  router.get("/user/:uid", (req, res) => {
    userHandlers.getUserHandler(req, res);
  });

  router.post("/createUser", (req, res) => {
    userHandlers.createUserHandler(req, res);
  });

  router.post("/createAdmin", (req, res) => {
    userHandlers.createAdminHandler(req, res);
  });

  router.post("/editAdmin/:uid", (req, res) => {
    userHandlers.editAdminHandler(req, res);
  });

  router.get("/allAdmins", (req, res) => {
    userHandlers.getAllAdminsHandler(req, res);
  });

  ////////////////// LOCATION ROUTES //////////////////

  router.post("/addRegion", (req, res) => {
    locationHandlers.addRegionHandler(req, res);
  });

  router.post("/addZone", (req, res) => {
    locationHandlers.addZoneHandler(req, res);
  });

  router.post("/addKabina", (req, res) => {
    locationHandlers.addKabinaHandler(req, res);
  });

  router.post("/addPark", (req, res) => {
    locationHandlers.addParkHandler(req, res);
  });

  router.get("/regions", (req, res) => {
    locationHandlers.getRegions(req, res);
  });

  router.get("/zones", (req, res) => {
    locationHandlers.getZones(req, res);
  });

  router.get("/kabinas", (req, res) => {
    locationHandlers.getKabinas(req, res);
  });

  return router;
};

module.exports = routes;
