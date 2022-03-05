import React from "react"
import { useForm } from "react-hook-form"
import { urlRegexp } from "../../../../utils/urlValidator"

interface UploadUrlFormProps {
  onSubmit: (url: string) => Promise<void>
}

type FormData = {
  url: string
}

const UploadUrlForm: React.FC<UploadUrlFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.url)
  }

  return (
    <div>
      <h1>Insert URL</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="url-upload-form">
        <label htmlFor="url">URL</label>
        <input
          {...register("url", {
            pattern: {
              value: urlRegexp,
              message: "Not a valid URL",
            },
          })}
          type="text"
          id="url"
          name="url"
          placeholder={"http://example.com"}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {errors.url?.message && <div className="error-notification">{errors.url.message}</div>}
    </div>
  )
}

export default UploadUrlForm
