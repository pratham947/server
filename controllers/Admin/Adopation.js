import Adoption from "../../models/Adoption.js";
import cloudinary from "cloudinary";
import { authenticate } from "../../schemas/Adoption.js";

export const AddChild = async (req, res) => {
  const body = req.body;
  const validation = authenticate.safeParse(body);
  if (!validation.success) return res.status(400).send(validation.error.errors);
  const {
    name,
    age,
    fathername,
    mothername,
    description,
    isEducationStarted,
    current_class,
    child_image,
    url,
  } = req.body;

  const mycloud = await cloudinary.v2.uploader.upload(url);

  const adoptiobj = {
    name,
    age,
    fathername,
    mothername,
    description,
    isEducationStarted,
    current_class,
    child_image,
    image: {
      public_id: mycloud.public_id,
      url: mycloud.url,
    },
  };
  const adtopted = await Adoption(adoptiobj);
  adtopted.save();
  res.status(201).json({
    adtopted,
    MessageChannel: "child successfully created",
  });
};

export const removechild = async (req, res) => {
  const { childId } = req.body;
  await Adoption.findOneAndRemove({ _id: childId });
  return res.status(201).json({
    message: "child deleted",
  });
};

export const updateChild = async (req, res) => {
  await Adoption.findOneAndUpdate({ _id: id }, req.body);
  res.status(201).json({
    message: "update successfully",
  });
};

export const updateImage = async (req, res) => {
    const {url,child_id} = req.body;
    
};
