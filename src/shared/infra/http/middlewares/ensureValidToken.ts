import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayLoad {
	iat: number,
	exp: number,
	sub: string,
}

function ensureValidToken(request: Request, response: Response, next: NextFunction): void{
	const token = request.headers.authorization?.replace('Bearer ', '');

	if(!token){
		throw new AppError('O token JWT está ausente.', 401);
	}

	try{
		const keySecret = authConfig.jwt.secret;
		const decode = verify(token, keySecret);
		const { sub } = decode as TokenPayLoad;

		request.tokenSub = {
			id: sub,
		}

		return next();
	}
	catch{
		throw new AppError('Token inválido', 401);
	}
}

export default ensureValidToken;
