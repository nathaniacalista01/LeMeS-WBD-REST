import express, { Express, Request, Response } from "express";
import { MaterialService } from "../service/material-service";
import { Payload } from "../utils/payload";
import { FailedResponse, SuccessResponse } from "../utils/template";
import { Error } from "../types/type";
import { validateTeacher } from "../utils/validate-teacher";
import fs from 'fs';
import path from 'path';
const multer = require('multer');

export const materialRouter = express.Router();

const STATIC_MATERIAL_FILE_PATH = 'public/file';
const PUBLIC_MATERIAL_PATH = process.env.APP_BASE_URL + '/file';

const storageFile = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, STATIC_MATERIAL_FILE_PATH);
  },
  filename: (req: any, file: any, cb: any) => {
    // const uniqueCode = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.replace(/\s/g, '');
    // const uniqueName = uniqueCode + '-' + filename;
    // req.body.material_path = PUBLIC_MATERIAL_PATH + '/' + uniqueName;
    cb(null, filename);
  }
});

const upload = multer({ storage: storageFile });

materialRouter.get("/", async (req: Request, res: Response) => {
  const material_service = new MaterialService();
  const payload = new Payload().getCookie(req);

  // Get all materials hanya dapat diakses oleh admin saja
  if (!payload.isAdmin) {
    return res.json(new FailedResponse(401, Error.UNAUTHORZIED_ACTION));
  }
  const materials = await material_service.getAllMaterials();
  if (materials === Error.FETCH_FAILED) {
    return res.json(new FailedResponse(500, Error.FETCH_FAILED));
  }
  if (!materials) {
    return res.json(new FailedResponse(404, Error.MDOULE_NOT_FOUND));
  }
  return res.json(new SuccessResponse(materials));
});

materialRouter.post("/upload", upload.single('file'), async (req: Request, res: Response) => {
  // console.log(req);
  // console.log(res);
});

materialRouter.delete('/deleteFile/:filename', async (req: Request, res: Response) => {
  const filename = req.params.filename;

  // Construct the full path to the file
  const filePath = path.join(STATIC_MATERIAL_FILE_PATH, filename);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'File deleted successfully' });
    } else {
      // File not found
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

materialRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, source_type, material_path, modul_id } = req.body;
  console.log(req.body);
  const material_service = new MaterialService();

  // Cocokin teacher_id yang punya material sama yang sekarang sedang login
  const teacher_id = await material_service.getTeacherByModulId(modul_id);
  const payload = new Payload().getCookie(req);
  const notValid = validateTeacher(payload, teacher_id);

  if (notValid) {
    return res.json(notValid);
  }
  const response = await material_service.addMaterial(
    title,
    description,
    source_type,
    material_path,
    modul_id
  );
  if (response === Error.ADD_MATERIAL_FAILED) {
    return res.json(new FailedResponse(500, Error.ADD_MATERIAL_FAILED));
  }
  return res.json(new SuccessResponse(response));
});

materialRouter.put("/:material_id", async (req: Request, res: Response) => {
  const { material_id } = req.params;
  const { title, description, source_type, material_path } = req.body;
  const material_service = new MaterialService();
  // Cocokin teacher_id yang punya material sama yang sekarang sedang login
  const teacher_id = await material_service.getTeacherByMaterialId(
    parseInt(material_id)
  );
  const payload = new Payload().getCookie(req);
  const notValid = validateTeacher(payload, teacher_id);

  if (notValid) {
    return res.json(notValid);
  }
  const response = await material_service.editMaterial(
    parseInt(material_id),
    title,
    description,
    source_type,
    material_path
  );
  if (response === Error.EDIT_FAILED) {
    return res.json(new FailedResponse(500, Error.EDIT_FAILED));
  }
  return res.json(new SuccessResponse(response));
});

materialRouter.delete("/:material_id", async (req: Request, res: Response) => {
  const { material_id } = req.params;
  const material_service = new MaterialService();
  const teacher_id = await material_service.getTeacherByMaterialId(
    parseInt(material_id)
  );
  const payload = new Payload().getCookie(req);
  const notValid = validateTeacher(payload, teacher_id);

  if (notValid) {
    return res.json(notValid);
  }
  const response = await material_service.deleteMaterial(parseInt(material_id));
  if (response === Error.DELETE_FAILED) {
    return res.json(new FailedResponse(500, Error.DELETE_FAILED));
  }
  return res.json(new SuccessResponse(response));
});

materialRouter.get("/:material_id", async (req: Request, res: Response) => {
  const { material_id } = req.params;
  const material_service = new MaterialService();
  const teacher_id = await material_service.getTeacherByMaterialId(
    parseInt(material_id)
  );
  const payload = new Payload().getCookie(req);
  const notValid = validateTeacher(payload, teacher_id);

  if (notValid) {
    return res.json(notValid);
  }
  const response = await material_service.getMaterial(parseInt(material_id));
  if (response === Error.FETCH_FAILED) {
    return res.json(new FailedResponse(500, Error.FETCH_FAILED));
  }
  if (!response) {
    return res.json(new FailedResponse(404, Error.MATERIAL_NOT_FOUND));
  }
  return res.json(new SuccessResponse(response));
});
materialRouter.get("/module/:module_id", async (req: Request, res: Response) => {
  const { module_id } = req.params;
  const module_service = new MaterialService();
  try {
    const materials = await module_service.getMaterialsModule(parseInt(module_id));
    if (materials) {
      return res.json({
        status: 200,
        data: materials,
      });
    } else {
      return res.json({
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: error,
    });
  }
});