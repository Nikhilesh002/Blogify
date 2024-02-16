import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {Button} from '../components/index';

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && (userData ? post.userId === userData.$id : false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-gray-300 ">
      <Container>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title} className="rounded-xl max-w-3xl max-h-96 shadow-md border-black border-2"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl text-center font-bold">{post.title}</h1>
        </div>
        <blockquote className="browser-css px-20 py-5 font-sans leading-6 ">
          {parse(post.content)}
        </blockquote>
      </Container>
    </div>
  ) : null;
}