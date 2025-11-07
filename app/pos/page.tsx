"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Calendar,
  User,
  CreditCard,
  Banknote,
  ArrowRightLeft,
  X,
  Check,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SaleReceipt } from "@/components/sale-receipt"

interface Service {
  id: string
  name: string
  category: string
  duration: number
  price: number
}

interface Product {
  id: string
  name: string
  category: string
  brand: string
  price: number
  stock: number
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
}

interface CartItem {
  id: string
  name: string
  type: "service" | "product"
  price: number
  quantity: number
}

const mockServices: Service[] = [
  { id: "s1", name: "Haircut & Style", category: "Hair", duration: 60, price: 65 },
  { id: "s2", name: "Color Treatment", category: "Hair", duration: 120, price: 150 },
  { id: "s3", name: "Highlights", category: "Hair", duration: 180, price: 200 },
  { id: "s4", name: "Manicure", category: "Nails", duration: 45, price: 35 },
  { id: "s5", name: "Pedicure", category: "Nails", duration: 60, price: 50 },
  { id: "s6", name: "Gel Nails", category: "Nails", duration: 90, price: 70 },
  { id: "s7", name: "Makeup Application", category: "Makeup", duration: 60, price: 80 },
  { id: "s8", name: "Facial Treatment", category: "Spa", duration: 90, price: 95 },
]

const mockProducts: Product[] = [
  { id: "p1", name: "Professional Hair Shampoo", category: "Hair Care", brand: "Salon Pro", price: 28, stock: 45 },
  { id: "p2", name: "Hair Conditioner", category: "Hair Care", brand: "Salon Pro", price: 32, stock: 38 },
  { id: "p3", name: "Hair Color - Blonde", category: "Hair Color", brand: "ColorMaster", price: 55, stock: 8 },
  { id: "p4", name: "Gel Nail Polish Set", category: "Nail Products", brand: "NailPerfect", price: 65, stock: 3 },
  { id: "p5", name: "Nail Polish Remover", category: "Nail Products", brand: "NailCare", price: 12, stock: 25 },
  { id: "p6", name: "Makeup Primer", category: "Makeup", brand: "BeautyFace", price: 42, stock: 15 },
  { id: "p7", name: "Foundation Set", category: "Makeup", brand: "BeautyFace", price: 85, stock: 10 },
]

