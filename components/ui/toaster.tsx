"use client"

import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50 max-w-md w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg shadow-lg p-4 flex items-start justify-between ${
            toast.variant === "destructive"
              ? "bg-red-500 text-white"
              : toast.variant === "success"
                ? "bg-green-500 text-white"
                : "bg-[#007AFF] text-white"
          } animate-in slide-in-from-right duration-300`}
        >
          <div>
            <h3 className="font-medium">{toast.title}</h3>
            {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
          </div>
          <button onClick={() => dismiss(toast.id)} className="ml-4 mt-1">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
