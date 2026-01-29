import { useState, useEffect } from 'react'
import { adminApi } from '../../api/authApi'
import DataTable from './DataTable'
import ConfirmDialog from './ConfirmDialog'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: '',
    userId: null,
    userName: '',
  })
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { users: userData } = await adminApi.users.getAll()
      setUsers(userData || [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (user) => {
    setConfirmDialog({
      isOpen: true,
      type: 'delete',
      userId: user.id,
      userName: user.name,
    })
  }

  const handlePromoteClick = (user) => {
    setConfirmDialog({
      isOpen: true,
      type: 'promote',
      userId: user.id,
      userName: user.name,
    })
  }

  const handleDemoteClick = (user) => {
    setConfirmDialog({
      isOpen: true,
      type: 'demote',
      userId: user.id,
      userName: user.name,
    })
  }

  const handleConfirm = async () => {
    setProcessingId(confirmDialog.userId)
    try {
      if (confirmDialog.type === 'delete') {
        await adminApi.users.delete(confirmDialog.userId)
        setUsers(users.filter((u) => u.id !== confirmDialog.userId))
      } else if (confirmDialog.type === 'promote') {
        await adminApi.users.updateRole(confirmDialog.userId, true)
        setUsers(users.map((u) =>
          u.id === confirmDialog.userId ? { ...u, isAdmin: true } : u
        ))
      } else if (confirmDialog.type === 'demote') {
        await adminApi.users.updateRole(confirmDialog.userId, false)
        setUsers(users.map((u) =>
          u.id === confirmDialog.userId ? { ...u, isAdmin: false } : u
        ))
      }
      setConfirmDialog({ isOpen: false })
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed')
    } finally {
      setProcessingId(null)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'isAdmin',
      label: 'Role',
      render: (isAdmin) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isAdmin
            ? 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isAdmin ? 'Admin' : 'User'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ]

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          onAction={(user) => (
            <div className="flex gap-2">
              {!user.isAdmin ? (
                <button
                  onClick={() => handlePromoteClick(user)}
                  disabled={processingId === user.id}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  Promote
                </button>
              ) : (
                <button
                  onClick={() => handleDemoteClick(user)}
                  disabled={processingId === user.id}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  Demote
                </button>
              )}
              <button
                onClick={() => handleDeleteClick(user)}
                disabled={processingId === user.id}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          )}
        />
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.type === 'delete'
            ? 'Delete User'
            : confirmDialog.type === 'promote'
            ? 'Promote to Admin'
            : 'Remove Admin Status'
        }
        message={
          confirmDialog.type === 'delete'
            ? `Are you sure you want to delete ${confirmDialog.userName}? This action cannot be undone.`
            : confirmDialog.type === 'promote'
            ? `Make ${confirmDialog.userName} an admin?`
            : `Remove admin status from ${confirmDialog.userName}?`
        }
        confirmText={confirmDialog.type === 'delete' ? 'Delete' : 'Confirm'}
        isDanger={confirmDialog.type === 'delete'}
        isLoading={processingId === confirmDialog.userId}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />
    </div>
  )
}

export default UserManagement
