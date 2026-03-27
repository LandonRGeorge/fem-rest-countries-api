import { useNavigate } from 'react-router-dom'

export function BackButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    void navigate(-1)
  }

  return (
    <button
      onClick={handleClick}
      className="px-6 py-2 bg-white dark:bg-[hsl(209,23%,22%)] dark:text-white rounded shadow hover:shadow-lg flex items-center gap-2 transition-shadow"
    >
      <span>←</span> Back
    </button>
  )
}
