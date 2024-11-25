import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite endpoint
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      alert("Sign Up Successful!");

      if (userAccount) {
        return this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      console.error("Appwrite service :: createAccount :: error", error);
      alert("Error while creating the account");
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Appwrite service :: login :: success", session);
      return session;
    } catch (error) {
      console.error("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error", error);
      return null; // Return null to indicate no user
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      alert("Logout Successful");
    } catch (error) {
      console.error("Appwrite service :: logout :: error", error);
      alert("Error while logging out");
    }
  }
}

const authService = new AuthService();
export default authService;
