import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
  client=new Client;
  databases;
  bucket;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
  }

  async createPost({title,slug,content,featuredImage,status,userId}){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
        title,content,featuredImage,status,userId
      });
    } catch (error) {
      console.log("AppWrite Service error :: createPost :: ", error);
    }
    return null;
  }

  async updatePost(slug,{title,content,featuredImage,status}){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      );
    } catch (error) {
      console.log("AppWrite Service error :: updatePost :: ", error);
    }
  }

  async deletePost(slug){
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
        console.log("AppWrite Service error :: deletePost :: ", error);
        return false;
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("AppWrite Service error :: getPost :: ", error);
    }
  }

  /*
  async getPosts(){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("AppWrite Service :: getPosts :: error", error);
    }
  }
  this return all posts but we need whose status is active
  so need query
  */

  async getPosts(){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("status","active")
        ]
      );
    } catch (error) {
      console.log("AppWrite Service error :: getPosts :: ", error);
    }
  }

  // file upload service

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return true;
    } catch (error) {
      console.log("AppWrite Service error :: uploadFile :: ", error);
    }
  }

  async deleteFile(fileId){
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log("AppWrite Service error :: deleteFile :: ", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    );
  }

}

const service =new Service();

export default service;