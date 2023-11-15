import express, { Express, Request, Response } from "express";
import { MaterialService } from "../service/material-service";
const multer = require('multer');

export const materialRouter = express.Router();

const STATIC_MATERIAL_FILE_PATH = 'public/file';
const PUBLIC_MATERIAL_PATH = process.env.APP_BASE_URL + '/file';

const storageFile = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, STATIC_MATERIAL_FILE_PATH);
  },
  filename: (req: any, file: any, cb: any) => {
    req.body.material_path = PUBLIC_MATERIAL_PATH + '/' + file.originalname;
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storageFile });

materialRouter.get("/", async (req: Request, res: Response) => {
  const material_service = new MaterialService();
  try {
    const materials = await material_service.getAllMaterials();
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
      mesasge: error,
    });
  }
});

materialRouter.post("/upload", upload.single('file'), async (req: Request, res: Response) => {
  // console.log(req);
  // console.log(res);
});

materialRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, source_type, material_path, modul_id } = req.body;
  console.log(req.body);
  const material_service = new MaterialService();
  try {
    const response = await material_service.addMaterial(
      title,
      description,
      source_type,
      material_path,
      modul_id
    );
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});
materialRouter.put("/:material_id", async (req: Request, res: Response) => {
  const { material_id } = req.params;
  const { title, description, source_type, material_path } = req.body;
  const material_service = new MaterialService();
  try {
    const response = await material_service.editMaterial(
      parseInt(material_id),
      title,
      description,
      source_type,
      material_path,
    );
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});
materialRouter.delete("/:material_id", async (req: Request, res: Response) => {
  const { material_id } = req.params;
  const material_service = new MaterialService();
  try {
    const response = await material_service.deleteMaterial(parseInt(material_id));
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});

materialRouter.get("/:material_id", async (req: Request, res: Response) => {
  const { material_id } = req.params;
  const material_service = new MaterialService();
  try {
    const response = await material_service.getMaterial(parseInt(material_id));
    if (!response) {
      res.json({
        status: 400,
        message: "Data not found",
      });
    } else {
      res.json({
        status: 200,
        data: response,
      });
    }
  } catch (error: any) {
    return res.json({
      status: 400,
      message: error.message,
    });
  }
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