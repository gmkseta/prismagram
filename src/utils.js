import dotenv from "dotenv";
import path from "path"
dotenv.config({path: path.resolve(__dirname, ".env")});

import { adjectives, nouns } from "./words";

import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

import { checkForResolveTypeResolver } from "graphql-tools";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length)
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API
    }
  }
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email, function(err, res){
    if(err) {
      console.log(err)
    }else{
      console.log(res)
    }
  });
}


export const sendSecretMail = (address, secret) => {
  const email = {
    from: "gmkseta@gmail.com",
    to: address,
    subject: "Login Secret form Prismafram ",
    html: `Hello! Your login secret it ${secret}. <br/> Copy paste on the app to log in`
  }
  return sendMail(email);
}