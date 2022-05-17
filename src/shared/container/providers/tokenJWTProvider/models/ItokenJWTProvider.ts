interface ITokenJWTProvider {
	signJWT(payload: object): Promise<string>;
}

export default ITokenJWTProvider;
