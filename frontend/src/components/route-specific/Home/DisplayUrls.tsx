import toast from "react-hot-toast"
import { UrlInterface } from "../../../../../models/Url"


interface DisplayUrlsProps {
    data: UrlInterface
    statUrl: string
}

export const DisplayUrls: React.FC<DisplayUrlsProps> = ({ data, statUrl }) => {

    const copyToClipboard = (fieldId: string) => {
        const element = document.getElementById(fieldId)
        if (element instanceof HTMLInputElement) {
        //   element.select()
        //   document.execCommand("copy")
            navigator.clipboard.writeText(element.value)
            toast.success('Copied!')
        }
      }

    return (
        <div className="text-align-left">
            <p>
                Generated short URL <a href={data.shortUrl} target="_blank" rel="noreferrer">{data.shortUrl}</a>
            </p>
            <div>
                <h3>Short URL:</h3>
                <input className="short-url-copy-field" id="urlField" value={data.shortUrl} readOnly />
                <button onClick={() => copyToClipboard("urlField")}>Copy</button>
            </div>
            <div>
                <h3>Stat URL:</h3>
                <input className="short-url-copy-field" id="statField" value={statUrl} readOnly />
                <button onClick={() => copyToClipboard("statField")}>Copy</button>
            </div>
        </div>
    )
}
