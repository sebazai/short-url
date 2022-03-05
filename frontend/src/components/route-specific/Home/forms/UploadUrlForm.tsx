import React from "react"
import { useForm } from "react-hook-form"
import { urlRegexp } from "../../../../utils/urlValidator"

interface UploadUrlFormProps {
  onSubmit: (url: string) => Promise<void>
}

type FormData = {
  urlToShort: string
}

const UploadUrlForm: React.FC<UploadUrlFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.urlToShort)
  }

  return (
    <div>
      <h1>Insert URL</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="url-upload-form">
        <label htmlFor="urlToShort">URL</label>
        <input
          {...register("urlToShort", {
            pattern: {
              value: urlRegexp,
              message: "Not a valid URL",
            },
          })}
          type="text"
          id="urlToShort"
          name="urlToShort"
          placeholder={"http://example.com"}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {errors.urlToShort?.message && (
        <div className="error-notification">{errors.urlToShort.message}</div>
      )}
    </div>
  )
}

export default UploadUrlForm
