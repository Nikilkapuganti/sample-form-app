import { Router } from 'express';
import cors from 'cors';

export const handleCors = (router: Router) => {
    let { CORS_DOMAIN } = process.env;
    let corsArray = CORS_DOMAIN?.split(",");
    router.use(cors({ credentials: true, origin: corsArray }));
  }