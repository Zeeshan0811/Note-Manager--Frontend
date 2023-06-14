import Head from 'next/head'
import NoteList from '/components/NoteList'

export default function Home({ notes }) {
  return (
    <div className="pt-3 pb-3">
      <NoteList notes={notes} />
    </div>
  )
}



export const getStaticProps = async () => {
  const api_url = process.env.API_URL + 'notes';
  const res = await fetch(api_url);
  const notes = await res.json();

  return {
    props: {
      notes
    }
  }
}
