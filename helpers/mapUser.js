module.exports = function (userDb) {
	return {
		id: userDb._id,
		login: userDb.login,
		imgUserUrl: userDb.img_user_url,
		email: userDb.email,
		role: userDb.role,
		createdAt: userDb.created_at,
		updatedAt: userDb.updated_at,
	}
}
