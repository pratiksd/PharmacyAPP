import api from "./api";

export const getMedicines = () =>
    api.get("/pharmacy");

export const addMedicine = (medicine) =>
    api.post("/pharmacy", medicine);

