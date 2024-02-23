import React from 'react'

const ShowTask = () => {
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
  return (
    <div>ShowTask</div>
  )
}

export default ShowTask