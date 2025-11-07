"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Search, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Product {
  id: string
  name: string
  category: string
  brand: string
  price: number
  stock: number
  minStock: number
  supplier: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Professional Hair Shampoo",
    category: "Hair Care",
    brand: "Salon Pro",
    price: 28,
    stock: 45,
    minStock: 10,
    supplier: "Beauty Supplies Co.",
  },
  {
    id: "2",
    name: "Hair Conditioner",
    category: "Hair Care",
    brand: "Salon Pro",
    price: 32,
    stock: 38,
    minStock: 10,
    supplier: "Beauty Supplies Co.",
  },
  {
    id: "3",
    name: "Hair Color - Blonde",
    category: "Hair Color",
    brand: "ColorMaster",
    price: 55,
    stock: 8,
    minStock: 5,
    supplier: "Professional Hair Inc.",
  },
  {
    id: "4",
    name: "Hair Color - Brown",
    category: "Hair Color",
    brand: "ColorMaster",
    price: 55,
    stock: 12,
    minStock: 5,
    supplier: "Professional Hair Inc.",
  },
  {
    id: "5",
    name: "Gel Nail Polish Set",
    category: "Nail Products",
    brand: "NailPerfect",
    price: 65,
    stock: 3,
    minStock: 5,
    supplier: "Nail World",
  },
  {
    id: "6",
    name: "Nail Polish Remover",
    category: "Nail Products",
    brand: "NailCare",
    price: 12,
    stock: 25,
    minStock: 10,
    supplier: "Nail World",
  },
  {
    id: "7",
    name: "Makeup Primer",
    category: "Makeup",
    brand: "BeautyFace",
    price: 42,
    stock: 15,
    minStock: 8,
    supplier: "Cosmetics Direct",
  },
  {
    id: "8",
    name: "Foundation Set",
    category: "Makeup",
    brand: "BeautyFace",
    price: 85,
    stock: 10,
    minStock: 6,
    supplier: "Cosmetics Direct",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
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
              <h1 className="text-xl font-bold text-foreground">Products</h1>
              <p className="text-xs text-muted-foreground">Manage your inventory</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <ProductForm product={editingProduct} onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Card className="p-4 mb-6 bg-destructive/10 border-destructive/30">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <div>
                <h3 className="font-semibold text-foreground">Low Stock Alert</h3>
                <p className="text-sm text-muted-foreground">
                  {lowStockProducts.length} {lowStockProducts.length === 1 ? "product is" : "products are"} low on stock
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const isLowStock = product.stock <= product.minStock

            return (
              <Card
                key={product.id}
                className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all ${isLowStock ? "ring-2 ring-destructive/50" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">${product.price}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-foreground">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className={`font-semibold ${isLowStock ? "text-destructive" : "text-foreground"}`}>
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supplier:</span>
                    <span className="text-foreground text-xs">{product.supplier}</span>
                  </div>
                </div>

                {isLowStock && (
                  <div className="mb-3 px-3 py-2 rounded-md bg-destructive/10 border border-destructive/30 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span className="text-xs text-destructive font-medium">Low Stock</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1 hover:bg-primary/10"
                  >
                    <Pencil className="w-3 h-3 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onClose()
      }}
    >
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" defaultValue={product?.name} placeholder="e.g., Professional Shampoo" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" defaultValue={product?.category} placeholder="Hair Care" />
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" defaultValue={product?.brand} placeholder="Salon Pro" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" type="number" defaultValue={product?.price} placeholder="28" />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" defaultValue={product?.stock} placeholder="45" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minStock">Min Stock</Label>
          <Input id="minStock" type="number" defaultValue={product?.minStock} placeholder="10" />
        </div>
        <div>
          <Label htmlFor="supplier">Supplier</Label>
          <Input id="supplier" defaultValue={product?.supplier} placeholder="Supplier name" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        {product ? "Update" : "Add"} Product
      </Button>
    </form>
  )
}
