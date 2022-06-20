import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default Token = () => {
  const user = useSelector((state) => state.user);
  const [token, setToken] = useState();

  const getLocation = async () => {
    axios
      .post(
        "https://api.festivaloffavignon.com/token/validate",
        {
          data: "",
        },
        {
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
            token: user.token,
          },
        }
      )
      .then((result) => {
        console.log("successToken", result.data);
        setToken(result.data);
      })

      .catch((error) => {});
  };

  useEffect(() => {
    getLocation();
  }, []);

  return token;
};
