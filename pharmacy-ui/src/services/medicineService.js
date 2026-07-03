import api from "./api";

export const getMedicines = () =>
    api.get("/pharmacy");

export const getMedicine = (id) =>
    api.get(`/pharmacy/${id}`);

export const addMedicine = (medicine) =>
    api.post("/pharmacy", medicine);

export const updateMedicine = (id, medicine) =>
    api.put(`/pharmacy/${id}`, medicine);

export const deleteMedicine = (id) =>
    api.delete(`/pharmacy/${id}`);