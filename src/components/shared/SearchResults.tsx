import Loader from '@/components/shared/Loader.tsx'
import GridPostList from '@/components/shared/GridPostList.tsx'

type SearchResultsProps = {
  isSearchFetching: boolean
  searchedPosts: any
}
const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />
  }
  return (
    <p className="text-dark-4 mt-10 text-center w-full">No results found. </p>
  )
}
export default SearchResults
