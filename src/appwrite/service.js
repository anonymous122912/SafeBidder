import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createBid({
    product_name,
    product_image,
    seller_id,
    seller_name,
    location,
    start_time,
    end_time,
    description,
    category,
    initial_bit,
    current_bit=initial_bit,
  }) {
    try {
      return await this.databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          product_name,
          seller_id,
          seller_name,
          product_image,
          location,
          start_time,
          end_time,
          description,
          category,
          initial_bit,
          current_bit,
          active: true
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createBid :: error", error);
    }
  }

  async updateBid({ bit_id, description, current_bit_amount }) {
    try {
      return await this.databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        bit_id,
        {
          description,
          current_bit_amount,
        }
      );
    } catch (err) {
      console.log("Appwrite serive :: updateBid :: error", err);
    }
  }

  async deleteBid(bit_id) {
    try {
      await this.databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        bit_id
      );
      return true;
    } catch (err) {
      console.log("Appwrite serive :: deleteBit :: error", err);
      return false;
    }
  }

  async getBit(bit_id) {
    try {
      return await this.databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        bit_id
      );
    } catch (error) {
      console.log("Appwrite serive :: getBit :: error", error);
    }
  }

  async getActiveBits() {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal("active", true)]
      );
    } catch (error) {
      console.log("Appwrite serive :: getActiveBits :: error", error);
      return false;
    }
  }

  async getUserBits(user_id) {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal("seller_id", user_id)]
      );
    } catch (error) {
      console.log("Appwrite serive :: getUserBits :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      fileId
    );
  }
}

const service = new Service();
export default service;
