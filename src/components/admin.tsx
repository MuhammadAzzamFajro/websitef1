// src/components/admin.tsx
'use client'

import { useState } from 'react'
import { Plus, Trophy, User, Flag, Edit2, Trash2, Save, X, Users, LogOut } from 'lucide-react'

// Define types
interface Driver {
  id: number
  name: string
  team: string
  points: number
  wins: number
  podiums: number
  poles: number
}

interface Constructor {
  id: number
  name: string
  points: number
  wins: number
  podiums: number
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers')
  
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', points: 575, wins: 19, podiums: 21, poles: 9 },
    { id: 2, name: 'Sergio Perez', team: 'Red Bull Racing', points: 285, wins: 2, podiums: 8, poles: 0 },
    { id: 3, name: 'Lewis Hamilton', team: 'Mercedes', points: 234, wins: 1, podiums: 6, poles: 1 },
    { id: 4, name: 'Fernando Alonso', team: 'Aston Martin', points: 206, wins: 0, podiums: 8, poles: 0 },
  ])

  const [constructors, setConstructors] = useState<Constructor[]>([
    { id: 1, name: 'Red Bull Racing', points: 860, wins: 21, podiums: 29 },
    { id: 2, name: 'Mercedes', points: 409, wins: 3, podiums: 14 },
    { id: 3, name: 'Ferrari', points: 406, wins: 1, podiums: 13 },
    { id: 4, name: 'Aston Martin', points: 280, wins: 0, podiums: 9 },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Driver | Constructor>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDriver, setNewDriver] = useState<Omit<Driver, 'id'>>({
    name: '',
    team: '',
    points: 0,
    wins: 0,
    podiums: 0,
    poles: 0
  })
  const [newConstructor, setNewConstructor] = useState<Omit<Constructor, 'id'>>({
    name: '',
    points: 0,
    wins: 0,
    podiums: 0
  })

  const handleLogout = () => {
    // Redirect ke login page
    window.location.href = '/admin/login'
  }

  const startEdit = (item: Driver | Constructor) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveDriverEdit = () => {
    setDrivers(drivers.map(d => d.id === editingId ? editForm as Driver : d))
    setEditingId(null)
    setEditForm({})
  }

  const saveConstructorEdit = () => {
    setConstructors(constructors.map(c => c.id === editingId ? editForm as Constructor : c))
    setEditingId(null)
    setEditForm({})
  }

  const deleteDriver = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pembalap ini?')) {
      setDrivers(drivers.filter(d => d.id !== id))
    }
  }

  const deleteConstructor = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konstruktor ini?')) {
      setConstructors(constructors.filter(c => c.id !== id))
    }
  }

  const addDriver = () => {
    if (!newDriver.name || !newDriver.team) {
      window.alert('Nama dan tim harus diisi!')
      return
    }
    
    const driver: Driver = {
      id: Math.max(...drivers.map(d => d.id), 0) + 1,
      ...newDriver
    }
    
    setDrivers([...drivers, driver])
    setNewDriver({ name: '', team: '', points: 0, wins: 0, podiums: 0, poles: 0 })
    setShowAddForm(false)
  }

  const addConstructor = () => {
    if (!newConstructor.name) {
      window.alert('Nama tim harus diisi!')
      return
    }
    
    const constructor: Constructor = {
      id: Math.max(...constructors.map(c => c.id), 0) + 1,
      ...newConstructor
    }
    
    setConstructors([...constructors, constructor])
    setNewConstructor({ name: '', points: 0, wins: 0, podiums: 0 })
    setShowAddForm(false)
  }

  const updateEditForm = (field: string, value: string | number) => {
    setEditForm({ ...editForm, [field]: value })
  }

  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points)
  const sortedConstructors = [...constructors].sort((a, b) => b.points - a.points)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Flag className="w-10 h-10 text-red-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin F1</h1>
                <p className="text-gray-600">Kelola Klasemen Pembalap & Konstruktor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Tambah {activeTab === 'drivers' ? 'Pembalap' : 'Konstruktor'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-2xl mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab('drivers')
                setShowAddForm(false)
                setEditingId(null)
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'drivers'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <User className="w-5 h-5" />
              Klasemen Pembalap
            </button>
            <button
              onClick={() => {
                setActiveTab('constructors')
                setShowAddForm(false)
                setEditingId(null)
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'constructors'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              Klasemen Konstruktor
            </button>
          </div>
        </div>

        {/* Add Driver Form */}
        {showAddForm && activeTab === 'drivers' && (
          <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Pembalap Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nama Pembalap"
                value={newDriver.name}
                onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Tim"
                value={newDriver.team}
                onChange={(e) => setNewDriver({ ...newDriver, team: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Poin"
                value={newDriver.points}
                onChange={(e) => setNewDriver({ ...newDriver, points: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Kemenangan"
                value={newDriver.wins}
                onChange={(e) => setNewDriver({ ...newDriver, wins: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Podium"
                value={newDriver.podiums}
                onChange={(e) => setNewDriver({ ...newDriver, podiums: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Pole Position"
                value={newDriver.poles}
                onChange={(e) => setNewDriver({ ...newDriver, poles: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addDriver}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setNewDriver({ name: '', team: '', points: 0, wins: 0, podiums: 0, poles: 0 })
                }}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Add Constructor Form */}
        {showAddForm && activeTab === 'constructors' && (
          <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Konstruktor Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Nama Tim"
                value={newConstructor.name}
                onChange={(e) => setNewConstructor({ ...newConstructor, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Poin"
                value={newConstructor.points}
                onChange={(e) => setNewConstructor({ ...newConstructor, points: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Kemenangan"
                value={newConstructor.wins}
                onChange={(e) => setNewConstructor({ ...newConstructor, wins: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Podium"
                value={newConstructor.podiums}
                onChange={(e) => setNewConstructor({ ...newConstructor, podiums: Number(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addConstructor}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setNewConstructor({ name: '', points: 0, wins: 0, podiums: 0 })
                }}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Drivers Table */}
        {activeTab === 'drivers' && (
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Posisi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Pembalap</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Tim</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Poin</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Kemenangan</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Podium</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Pole</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedDrivers.map((driver, index) => (
                    <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === driver.id ? (
                          <input
                            type="text"
                            value={(editForm as Driver).name}
                            onChange={(e) => updateEditForm('name', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded w-full focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <div className="font-semibold text-gray-900">{driver.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === driver.id ? (
                          <input
                            type="text"
                            value={(editForm as Driver).team}
                            onChange={(e) => updateEditForm('team', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded w-full focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <div className="text-gray-600">{driver.team}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === driver.id ? (
                          <input
                            type="number"
                            value={(editForm as Driver).points}
                            onChange={(e) => updateEditForm('points', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-20 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-bold text-red-600">{driver.points}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === driver.id ? (
                          <input
                            type="number"
                            value={(editForm as Driver).wins}
                            onChange={(e) => updateEditForm('wins', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-16 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-semibold">{driver.wins}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === driver.id ? (
                          <input
                            type="number"
                            value={(editForm as Driver).podiums}
                            onChange={(e) => updateEditForm('podiums', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-16 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-semibold">{driver.podiums}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === driver.id ? (
                          <input
                            type="number"
                            value={(editForm as Driver).poles}
                            onChange={(e) => updateEditForm('poles', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-16 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-semibold">{driver.poles}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {editingId === driver.id ? (
                            <>
                              <button
                                onClick={saveDriverEdit}
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                title="Simpan"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                title="Batal"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(driver)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteDriver(driver.id)}
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Constructors Table */}
        {activeTab === 'constructors' && (
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Posisi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Tim</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Poin</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Kemenangan</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Podium</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedConstructors.map((constructor, index) => (
                    <tr key={constructor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === constructor.id ? (
                          <input
                            type="text"
                            value={(editForm as Constructor).name}
                            onChange={(e) => updateEditForm('name', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded w-full focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <div className="font-semibold text-gray-900">{constructor.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === constructor.id ? (
                          <input
                            type="number"
                            value={(editForm as Constructor).points}
                            onChange={(e) => updateEditForm('points', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-20 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-bold text-red-600">{constructor.points}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === constructor.id ? (
                          <input
                            type="number"
                            value={(editForm as Constructor).wins}
                            onChange={(e) => updateEditForm('wins', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-16 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-semibold">{constructor.wins}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === constructor.id ? (
                          <input
                            type="number"
                            value={(editForm as Constructor).podiums}
                            onChange={(e) => updateEditForm('podiums', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded w-16 mx-auto focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="font-semibold">{constructor.podiums}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {editingId === constructor.id ? (
                            <>
                              <button
                                onClick={saveConstructorEdit}
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                title="Simpan"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                title="Batal"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(constructor)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteConstructor(constructor.id)}
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}