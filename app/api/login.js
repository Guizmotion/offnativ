import client from "./clientFestival";
const endpoint = "token";
let email = "perodo@gmail.com";
let password = "6876#ae57";

const login = () =>
  client.post(
    endpoint,
    {
      email: email, //'perodo@gmail.com',//JSON.stringify(data.email),//'perodo@gmail.com',
      password: password, // password,//'6876#ae57',//JSON.stringify(data.password),//'6876#ae57',

      device_id: "71b9555cfb0463ca",
      device_name: "M2007J17G",
    },
    {
      headers: {
        "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
      },
    }
  );

export default {
  login,
};
