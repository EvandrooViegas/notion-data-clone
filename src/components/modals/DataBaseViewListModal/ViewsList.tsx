
import { View as IView } from "../../../types/View";
import NotFound from "../../NotFound";
import View from "./View";

interface IProps {
  views: IView[];
}
export default function ViewsList({ views }: IProps) {
  return (
    <ul className="h-full flex flex-col gap-4 my-4">
      {views.length > 0 ? views?.map(view => <View key={view?.id || Math.random()} {...view} />) : <NotFound />}
    </ul>
  );
}
