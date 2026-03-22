import { Router } from 'express';
import { AddressController } from './address.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const addressRoute = Router();

const addressController = new AddressController();

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Create address
 *     description: Create a new address for a user. Only users with PATIENT or DOCTOR roles can create an address.
 *     tags:
 *       - Addresses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Address details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_line_1:
 *                 type: string
 *                 description: Primary address line
 *                 example: 123 Main Street
 *               address_line_2:
 *                 type: string
 *                 description: Secondary address line
 *                 example: Apartment 4B
 *               city:
 *                 type: string
 *                 description: City name
 *                 example: Ahmedabad
 *               state:
 *                 type: string
 *                 description: State name
 *                 example: Gujarat
 *               country:
 *                 type: string
 *                 description: Country name
 *                 example: India
 *               pincode:
 *                 type: string
 *                 description: Postal or ZIP code
 *                 example: "380001"
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT or DOCTOR can create an address
 */

addressRoute.post(
  '/',
  authMiddleware,
  requireRole(['PATIENT', 'DOCTOR']),
  asyncHandler(addressController.createAddres),
);

/**
 * @swagger
 * /api/address/{addressId}:
 *   patch:
 *     summary: Update address
 *     description: Update an existing address by address ID. Only users with PATIENT or DOCTOR roles can update their address.
 *     tags:
 *       - Addresses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: Address ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       description: Updated address details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_line_1:
 *                 type: string
 *                 description: Primary address line
 *                 example: 123 Main Street
 *               address_line_2:
 *                 type: string
 *                 description: Secondary address line
 *                 example: Apartment 4B
 *               city:
 *                 type: string
 *                 description: City name
 *                 example: Ahmedabad
 *               state:
 *                 type: string
 *                 description: State name
 *                 example: Gujarat
 *               country:
 *                 type: string
 *                 description: Country name
 *                 example: India
 *               pincode:
 *                 type: string
 *                 description: Postal or ZIP code
 *                 example: "380001"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT or DOCTOR can update an address
 *       404:
 *         description: Address not found
 */

addressRoute.patch(
  '/:addressId',
  authMiddleware,
  requireRole(['PATIENT', 'DOCTOR']),
  addressController.updateAddress,
);

export default addressRoute;
