"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Package, Search, Filter, RefreshCw, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number
  price: number
}

const categories = [
  "Electronics",
  "Gaming",
  "Furniture",
  "Clothing",
  "Accessories",
  "Appliances",
  "Smart Home",
  "Sports",
  "Health",
  "Beauty",
  "Books",
  "Stationery",
  "Office",
]

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  })

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/inventory")
      const result = await response.json()

      if (result.success) {
        setItems(result.data)
      } else {
        setError(result.error || "Failed to fetch inventory")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Add new item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          quantity: Number.parseInt(formData.quantity),
          price: Number.parseFloat(formData.price),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess("Item added successfully!")
        setFormData({ name: "", category: "", quantity: "", price: "" })
        await fetchInventory()
      } else {
        setError(result.error || "Failed to add item")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  // Get status based on quantity
  const getStatus = (quantity: number) => {
    if (quantity === 0) return "Out of Stock"
    if (quantity <= 10) return "Low Stock"
    return "In Stock"
  }

  // Get status badge
  const getStatusBadge = (quantity: number) => {
    const status = getStatus(quantity)
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>
      case "Out of Stock":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Load data on component mount
  useEffect(() => {
    fetchInventory()
  }, [])

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Package className="h-10 w-10 text-green-600" />
            Inventory Management
          </h1>
          <p className="text-gray-600 text-lg">Add and manage your inventory items</p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Add Item Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter item name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline" onClick={fetchInventory} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                  Refresh
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2 text-gray-600">Loading inventory...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No items found</p>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold ">Name</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold text-center">Quantity</TableHead>
                      <TableHead className="font-semibold text-center">Price</TableHead>
                      <TableHead className="font-semibold text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.slice(0, 10).map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center font-mono">{item.quantity}</TableCell>
                        <TableCell className="text-center font-mono">₹{item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{getStatusBadge(item.quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Link href='/items'>
                <h2 className="text-center bg-gray-100 rounded-md border border-red-700 py-3 font-medium mt-2 flex justify-center  items-center">Go to Items Page to view all Items <ArrowUpRight size={18}/></h2>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{items.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {items.filter((item) => item.quantity > 10).length}
                </div>
                <div className="text-sm text-gray-600">In Stock</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {items.filter((item) => item.quantity <= 10 && item.quantity > 0).length}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {items.filter((item) => item.quantity === 0).length}
                </div>
                <div className="text-sm text-gray-600">Out of Stock</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
