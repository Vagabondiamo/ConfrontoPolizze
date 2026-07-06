import { Toaster as Sonner } from "sonner"

const Toaster = () => {
  return (
    <Sonner
      className="sonner-toast"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "sonner-toast",
          description: "sonner-description",
          actionButton: "sonner-action-button",
          cancelButton: "sonner-cancel-button",
          icon: "sonner-icon",
        },
      }}
    />
  )
}

export { Toaster }