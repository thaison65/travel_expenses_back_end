export function validatePassword(password: string) {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{10,125}$/;
	return regex.test(password);
}
