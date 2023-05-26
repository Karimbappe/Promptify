"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const { data : session } = useSession();
  const pathname = usePathname();
  const router = useRouter();


  const [ copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 2000);
  }
  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div 
        className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        onClick={handleProfileClick}>
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-7 00">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={
              copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p 
      className="font-inter cursor-pointer text-sm green_gradient"
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      // it's going to ensure that we do have the tag and if we do we will be able to click it and see all of the other posts with that tag.
      > 
        #{post.tag}
      </p>

      {session?.user._id === post.creator.id && pathname === '/profile' && (
        <div className="flex-center mt-5 border-t gap-8 pt-3 border-gray-200">
          <p 
          className="font-inter text-sm green_gradient cursor-pointer" 
          onClick={handleEdit}
          >
            Edit
          </p>
          <p 
          className="font-inter text-sm orange_gradient cursor-pointer" 
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
