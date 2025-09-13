import express from 'express';
import { createContact, deleteYourContact, getYourContact, getYourContactById, updateYourContact } from '../Controllers/contact.js';
import { authenticate } from '../Middleware/Authentication.js';

const route = express.Router();

// @api dsc: create contact [Auth. req.]
// @api method: POST
// @api endpoint: /api/contact/new
route.post('/new', authenticate, createContact)

// @api dsc: get your contact [Auth. req.]
// @api method: GET
// @api endpoint: /api/contact/
route.get('/', authenticate, getYourContact)

// @api dsc: get your contact by id [Auth. req.]
// @api method: GET
// @api endpoint: /api/contact/:contactId
route.get('/:contactId', authenticate, getYourContactById)

// @api dsc: update your contact [Auth. req.]
// @api method: PUT
// @api endpoint: /api/contact/update/:contactId
route.put('/update/:contactId', authenticate, updateYourContact);

// @api dsc: delete your contact [Auth. req.]
// @api method: DELETE
// @api endpoint: /api/contact/delete/:contactId
route.delete('/delete/:contactId', authenticate, deleteYourContact);

export default route;