import React, { useState } from "react";

global.domain = "www.xyz.com";
global.token = "";
global.isLogged = false;

export const AuthContext = React.createContext();
