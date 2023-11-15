import express, { Express, Request, Response } from "express";
import { MaterialService } from "../service/material-service";
import { Payload } from "../utils/payload";
import { FailedResponse, SuccessResponse } from "../utils/template";
import { Error } from "../types/type";
import { validateTeacher } from "../utils/validate-teacher";

export const materialRouter = express.Router();

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

materialRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, source_type, material_path, modul_id } = req.body;
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
