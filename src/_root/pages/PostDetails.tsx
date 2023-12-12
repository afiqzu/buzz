import {
  useDeletePost,
  useGetPostById,
} from '@/lib/react-query/queriesAndMutations.ts'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '@/components/shared/Loader.tsx'
import { timeAgo } from '@/lib/utils.ts'
import { useUserContext } from '@/context/AuthContext.tsx'
import { Button } from '@/components/ui/button.tsx'
import PostStats from '@/components/shared/PostStats.tsx'

const PostDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext()
  const { mutate: deletePost } = useDeletePost()

  const handleDeletePost = () => {
    // @ts-ignore
    deletePost({ postId: id, imageId: post?.imageId })
    navigate(-1)
  }

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full mt-3 py-2 px-4">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    '/assets/icons/profile-placeholder'
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-dark-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-dark-4">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {' '}
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    height={24}
                    width={24}
                    alt="edit"
                    className="mr-1"
                  />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  size="icon"
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full h-0.5" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular p-5 mb-2">
              <div className="w-full mb-5">
                <PostStats post={post} userId={user.id} />
              </div>
              <p className="text-[22px] pb-1"> {post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-dark-5">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default PostDetails
