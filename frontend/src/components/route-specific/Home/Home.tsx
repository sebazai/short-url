import UploadUrlForm from "./forms/UploadUrlForm"
import { useState } from "react"
import { postUrl } from "../../../backend/apiRequests"
import { UrlInterface } from "../../../../../models/Url"
import { DisplayUrls } from "./DisplayUrls"
import c from "config"

const Home: React.FC = () => {
  const [urlData, setUrlData] = useState<UrlInterface | null>(null)
  const [statUrl, setStatUrl] = useState<string | null>(null)

  const onSubmitForm = async (url: string) => {
    const data: UrlInterface = await postUrl(url)
    setUrlData(data)
    const createStatUrl = window.location.origin + "/" + data.shortCode + "/stats"
    setStatUrl(createStatUrl)
  }

  return (
    <div className="wrapper">
      <div className="content">
        {!urlData && !statUrl && <UploadUrlForm onSubmit={onSubmitForm} />}
        {urlData && statUrl && <DisplayUrls data={urlData} statUrl={statUrl} />}
      </div>
    </div>
  )
}

export { Home }
