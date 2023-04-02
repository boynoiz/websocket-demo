import path from 'path';
import dotEnv from "dotenv";
import { Bootstrap } from "./bootstrap"

export default function () {
  let envFile = ".env";
  const loadEnv = dotEnv.config({
    path: path.join(__dirname, '../../' + envFile)
  });

  if (loadEnv.error) {
    throw loadEnv.error;
  }

  const config = new Bootstrap();
  return config;
}
