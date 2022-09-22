const axios = require('axios');
require('dotenv').config();
const fetch = require("isomorphic-fetch");

const recaptchaVerification = async (req, res) => {

    const url =
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.response}`;
     
    fetch(url, {
        method: "post",
      })
        .then((response) => response.json())
        .then((google_response) => {
     
          // google_response is the object return by
          // google as a response
          if (google_response.success == true) {
            //   if captcha is verified
            return res.status(200).json({ response: "Successful" });
          } else {
            // if captcha is not verified
            console.log(google_response);
            return res.status(401).json({ response: "Failed" });
          }
        })
        .catch((error) => {
            // Some error while verify captcha
          return res.status(404).json({ error });
        });

    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // console.log('Reply Captcha ', req.body.response)
    // const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
    //     params: {
    //         secret: process.env.SECRET_KEY,
    //         response: req.body.response
    //     }
    // });

    // console.log('Capth Response ', response);
    
    // if(response && response.success) {
    //     res.status(200).json(response.data);
    // } else {
    //     res.status(401).json(response.data);
    // }
}

module.exports = {
    recaptchaVerification
}