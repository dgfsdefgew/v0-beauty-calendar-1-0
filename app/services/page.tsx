"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scissors, Plus, Pencil, Trash2, Search, Calendar } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Service {
  id: string
  name: string
  category: string
  duration: number
  price: number
  description: string
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Haircut & Style",
    category: "Hair",
    duration: 60,
    price: 65,
    description: "Professional haircut with styling",
  },
  {
    id: "2",
    name: "Color Treatment",
    category: "Hair",
    duration: 120,
    price: 150,
    description: "Full color application",
  },
  {
    id: "3",
    name: "Highlights",
    category: "Hair",
    duration: 180,
    price: 200,
    description: "Partial or full highlights",
  },
  { id: "4", name: "Manicure", category: "Nails", duration: 45, price: 35, description: "Classic manicure" },
  { id: "5", name: "Pedicure", category: "Nails", duration: 60, price: 50, description: "Relaxing pedicure treatment" },
  {
    id: "6",
    name: "Gel Nails",
    category: "Nails",
    duration: 90,
    price: 70,
    description: "Long-lasting gel nail application",
  },
  {
    id: "7",
    name: "Makeup Application",
    category: "Makeup",
    duration: 60,
    price: 80,
    description: "Professional makeup for events",
  },
  { id: "8", name: "Facial Treatment", category: "Spa", duration: 90, price: 95, description: "Rejuvenating facial" },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = Array.from(new Set(services.map((s) => s.category)))

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id))
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingService(null)
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
              <h1 className="text-xl font-bold text-foreground">Services</h1>
              <p className="text-xs text-muted-foreground">Manage your service offerings</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              </DialogHeader>
              <ServiceForm service={editingService} onClose={() => setIsDialogOpen(false)} />
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
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Services by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryServices = filteredServices.filter((s) => s.category === category)

            if (categoryServices.length === 0) return null

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Scissors className="w-6 h-6 text-primary" />
                  {category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryServices.map((service) => (
                    <Card
                      key={service.id}
                      className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg text-foreground">{service.name}</h3>
                        <span className="text-primary font-bold text-lg">${service.price}</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span>{service.duration} min</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="flex-1 hover:bg-primary/10"
                        >
                          <Pencil className="w-3 h-3 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function ServiceForm({ service, onClose }: { service: Service | null; onClose: () => void }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onClose()
      }}
    >
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Input id="name" defaultValue={service?.name} placeholder="e.g., Haircut & Style" />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" defaultValue={service?.category} placeholder="e.g., Hair" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration (min)</Label>
          <Input id="duration" type="number" defaultValue={service?.duration} placeholder="60" />
        </div>
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" type="number" defaultValue={service?.price} placeholder="65" />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" defaultValue={service?.description} placeholder="Service description" />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        {service ? "Update" : "Add"} Service
      </Button>
    </form>
  )
}
