const { db } = require("../db");
const { status, roles } = require("../constants/index.js");

const addRegion = async (regionName) => {
  const region = db.collection("region");
  await region.add({
    name: regionName,
  });
};

const addZone = async (zoneName, region) => {
  const zone = db.collection("zone");
  await zone.add({
    name: zoneName,
    region,
  });
};

const addKabina = async (kabinaName, region, zone) => {
  const kabina = db.collection("kabina");
  await kabina.add({
    name: kabinaName,
    region,
    zone,
  });
};

const addPark = async (
  region,
  zone,
  kabina,
  parkName,
  gardnerName,
  gardnerMobile,
  otherDetails
) => {
  const park = db.collection("park");
  await park.add({
    name: parkName,
    region,
    zone,
    kabina,
    gardnerName,
    gardnerMobile,
    otherDetails,
  });
};

const getRegions = async () => {
  const response = [];
  const region = db.collection("region");
  const snapshot = await region.get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    response.push({ regionId: doc.id, ...data });
  });
  return response;
};

const getZones = async (region = null) => {
  const response = [];
  const query = db.collection("zone");
  if (region) query = query.where("region", "==", region);

  const snapshot = await query.get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    response.push({ zoneId: doc.id, ...data });
  });
  return response;
};

const getKabinas = async (region = null, zone = null) => {
  const response = [];
  const query = db.collection("kabina");
  if (region) query = query.where("region", "==", region);
  if (zone) query = query.where("zone", "==", zone);

  const snapshot = await query.get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    response.push({ kabinaId: doc.id, ...data });
  });
  return response;
};

module.exports = {
  addRegion,
  addZone,
  addKabina,
  addPark,
  getRegions,
  getZones,
  getKabinas,
};
