import { jwtDecode } from "jwt-decode";

export default function AdminAccess() {

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const isAdmin = user?.role === "admin";
return isAdmin;
}