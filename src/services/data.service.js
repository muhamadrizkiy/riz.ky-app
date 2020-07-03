import http from "../http-common";

class DataService {

  login(data) {
    return http.post("/Users/login", data);
  }

  signup(data) {
    return http.post("/Users", data);
  }

  getUser(id) {
    return http.get("/Users/"+id);
  }

  generateLink(data) {
    return http.post("/link/generate");
  }

  getLink(data, token) {
    return http.get("/link");
  }

  getLinkByUser(user, token) {
    return http.get("/link/getLinkByUser?user="+user);
  }

  generateCustomLink(data) {
    return http.post("/link/generate/custom", data);
  }

  deleteLink(id) {
    return http.delete("/link/"+id);
  }

}

export default new DataService();