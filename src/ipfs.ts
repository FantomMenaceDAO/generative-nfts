const pinataSDK = require("@pinata/sdk");
import * as dotenv from "dotenv";
// import * as fs from 'fs';
import { NFTs, NFT } from "./nft";
// import axios from 'axios';
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const recursive = require("recursive-fs");
const basePathConverter = require("base-path-converter");

export const pinDirectoryToIPFS = (
  name,
  src,
  pinataApiKey,
  pinataSecretApiKey
) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
  recursive.readdirr(src, function (err, dirs, files) {
    let data = new FormData();
    files.forEach((file) => {
      //for each file stream, we need to include the
      // correct relative file path
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    });
    const metadata = JSON.stringify({
      name: name,
      keyvalues: {
        exampleKey: "exampleValue",
      },
    });
    data.append("pinataMetadata", metadata);
    return axios
      .post(url, data, {
        //this is needed to prevent axios from erroring out with large directories
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      })
      .then(function (response) {
        //handle response here
      })
      .catch(function (error) {
        //handle error here
        console.log(error);
      });
  });
};

export const uploadNFTsToIPFS = async (nfts: NFTs) => {
  let name = "d-mall-test-images";
  let path = "./output/images";
  pinDirectoryToIPFS(
    name,
    path,
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_KEY
  );

  let name2 = "d-mall-metadata-json";
  let path2 = "./output/metadata";
  pinDirectoryToIPFS(
    name2,
    path2,
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_KEY
  );
};
