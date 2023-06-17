import { useEffect, useState, createContext } from 'react';
import NoteList from '../components/NoteList'
import AddNote from '../components/AddNote'

export const AppContext = createContext();


export default function Home() {
  const [notes, setNotes] = useState(null);
  const [searhkey, setSearhkey] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState('add_new');

  const handleSearchKey = (e) => {
    setSearhkey(e.target.value);
    setRefresh(!refresh);
  }

  useEffect(() => {
    setLoading(true);
    let api_get_url = process.env.API_URL + ((searhkey) ? `notes/search/${searhkey}` : 'notes');
    fetch(api_get_url)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data)
        setLoading(false);
      })
  }, [refresh])

  // if (isLoading) return <p>Loading...</p>
  // if (!notes) return <p>Opps! No data Found...</p>

  return (
    <AppContext.Provider value={{ refresh, setRefresh }} >
      <div className="row mt-3 justify-content-center">
        <div className="col-md-4">
          {
            (currentOption == 'update') ? <UpdateNote /> : <AddNote />
          }
        </div>
        <div className="col-md-8">
          <h2 className='text-center mb-3'>Note List</h2>
          <input type="text" name="searchkey" onChange={e => handleSearchKey(e)} value={searhkey} className="form-control" id="note_title" placeholder="Type to search" />
          {
            (isLoading) ? (<p>Loading...</p>) : (!notes) ? (<p>Opps! No Data Found...</p>) :
              (
                <>
                  <NoteList notes={notes} />
                </>
              )
          }
        </div>
      </div>
    </AppContext.Provider>
  )
}
