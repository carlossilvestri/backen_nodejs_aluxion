import { NextFunction, Request, Response, Router } from "express";
import dotenv from "dotenv"
// Swagger
import * as swaggerUI from "swagger-ui-express";
import swaggerDocument from "./jsons/aluxion-Swagger20.json";
dotenv.config()
let swaggerDocumentCopy : any = swaggerDocument

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RidesV2ElasticSearch",
      version: "1.0.0",
      description: "RidesV2ElasticSearch - All in Binking",
      contact: {
        name: "All in Binking - RidesV2ElasticSearch API",
      },
    },
  },
  swaggerOptions: {
    url: "/swagger/swagger.json",
  },
  apis: [""],
};

/**
 * Swagger Documentation 
 */

 const router = Router();

 /* SWAGGER */
 /**
  * This end point is used to access the swagger json and change hostname to be dynamic.
  */
 router.use(
   "/swagger.json",
   (req: Request, res: Response, next: NextFunction) => {
     swaggerDocumentCopy = swaggerDocument

     // Change scheme http or https relying on the environment.
     let completeUrl = req.hostname

     if( process.env.NODE_ENV === "LOCAL" ){
      swaggerDocument.schemes = ["http"]
      completeUrl = `${req.hostname}:${process.env.PORT}`
    }else{
      swaggerDocument.schemes = ["https"]
      completeUrl = `${req.hostname}`
    }
     // @ts-ignore
     swaggerDocumentCopy.host = completeUrl;
     res.json(swaggerDocumentCopy);
   }
 );
 router.use(
   "/",
   //@ts-ignore
   swaggerUI.serveFiles(null, swaggerOptions),
   swaggerUI.setup(swaggerDocumentCopy, swaggerOptions)
 );
 export default router;