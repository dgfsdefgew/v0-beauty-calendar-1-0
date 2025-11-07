"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Share2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CartItem {
  id: string
  name: string
  type: "service" | "product"
  price: number
  quantity: number
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
}

interface ReceiptProps {
  open: boolean
  onClose: () => void
  cart: CartItem[]
  client: Client | null
  paymentMethod: "cash" | "credit" | "transferencia"
  subtotal: number
  tax: number
  total: number
  saleId: string
  saleDate: string
}

interface BusinessInfo {
  name: string
  address: string
  phone: string
  email: string
  website: string
  rfc?: string
}

export function SaleReceipt({
  open,
  onClose,
  cart,
  client,
  paymentMethod,
  subtotal,
  tax,
  total,
  saleId,
  saleDate,
}: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  // Business info - would come from settings in production
  const businessInfo: BusinessInfo = {
    name: "Beauty Salon & Spa",
    address: "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX 03100, México",
    phone: "+52 55 1234 5678",
    email: "info@beautysalon.com.mx",
    website: "www.beautysalon.com.mx",
    rfc: "BSS123456ABC",
  }

  const paymentMethodText = {
    cash: "Efectivo",
    credit: "Tarjeta de Crédito/Débito",
    transferencia: "Transferencia Bancaria",
  }

  const downloadAsPDF = async () => {
    // In production, you would use a library like jsPDF or html2canvas
    alert("Generando PDF del ticket... Esta funcionalidad se implementará con una librería de PDF.")

    // Example implementation would be:
    // const html2canvas = (await import('html2canvas')).default
    // const jsPDF = (await import('jspdf')).default
    // const canvas = await html2canvas(receiptRef.current!)
    // const pdf = new jsPDF()
    // pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297)
    // pdf.save(`ticket-${saleId}.pdf`)
  }

  const shareViaWhatsApp = () => {
    const message = `
*${businessInfo.name}*
${businessInfo.address}
Tel: ${businessInfo.phone}
${businessInfo.website}

*TICKET DE VENTA*
Folio: ${saleId}
Fecha: ${saleDate}

*Cliente:* ${client?.name || "Cliente General"}

*DETALLE DE VENTA:*
${cart.map((item) => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`).join("\n")}

*Subtotal:* $${subtotal.toFixed(2)}
*IVA (16%):* $${tax.toFixed(2)}
*TOTAL:* $${total.toFixed(2)}

*Método de Pago:* ${paymentMethodText[paymentMethod]}

¡Gracias por su preferencia!
    `.trim()

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        {/* Receipt Content */}
        <div ref={receiptRef} className="bg-white text-black p-8">
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-4 mb-4">
            <h1 className="text-2xl font-bold mb-2">{businessInfo.name}</h1>
            <p className="text-xs mb-1">{businessInfo.address}</p>
            <p className="text-xs mb-1">Tel: {businessInfo.phone}</p>
            <p className="text-xs mb-1">Email: {businessInfo.email}</p>
            <p className="text-xs mb-1">{businessInfo.website}</p>
            {businessInfo.rfc && <p className="text-xs font-semibold">RFC: {businessInfo.rfc}</p>}
          </div>

          {/* Sale Info */}
          <div className="border-b border-dashed border-black pb-3 mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Folio:</span>
              <span>{saleId}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Fecha:</span>
              <span>{saleDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Cliente:</span>
              <span>{client?.name || "Cliente General"}</span>
            </div>
            {client && (
              <div className="flex justify-between text-xs mt-1">
                <span>Tel:</span>
                <span>{client.phone}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="mb-4">
            <h2 className="font-bold text-sm mb-2 border-b border-black pb-1">DETALLE DE VENTA</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-black">
                  <th className="text-left py-1">Cant.</th>
                  <th className="text-left py-1">Descripción</th>
                  <th className="text-right py-1">Precio</th>
                  <th className="text-right py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-dashed border-gray-300">
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">
                      <div>{item.name}</div>
                      <div className="text-[10px] text-gray-600">
                        {item.type === "service" ? "Servicio" : "Producto"}
                      </div>
                    </td>
                    <td className="text-right py-2">${item.price.toFixed(2)}</td>
                    <td className="text-right py-2">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t-2 border-black pt-3 mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)} MXN</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>IVA (16%):</span>
              <span>${tax.toFixed(2)} MXN</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-black pt-2">
              <span>TOTAL:</span>
              <span>${total.toFixed(2)} MXN</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border-t border-dashed border-black pt-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Método de Pago:</span>
              <span>{paymentMethodText[paymentMethod]}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs border-t-2 border-black pt-3">
            <p className="font-semibold mb-2">¡Gracias por su preferencia!</p>
            <p className="mb-1">Patfer 3D Coding by Patrick Blanks</p>
            <p className="text-[10px] text-gray-600">Beauty Calendar 1.0</p>
            <p className="text-[10px] text-gray-600 mt-2">Este ticket no es válido como factura fiscal</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-muted border-t">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button onClick={downloadAsPDF} className="bg-primary hover:bg-primary/90 text-white">
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
            <Button onClick={shareViaWhatsApp} className="bg-green-600 hover:bg-green-700 text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir WhatsApp
            </Button>
          </div>
          <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
