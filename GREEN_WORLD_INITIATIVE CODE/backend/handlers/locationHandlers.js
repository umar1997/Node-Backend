const locationServices = require("../services/locationServices.js");

const addRegionHandler = async (req, res) => {
  const { region } = req.body;
  await locationServices.addRegion(region);
  res.status(200).json({ status: "ok" });
};

const addZoneHandler = async (req, res) => {
  const { zone, region } = req.body;
  await locationServices.addZone(zone, region);
  res.status(200).json({ status: "ok" });
};

const addKabinaHandler = async (req, res) => {
  const { kabina, region, zone } = req.body;
  await locationServices.addKabina(kabina, region, zone);
  res.status(200).json({ status: "ok" });
};

const addParkHandler = async (req, res) => {
  const {
    region,
    zone,
    kabina,
    park,
    gardnerName,
    gardnerMobile,
    otherDetails,
  } = req.body;
  await locationServices.addPark(
    park,
    region,
    zone,
    kabina,
    gardnerName,
    gardnerMobile,
    otherDetails
  );
  res.status(200).json({ status: "ok" });
};

const getRegions = async (_, res) => {
  const response = await locationServices.getRegions();
  res.send(JSON.stringify(response));
};

const getZones = async (_, res) => {
  const response = await locationServices.getZones();
  res.send(JSON.stringify(response));
};

const getKabinas = async (_, res) => {
  const response = await locationServices.getKabinas();
  res.send(JSON.stringify(response));
};

module.exports = {
  addRegionHandler,
  addZoneHandler,
  addKabinaHandler,
  addParkHandler,
  getRegions,
  getZones,
  getKabinas,
};
