import { Models } from 'appwrite'
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesAndMutations.ts'
import React, { useEffect, useState } from 'react'
import { checkIsLiked } from '@/lib/utils.ts'
import Loader from '@/components/shared/Loader.tsx'

type PostStatsProps = {
  post?: Models.Document
  userId: string
  isExplore?: boolean
}
const PostStats = ({ post, userId, isExplore = false }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavedPost, isPending: isDeletingSave } =
    useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.posts.$id === post?.$id
  )

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    let newLikes = [...likes]

    const hasLiked = newLikes.includes(userId)
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId)
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost({ postId: post?.$id || '', likesArray: newLikes })
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (savedPostRecord) {
      setIsSaved(false)
      deleteSavedPost(savedPostRecord.$id)
    } else {
      savePost({ postId: post?.$id || '', userId })
      setIsSaved(true)
    }
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5 items-center">
        <img
          src={
            checkIsLiked(likes, userId)
              ? '/assets/icons/liked.svg'
              : '/assets/icons/like.svg'
          }
          alt="like"
          width={isExplore ? 20 : 32}
          height={isExplore ? 20 : 32}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p
          className={`small-medium lg:base-medium ${
            isExplore && 'text-light-2'
          }`}
        >
          {likes.length}
        </p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSave ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt="like"
            width={isExplore ? 20 : 32}
            height={isExplore ? 20 : 32}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}
export default PostStats
