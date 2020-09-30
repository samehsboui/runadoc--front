export class PasswordUpdateRequest {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;

    constructor(oldPassword: string, newPassword: string, confirmNewPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }
}
