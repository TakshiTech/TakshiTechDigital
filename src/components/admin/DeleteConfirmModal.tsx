'use client'

type DeleteConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  title?: string
  message?: string
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
  message
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800">{title || 'Confirm Delete'}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {message || 'Are you sure you want to delete this blog? This action cannot be undone.'}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
