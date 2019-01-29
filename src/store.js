//import aesjs from 'aes-js';
import {AsyncStorage} from 'react-native';

// My attempt at obfuscating username and password storage
// At build time, the encryption key and paramaters for scrypt
// are read in from config files and used to pre-calculate the hash
//
// This is a little ridiculous but screw it
//export default key_hash = preval`
//  //const dotenv = require('dotenv');
//  //const path = require('path');
//  // Load private .env file
//  //dotenv.config()
//  // Load commited public.env file to provide defaults for N,r,p
//  // dotenv.config(path.resolve(process.cwd(), 'public.env'))
//  const scrypt = require('scrypt');
//
//  //const env = process.env
//  const params = {N: env.SCRYPT_N, r: env.SCRYPT_r, p: env.SCRYPT_p};
//  const params = {N: 16384, r: 8, p: 1};
//  //Actual hash
//  const hash = scrypt.kdfSync(env.USER_DATA_ENCRYPTION_KEY, params);
//  console.log(hash);
//  module.exports = hash;
//`;

async function storeInfo(username, password) {
    const cleaned_username = username.replace(/@grinnell\.edu/i,'');
    try {
        //TODO: Replace with single await
        await AsyncStorage.setItem('@info:username', cleaned_username);
        await AsyncStorage.setItem('@info:password', password);
    } catch(e) {
        return "error setting info";
    }
}
