import axios from "axios";

const cloudinaryUpload = async (image) => {
  //formats image file to be able to upload to cloudinary
  try {
    const arr = image.split(".");
    const imgType = arr[arr.length - 1];
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: `image/${imgType}`,
      name: `upload.${imgType}`,
    });
    formData.append("upload_preset", "panchofdez");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/fdez/image/upload",
      formData
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export default cloudinaryUpload;