const mockClients: Client[] = [
  { id: "c1", name: "Maria Garcia", email: "maria@email.com", phone: "+52 55 1234 5678" },
  { id: "c2", name: "Sofia Rodriguez", email: "sofia@email.com", phone: "+52 55 2345 6789" },
  { id: "c3", name: "Carmen Lopez", email: "carmen@email.com", phone: "+52 55 3456 7890" },
  { id: "c4", name: "Isabella Martinez", email: "isabella@email.com", phone: "+52 55 4567 8901" },
]

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showClientDialog, setShowClientDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"cash" | "credit" | "transferencia" | null>(null)
  const [activeTab, setActiveTab] = useState("services")
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [lastSale, setLastSale] = useState<{
    cart: CartItem[]
    client: Client | null
    paymentMethod: "cash" | "credit" | "transferencia"
    subtotal: number
    tax: number
    total: number
    saleId: string
    saleDate: string
  } | null>(null)

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToCart = (item: Service | Product, type: "service" | "product") => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { id: item.id, name: item.name, type, price: item.price, quantity: 1 }])
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null),
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.16 // 16% IVA (Mexico)
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío")
      return
    }
    setShowPaymentDialog(true)
  }

  const completeTransaction = () => {
    if (!selectedPaymentMethod) {
      alert("Por favor seleccione un método de pago")
      return
    }

    const saleId = `${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const saleDate = new Date().toLocaleString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    setLastSale({
      cart: [...cart],
      client: selectedClient,
      paymentMethod: selectedPaymentMethod,
      subtotal,
      tax,
      total,
      saleId,
      saleDate,
    })

    setShowPaymentDialog(false)
    setShowReceiptDialog(true)

    setCart([])
    setSelectedClient(null)
    setSelectedPaymentMethod(null)
  }

  const handleCloseReceipt = () => {
    setShowReceiptDialog(false)
    setLastSale(null)
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
              <h1 className="text-xl font-bold text-foreground">Punto de Venta (POS)</h1>
              <p className="text-xs text-muted-foreground">Sistema de punto de venta</p>
            </div>
          </div>

          <Button variant="outline" onClick={() => setShowClientDialog(true)} className="gap-2 hover:bg-primary/10">
            <User className="w-4 h-4" />
            {selectedClient ? selectedClient.name : "Cliente General"}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos o servicios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="services">Servicios</TabsTrigger>
                  <TabsTrigger value="products">Productos</TabsTrigger>
                </TabsList>

                <TabsContent value="services">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredServices.map((service) => (
                      <Card
                        key={service.id}
                        className="p-4 bg-background/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => addToCart(service, "service")}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{service.name}</h3>
                            <p className="text-xs text-muted-foreground">{service.category}</p>
                          </div>
                          <Plus className="w-5 h-5 text-primary flex-shrink-0" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{service.duration} min</span>
                          <span className="text-lg font-bold text-primary">${service.price}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="products">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="p-4 bg-background/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => addToCart(product, "product")}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{product.name}</h3>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                          <Plus className="w-5 h-5 text-primary flex-shrink-0" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                          <span className="text-lg font-bold text-primary">${product.price}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Carrito</h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">El carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                    {cart.map((item) => (
                      <Card key={item.id} className="p-3 bg-background/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {item.type === "service" ? "Servicio" : "Producto"}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-7 w-7 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <span className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IVA (16%):</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-border/50">
                      <span className="text-foreground">Total:</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Procesar Pago
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 bg-transparent"
              onClick={() => {
                setSelectedClient(null)
                setShowClientDialog(false)
              }}
            >
              <User className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Cliente General</div>
                <div className="text-xs text-muted-foreground">Cliente de contado</div>
              </div>
            </Button>

            <div className="border-t border-border/50 pt-3">
              <p className="text-sm font-medium text-muted-foreground mb-3">Clientes Registrados</p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {mockClients.map((client) => (
                  <Button
                    key={client.id}
                    variant="outline"
                    className={`w-full justify-start h-auto py-3 ${selectedClient?.id === client.id ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => {
                      setSelectedClient(client)
                      setShowClientDialog(false)
                    }}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <div className="text-left flex-1">
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.phone}</div>
                    </div>
                    {selectedClient?.id === client.id && <Check className="w-4 h-4 text-primary" />}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Método de Pago</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="p-4 bg-muted/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente:</span>
                  <span className="font-medium">{selectedClient?.name || "Cliente General"}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total a pagar:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-4 ${selectedPaymentMethod === "cash" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedPaymentMethod("cash")}
              >
                <Banknote className="w-6 h-6 mr-3 text-green-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Efectivo</div>
                  <div className="text-xs text-muted-foreground">Pago en efectivo</div>
                </div>
                {selectedPaymentMethod === "cash" && <Check className="w-5 h-5 text-primary" />}
              </Button>

              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-4 ${selectedPaymentMethod === "credit" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedPaymentMethod("credit")}
              >
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Tarjeta de Crédito/Débito</div>
                  <div className="text-xs text-muted-foreground">Visa, Mastercard, American Express</div>
                </div>
                {selectedPaymentMethod === "credit" && <Check className="w-5 h-5 text-primary" />}
              </Button>

              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-4 ${selectedPaymentMethod === "transferencia" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedPaymentMethod("transferencia")}
              >
                <ArrowRightLeft className="w-6 h-6 mr-3 text-purple-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Transferencia</div>
                  <div className="text-xs text-muted-foreground">SPEI, transferencia bancaria</div>
                </div>
                {selectedPaymentMethod === "transferencia" && <Check className="w-5 h-5 text-primary" />}
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={completeTransaction}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!selectedPaymentMethod}
              >
                <Check className="w-4 h-4 mr-2" />
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {lastSale && (
        <SaleReceipt
          open={showReceiptDialog}
          onClose={handleCloseReceipt}
          cart={lastSale.cart}
          client={lastSale.client}
          paymentMethod={lastSale.paymentMethod}
          subtotal={lastSale.subtotal}
          tax={lastSale.tax}
          total={lastSale.total}
          saleId={lastSale.saleId}
          saleDate={lastSale.saleDate}
        />
      )}
    </div>
  )
}
