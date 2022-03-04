import "./styles/App.css"
import UploadUrlForm from "./components/forms/UploadUrlForm"
import { useState } from "react"
import { postEncodedUrl } from "./backend/apiRequests"
import { UrlInterface } from "../../models/Url"

function App() {
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [statUrl, setStatUrl] = useState<string | null>(null)

  const onSubmitForm = async (url: string) => {
    const data: UrlInterface = await postEncodedUrl(url)
    setShortUrl(data.shortUrl)
    const createStatUrl = "http://localhost:3000/" + data.shortCode + "/stats"
    setStatUrl(createStatUrl)
  }

  return (
    <div className="wrapper">
      <div className="content">
        {!shortUrl && !statUrl && <UploadUrlForm onSubmit={onSubmitForm} />}
        {shortUrl && <div>{shortUrl}</div>}
        {statUrl && <div>{statUrl}</div>}
      </div>
    </div>
  )
}

export default App
