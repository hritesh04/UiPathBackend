const handleUpload = require("../utils/cloudinary");
module.exports = function uploadImages(files) {
  const photoUrls = [];
  files.map(async (file) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes.secure_url);
    photoUrls.push(cldRes.secure_url);
  });
  return photoUrls;
};
