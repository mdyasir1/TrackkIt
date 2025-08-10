"use client"

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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, ShoppingCart, Search, Filter, RefreshCw, IndianRupee, ArrowUpRight } from "lucide-react"
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

export default function SalesPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selling, setSelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Sale dialog state
  const [saleDialogOpen, setSaleDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [quantityToSell, setQuantityToSell] = useState("")

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

  // Handle sell button click
  const handleSellClick = (item: InventoryItem) => {
    if (item.quantity === 0) {
      setError("Cannot sell out of stock items")
      return
    }
    setSelectedItem(item)
    setQuantityToSell("")
    setSaleDialogOpen(true)
  }

  // Process sale
  const handleSale = async () => {
    if (!selectedItem || !quantityToSell) return

    const quantity = Number.parseInt(quantityToSell)
    if (quantity <= 0 || quantity > selectedItem.quantity) {
      setError(`Invalid quantity. Available: ${selectedItem.quantity}`)
      return
    }

    setSelling(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: selectedItem.id,
          quantitySold: quantity,
        }),
      })

      const result = await response.json()

      if (result.success) {
        const totalAmount = selectedItem.price * quantity
        setSuccess(`Sale completed! Sold ${quantity} ${selectedItem.name}(s) for $${totalAmount.toFixed(2)}`)
        setSaleDialogOpen(false)
        setSelectedItem(null)
        setQuantityToSell("")
        await fetchInventory() // Refresh inventory
      } else {
        setError(result.error || "Failed to process sale")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setSelling(false)
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
            <ShoppingCart className="h-10 w-10 text-blue-600" />
            Sales Management
          </h1>
          <p className="text-gray-600 text-lg">Process sales and manage transactions</p>
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

        {/* Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Items for Sale ({filteredItems.length})</CardTitle>

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

              <Button variant="outline" onClick={fetchInventory} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading items...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No items found</p>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold text-center">Available</TableHead>
                      <TableHead className="font-semibold text-center">Price</TableHead>
                      <TableHead className="font-semibold text-center">Status</TableHead>
                      <TableHead className="font-semibold text-center">Action</TableHead>
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
                        <TableCell className="text-center">{getStatusBadge(item.quantity)}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            onClick={() => handleSellClick(item)}
                            disabled={item.quantity === 0}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Sell
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Link href='/items'>
                <h2 className="text-center bg-gray-100 rounded-md py-3 border border-red-700 font-medium mt-2 flex justify-center  items-center">Go to Items Page to view all Items <ArrowUpRight size={18}/></h2>
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
                  {items.filter((item) => item.quantity > 0).length}
                </div>
                <div className="text-sm text-gray-600">Available for Sale</div>
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
                <div className="text-2xl font-bold text-purple-600">
                  ₹{items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Inventory Value</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sale Dialog */}
        <Dialog open={saleDialogOpen} onOpenChange={setSaleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Process Sale
              </DialogTitle>
            </DialogHeader>

            {selectedItem && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
                  <p className="text-gray-600">Category: {selectedItem.category}</p>
                  <p className="text-gray-600">Available: {selectedItem.quantity} units</p>
                  <p className="text-gray-600">Price: ₹{selectedItem.price.toFixed(2)} each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantityToSell">Quantity to Sell</Label>
                  <Input
                    id="quantityToSell"
                    type="number"
                    min="1"
                    max={selectedItem.quantity}
                    placeholder="Enter quantity"
                    value={quantityToSell}
                    onChange={(e) => setQuantityToSell(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Maximum: {selectedItem.quantity} units</p>
                </div>

                {quantityToSell && Number.parseInt(quantityToSell) > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold">Sale Summary:</p>
                    <p>Quantity: {quantityToSell} units</p>
                    <p>Unit Price: ₹{selectedItem.price.toFixed(2)}</p>
                    <p className="text-lg font-bold text-blue-600">
                      Total: ₹{(selectedItem.price * Number.parseInt(quantityToSell)).toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSale} disabled={selling || !quantityToSell} className="flex-1">
                    {selling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <IndianRupee className="mr-2 h-4 w-4" />
                        Complete Sale
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setSaleDialogOpen(false)} disabled={selling}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
