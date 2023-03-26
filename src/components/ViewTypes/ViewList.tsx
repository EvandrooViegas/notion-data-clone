
import useViews from "../../hooks/useViews"
import ViewCard from "./ViewCard"


export default function ViewList() {
  const views = useViews(s => s.views)
  return (
    <div className='flex flex-col gap-4'>
        {views.map(view => (
            <ViewCard key={view.id} view={view} />
        ))}
    </div>
  )
}
