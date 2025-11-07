"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Search, Calendar, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Stylist {
  id: string
  name: string
  specialty: string
  email: string
  phone: string
  avatar: string
  status: "active" | "inactive"
}

const mockStylists: Stylist[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Hair Specialist",
    email: "sarah@example.com",
    phone: "(555) 123-4567",
    avatar: "/woman-hair-stylist.jpg",
    status: "active",
  },
  {
    id: "2",
    name: "Jessica Lee",
    specialty: "Nail Technician",
    email: "jessica@example.com",
    phone: "(555) 234-5678",
    avatar: "/woman-nail-technician.png",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Chen",
    specialty: "Hair & Beard",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    avatar: "/man-barber.jpg",
    status: "active",
  },
  {
    id: "4",
    name: "Emma Davis",
    specialty: "Makeup Artist",
    email: "emma@example.com",
    phone: "(555) 456-7890",
    avatar: "/woman-makeup-artist.jpg",
    status: "active",
  },
]

export default function StylistsPage() {
  const [stylists, setStylists] = useState<Stylist[]>(mockStylists)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null)

  const filteredStylists = stylists.filter(
    (stylist) =>
      stylist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stylist.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this stylist?")) {
      setStylists(stylists.filter((s) => s.id !== id))
    }
  }

  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingStylist(null)
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
              <h1 className="text-xl font-bold text-foreground">Stylists</h1>
              <p className="text-xs text-muted-foreground">Manage your team</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Stylist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingStylist ? "Edit Stylist" : "Add New Stylist"}</DialogTitle>
              </DialogHeader>
              <StylistForm stylist={editingStylist} onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search stylists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStylists.map((stylist) => (
            <Card
              key={stylist.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <img
                  src={stylist.avatar || "/placeholder.svg"}
                  alt={stylist.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-primary/20 object-cover"
                />
                <h3 className="font-semibold text-lg text-foreground mb-1">{stylist.name}</h3>
                <p className="text-sm text-primary mb-3">{stylist.specialty}</p>

                <div className="w-full space-y-2 text-sm text-left">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{stylist.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{stylist.phone}</span>
                  </div>
                </div>

                <div
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                    stylist.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stylist.status}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(stylist)}
                  className="flex-1 hover:bg-primary/10"
                >
                  <Pencil className="w-3 h-3 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(stylist.id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

function StylistForm({ stylist, onClose }: { stylist: Stylist | null; onClose: () => void }) {
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
        <Input id="name" defaultValue={stylist?.name} placeholder="e.g., Sarah Johnson" />
      </div>

      <div>
        <Label htmlFor="specialty">Specialty</Label>
        <Input id="specialty" defaultValue={stylist?.specialty} placeholder="e.g., Hair Specialist" />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue={stylist?.email} placeholder="email@example.com" />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" defaultValue={stylist?.phone} placeholder="(555) 123-4567" />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        {stylist ? "Update" : "Add"} Stylist
      </Button>
    </form>
  )
}
