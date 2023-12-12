import { Models } from 'appwrite'

import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations.ts'
import Loader from '@/components/shared/Loader.tsx'
import GridPostList from '@/components/shared/GridPostList.tsx'

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.posts,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse()

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img src="/assets/icons/save.svg" width={36} height={36} alt="edit" />
        <h2 className="h3-bold md:h2-bold ml-1 text-left w-full">
          Saved Posts
        </h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  )
}

export default Saved
