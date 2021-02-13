import { fetcher } from "../utils";

export const createUser = (data: any) =>
  fetcher("/api/createUser", "POST", data);

export const createAdmin = (data: any) =>
  fetcher("/api/createAdmin", "POST", data);

export const editAdmin = (uid: string, data: any) =>
  fetcher(`/api/editAdmin/${uid}`, "POST", data);

export const createTreeRequest = (data: any) =>
  fetcher("/api/createTreeRequest", "POST", data);

export const getRegions = () => fetcher("/api/regions");

export const getZones = () => fetcher("/api/zones");

export const getKabinas = () => fetcher("/api/kabinas");

export const getUser = (uid: string) => fetcher(`/api/user/${uid}`);

export const getUserTreeRequests = (
  uid: string,
  status: null | string = null
) => {
  const queryParams = `?uid=${uid}${status ? `&status=${status}` : ""}`;
  return fetcher(`/api/treeRequests${queryParams}`);
};

export const decideTreeRequest = (requestId: string, action: string) =>
  fetcher(
    `/api/decideTreeRequest?requestId=${requestId}&action=${action}`,
    "POST"
  );

export const editTreeRequest = (requestId: string, data: any) => {
  fetcher(`/api/editTreeRequest/${requestId}`, "POST", data);
};
