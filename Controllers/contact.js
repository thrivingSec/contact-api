import { Contact } from "../Model/Contact.js";

// create new user
export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const id = req.user._id;

  if( name.length === 0 || email.length === 0 || phone.length === 0 ) return res.json({message:"all fields are required", success:false});

  let contact = await Contact.findOne({email});

  if(contact) return res.status(400).json({message:"contact already exists", success:false});

  contact = await Contact.create({name, email, phone, userId:id})
  res.status(201).json({message:"contact created", contact, success:true});
};

// get your user
export const getYourContact = async (req, res) => {
  const id = req.user._id;
  const contact = await Contact.find({userId:id})

  if(!contact) return res.status(200).json({message:'no contact exist', success:true});

  res.status(200).json({message:"contact fetched", contact, success:true});
}

// get your contact by id
export const getYourContactById = async (req, res) => {
  const id = req.user._id;
  const contactId = req.params.contactId

  const contact = await Contact.find({userId:id, _id:contactId})

  if(!contact) return res.status(200).json({message:'no contact exist', success:true});

  res.status(200).json({message:"contact fetched", contact, success:true});
}

// update your contact
export const updateYourContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const id = req.user._id;
  const contactId = req.params.contactId

  const contact = await Contact.findOneAndUpdate({userId:id, _id:contactId}, { name, email, phone, userId:id}, {new:true});

  if(!contact) return res.status(200).json({message:'no contact exist', success:true});

  res.status(200).json({message:"contact updated", contact, success:true});
};

// update your contact
export const deleteYourContact = async (req, res) => {
  const id = req.user._id;
  const contactId = req.params.contactId

  const contact = await Contact.findOneAndDelete({userId:id, _id:contactId});

  if(!contact) return res.status(200).json({message:'no contact exist', success:true});

  res.status(200).json({message:"contact deleted", success:true});
};