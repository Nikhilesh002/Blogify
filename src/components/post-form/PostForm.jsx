import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../appwrite/config';
import { Button, Input, RTE, Select } from '../index';

function PostForm({post}) {
  
  const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
    defaultValues:{
      title:post?.title || '',
      slug:post?.$id || '',
      content:post?.content || '',
      status:post?.status || 'active'
    }
  });

  const navigate=useNavigate();
  const userData=useSelector(state=>state.auth.userData);
  console.log(userData);

async function submit(data) {
  try {
    let dbPost = null;
    const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
    if (post) {
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      dbPost = await appwriteService.updatePost(post?.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      });
    } else {
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id
        });
      }
    }
    if (dbPost) {
      navigate(`/post/${dbPost.$id}`);
    } else {
      console.log("No dbPost");
    }
  } catch (error) {
    console.error("Error occurred while submitting:", error);
  }
}

  const slugTransform=useCallback((value)=>{
    if(value && typeof value==='string'){
      //const slug=value.toLowerCase().
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return '';
  },[]);

  React.useEffect(()=>{
    const subscription=watch((value,{name})=>{
      if(name==='title'){
        setValue('slug',slugTransform(value.title),{shouldValidate:true});
      }
    });
    return ()=> subscription.unsubscribe();
  },[watch,slugTransform,setValue]);

  return (
    <div className="bg-gray-300 m-0 pt-2 pb-5">
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
            readOnly
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title} className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
    
  );
}

export default PostForm;