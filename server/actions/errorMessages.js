const noBodyDataError = {
    status : "failed",
    reason : "empty body",
    message : "body data cannot be empty"
}

const unknownError = {
    status : "failed",
    reason : "server error",
    message: "an error ocurred on the server"
}

const userNotFoundInDataBase = {
    status : "failed",
    reason : "user not found",
    message : "user not found in database, check your email and try again"
}

const wrongPassword = {
    status : "failed",
    reason : "wrong password",
    message : "the password you entered is incorrect, enter the correct one and try again"
}

const logoutError = {
    status : "failed",
    reason : "unknown",
    message : "an error ocurred when trying to log the user out"
}

const duplicateUsername = {
    status : "failed",
    reason : "duplicate username",
    message : "the username you entered is already taken, please try a different one"
}

const duplicateEmail = {
    status : "failed",
    reason : "duplicate email",
    message : "the email address you entered has already been used, please try a different one"
}

const noJwtToken = {
    status : "failed",
    reason : "missing token",
    message : "unauthorized - Missing JWT in cookies"
}

const jwtTokenError = {
    status : "failed",
    reason : "token error",
    message : "an error ocurred while trying to validate the jwt token"
}

const imageUploadError = {
    status : "failed",
    reason : "image upload",
    message : "an error ocurred while trying to upload your image, please try a different one"
}

const notAuthorizedToEdit = {
    status : "failed",
    reason : "recipe edit",
    message : "you're not authorized to edit this recipe because you didn't create it lol"
}

const notAuthorizedToDelete = {
    status : "failed",
    reason : "recipe delete",
    message : "you're not authorized to delete this recipe because you didn't create it lol"
}

module.exports = {noBodyDataError, unknownError, userNotFoundInDataBase, wrongPassword, logoutError, duplicateUsername, duplicateEmail, noJwtToken, jwtTokenError, imageUploadError, notAuthorizedToEdit, notAuthorizedToDelete}