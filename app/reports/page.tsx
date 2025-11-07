"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FileText, Download, Calendar, TrendingUp, DollarSign, Users, Scissors } from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data
const monthlyRevenue = [
  { month: "Jan", revenue: 8200, appointments: 156 },
  { month: "Feb", revenue: 7800, appointments: 148 },
  { month: "Mar", revenue: 9100, appointments: 172 },
  { month: "Apr", revenue: 8900, appointments: 168 },
  { month: "May", revenue: 9800, appointments: 185 },
  { month: "Jun", revenue: 10200, appointments: 192 },
]

const serviceBreakdown = [
  { name: "Haircut & Style", value: 35, revenue: 3575 },
  { name: "Color Treatment", value: 20, revenue: 3000 },
  { name: "Nail Services", value: 25, revenue: 1875 },
  { name: "Makeup", value: 12, revenue: 960 },
  { name: "Other", value: 8, revenue: 790 },
]

const topClients = [
  { name: "Sophie Taylor", visits: 20, spent: 1450 },
  { name: "Lisa Anderson", visits: 15, spent: 980 },
  { name: "Emma Wilson", visits: 12, spent: 820 },
  { name: "Michael Brown", visits: 8, spent: 640 },
  { name: "David Martinez", visits: 6, spent: 420 },
]

const stylistPerformance = [
  { name: "Sarah Johnson", appointments: 85, revenue: 5675 },
  { name: "Jessica Lee", appointments: 72, revenue: 4320 },
  { name: "Michael Chen", appointments: 58, revenue: 3770 },
  { name: "Emma Davis", appointments: 45, revenue: 3600 },
]

const COLORS = ["#d4a59a", "#e8c4b8", "#c89383", "#f5ebe4", "#e5dad3"]

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("2024-01-01")
  const [dateTo, setDateTo] = useState("2024-12-31")

  const handleGeneratePDF = () => {
    // In a real app, this would generate a PDF using a library like jsPDF
    alert("PDF report will be generated and downloaded. This feature uses jsPDF library in production.")
  }

  const handleExportCSV = () => {
    // In a real app, this would export data to CSV
    alert("CSV export will be downloaded. This feature exports all report data to a spreadsheet.")
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
              <h1 className="text-xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-xs text-muted-foreground">Business insights and performance</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline" className="hover:bg-primary/10 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleGeneratePDF} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Date Range Filter */}
        <Card className="p-4 mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="from">From Date</Label>
              <Input
                id="from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="to">To Date</Label>
              <Input id="to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="mt-1" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Apply Filter</Button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground mt-1">$54,100</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last period
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Appointments</p>
                <p className="text-3xl font-bold text-foreground mt-1">1,021</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% from last period
                </p>
              </div>
              <Scissors className="w-10 h-10 text-accent/50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-3xl font-bold text-foreground mt-1">248</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% from last period
                </p>
              </div>
              <Users className="w-10 h-10 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Ticket</p>
                <p className="text-3xl font-bold text-foreground mt-1">$53</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +4% from last period
                </p>
              </div>
              <FileText className="w-10 h-10 text-accent/50" />
            </div>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5dad3" />
                <XAxis dataKey="month" stroke="#6b6562" />
                <YAxis stroke="#6b6562" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5dad3",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#d4a59a" strokeWidth={3} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Service Breakdown */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Service Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5dad3",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Appointments by Month */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Appointments by Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5dad3" />
                <XAxis dataKey="month" stroke="#6b6562" />
                <YAxis stroke="#6b6562" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5dad3",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="appointments" fill="#e8c4b8" name="Appointments" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Stylist Performance */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Stylist Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stylistPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5dad3" />
                <XAxis type="number" stroke="#6b6562" />
                <YAxis dataKey="name" type="category" stroke="#6b6562" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5dad3",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#d4a59a" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Clients Table */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Clients</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Rank</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Client Name</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total Visits</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((client, index) => (
                  <tr key={client.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">{client.name}</td>
                    <td className="py-3 px-4 text-right text-foreground">{client.visits}</td>
                    <td className="py-3 px-4 text-right font-semibold text-primary">${client.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
