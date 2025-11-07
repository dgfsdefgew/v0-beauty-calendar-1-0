"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Plus, Pencil, Trash2, Search, Calendar, Mail, Phone, Clock } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  lastVisit: string
  totalVisits: number
  totalSpent: number
  notes: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "(555) 111-2222",
    lastVisit: "2024-12-15",
    totalVisits: 12,
    totalSpent: 820,
    notes: "Prefers Sarah for haircuts",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(555) 222-3333",
    lastVisit: "2024-12-10",
    totalVisits: 8,
    totalSpent: 640,
    notes: "Allergic to certain hair products",
  },
  {
    id: "3",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "(555) 333-4444",
    lastVisit: "2024-12-18",
    totalVisits: 15,
    totalSpent: 980,
    notes: "Monthly nail appointments",
  },
  {
    id: "4",
    name: "David Martinez",
    email: "david@example.com",
    phone: "(555) 444-5555",
    lastVisit: "2024-12-12",
    totalVisits: 6,
    totalSpent: 420,
    notes: "",
  },
  {
    id: "5",
    name: "Sophie Taylor",
    email: "sophie@example.com",
    phone: "(555) 555-6666",
    lastVisit: "2024-12-20",
    totalVisits: 20,
    totalSpent: 1450,
    notes: "VIP client, prefers morning appointments",
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this client?")) {
      setClients(clients.filter((c) => c.id !== id))
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingClient(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/30 cursor-pointer hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Clients</h1>
              <p className="text-xs text-muted-foreground">Manage your client database</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
              </DialogHeader>
              <ClientForm client={editingClient} onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search & Stats */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Total Clients: <span className="font-semibold text-foreground">{clients.length}</span>
          </div>
        </div>

        {/* Clients List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{client.name}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Last visit: {new Date(client.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{client.totalVisits} visits</span>
                    </div>
                  </div>

                  {client.notes && <p className="mt-2 text-sm text-muted-foreground italic">Note: {client.notes}</p>}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                    <div className="text-2xl font-bold text-primary">${client.totalSpent}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(client)}
                      className="hover:bg-primary/10"
                    >
                      <Pencil className="w-3 h-3 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(client.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

function ClientForm({ client, onClose }: { client: Client | null; onClose: () => void }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onClose()
      }}
    >
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" defaultValue={client?.name} placeholder="e.g., Emma Wilson" />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue={client?.email} placeholder="email@example.com" />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" defaultValue={client?.phone} placeholder="(555) 123-4567" />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" defaultValue={client?.notes} placeholder="Any special notes or preferences" />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        {client ? "Update" : "Add"} Client
      </Button>
    </form>
  )
}
