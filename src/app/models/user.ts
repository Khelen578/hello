export class User {
	login: string;
	id: number;
	password: string;
	constructor(login: string = null, password: string = null) {
		this.login = login;
		this.password = password;
	}
}
