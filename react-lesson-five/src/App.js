import axios from 'axios';
import './App.css';
import { useEffect, useState,} from 'react';

function App() {
  const [loading,setLoading] = useState(false)
  const [movie,setMovie] = useState({})
  const [value,setValue] = useState('')

  const fetch = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
      setMovie(response.data);
    } catch (error) {
      alert('we could not receive data : ' + error.message);
    } finally {
      setLoading(false)
    }
  }


  const ClickValue = () => {
    if (value.length < 3) {
      fetch();
    }
  }
  useEffect(() => {
    if (value.length >= 3) {
      fetch();
    }
  }, [value]);


  return (
    <div>
      <input placeholder='type id' onChange={(e) => setValue(e.target.value)} />
      <button onClick={ClickValue}>get data</button>

      <h1>User Id: {loading ? 'its loading' : movie?.id}</h1>
      <h1>title: {loading ? 'its loading' : movie?.title}</h1>
      <h1>completed: {loading ? 'its loading' : movie?.completed}</h1>
      
    </div>
  );
}

export default App;
