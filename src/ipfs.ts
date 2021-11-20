const pinataSDK = require("@pinata/sdk");
import * as dotenv from "dotenv";
import * as fs from "fs";
import { NFTs, NFT } from "./nft";
import axios from "axios";
const FormData = require("form-data");
const recursive = require("recursive-fs");
const basePathConverter = require("base-path-converter");
import * as util from "util";

const readDirectory = async (dir: string): Promise<string[]> => {
  const readdir = util.promisify(fs.readdir);
  try {
    return await readdir(dir);
  } catch (err) {
    console.log(err);
  }
};

export const getFormDataFromDirectory = async (name, dir) => {
  // we gather the files from a local directory in this example,
  // but a valid readStream is all that's needed for each file in the directory.
  let data = new FormData();
  let files = await readDirectory(dir);

  // natural sort of alphanumerical strings
  files = files.sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  // get relative paths for strings
  files.forEach((file) => {
    // for each file stream, we need to include the
    // correct relative file path
    let relative_path = `${dir}/${file}`;
    if (relative_path.endsWith(".png") || relative_path.endsWith(".json")) {
      data.append(`file`, fs.createReadStream(relative_path), {
        filepath: basePathConverter(dir, relative_path),
      });
    }
  });
  const pinataMetadata = JSON.stringify({
    name: name,
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", pinataMetadata);
  return data;
};

export const pinDirectoryToIPFS = async (formData): Promise<string> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  return axios
    .post(url, formData, {
      //this is needed to prevent axios from erroring out with large directories
      maxBodyLength: 10000000000,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: `${process.env.PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.PINATA_SECRET_KEY}`,
      },
    })
    .then(function (response) {
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      //handle error here
      console.error(error);
    });
};

export const uploadDirectoryToIPFS = async (
  name: string,
  directory: string
): Promise<string> => {
  console.log(`uploading ${directory} to IPFS`);
  let files = await getFormDataFromDirectory(name, directory);
  let ipfsHash = await pinDirectoryToIPFS(files);
  return ipfsHash;
};

export const uploadJSONDirectoryToIPFS = async (
  name: string,
  directory: string
): Promise<string> => {
  console.log(`uploading ${directory} to IPFS`);
  let files = await getFormDataFromDirectory(name, directory);
  let ipfsHash = await pinDirectoryToIPFS(files);
  return ipfsHash;
};
