import {useParams} from "react-router-dom";
import {useState} from "react";

export default function TaskPage() {
  const [data] = useState(Array.from({ length: 5 }).map((_, i) => i));
  const params = useParams();
  const taskId = Number(params.id);
  console.log("taskId", taskId);
  const item = data.findIndex((id) => taskId === +id)
  if (item !== -1) {
    return (
      <div>{taskId}</div>
    )
  }

  return <></>
}