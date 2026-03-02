import axios from "axios";

const ApiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type":"multipart/form-data",
    },
});

const Api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json"
    },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
};

export const registerApi = (data) => Api.post("/api/auth/register", data);
export const  loginApi = (data) =>Api.post("/api/auth/login", data);
export const getUser = (id) => Api.get(`api/auth/getUserByid/${id}`);
export const updateUserApi = (formData, id) => Api.put(`api/auth/update/${id}`, formData, config);

export const addMovieApi = (data) => ApiFormData.post("api/movie/addmovie", data, config)
export const updateMovieApi = (editingId, dataToSend) => ApiFormData.put(`api/movie/update/${editingId}`, dataToSend, config)
export const getAllMovie = () => Api.get("api/movie/getall")
export const getMovieById = (data) => Api.get("api/movie/get-movie-by-id/${data}", data)
export const deleteMovieApi = (editingId) => Api.delete(`api/movie/delete/${editingId}`);

export const addHallApi = (data) => Api.post("api/cinema/add", data, config);
export const updateHallApi = (formData, editingId) =>Api.put(`api/cinema/update/${editingId}`, formData, config);
export const deleteHallApi = (editingId) => Api.delete(`api/cinema/delete/${editingId}`);
export const getAllHalls = () => Api.get("api/cinema/get-all");

export const addShowTimeApi = (data) => Api.post("api/cinema/showtimes", data, config);
export const getShowTimes = () => Api.get("api/cinema/get-showtime");
export const deleteSchedule = (editingId) => Api.delete(`api/cinema/showtime/delete/${editingId}`);

export const getSeatsByShowtime = (showtimeId) => Api.get(`api/cinema/seats/showtime/${showtimeId}`);
export const bookSeatApi = (data) => Api.patch("api/cinema/seats/book", data, config);
export const releaseSeatApi = (data) => Api.patch("api/cinema/seats/release", data, config);

export const addBookingApi = (data) => Api.post("api/booking/add", data, config);
export const getBookingApi = (id) => Api.get(`api/booking/get/${id}`);
export const deleteBookingApi = (editingId) => Api.delete(`api/booking/delete/${editingId}`);

//stripe requests
export const addStripeApi = (data) =>Api.post("api/payment", data, config);
