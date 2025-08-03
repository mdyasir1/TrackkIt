import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for inventory items
const inventoryItems = [
  { id: 1, name: 'MacBook Pro 16"', category: "Electronics", quantity: 15, price: 2499.99 },
  { id: 2, name: "iPhone 15 Pro", category: "Electronics", quantity: 8, price: 999.99 },
  { id: 3, name: "AirPods Pro", category: "Electronics", quantity: 0, price: 249.99 },
  { id: 4, name: "iPad Air", category: "Electronics", quantity: 12, price: 599.99 },
  { id: 5, name: "Apple Watch Series 9", category: "Electronics", quantity: 6, price: 399.99 },
  { id: 6, name: "Samsung Galaxy S24", category: "Electronics", quantity: 20, price: 899.99 },
  { id: 7, name: "Dell XPS 13", category: "Electronics", quantity: 5, price: 1299.99 },
  { id: 8, name: "Sony WH-1000XM5", category: "Electronics", quantity: 18, price: 349.99 },
  { id: 9, name: "Nintendo Switch", category: "Gaming", quantity: 25, price: 299.99 },
  { id: 10, name: "PlayStation 5", category: "Gaming", quantity: 3, price: 499.99 },
  { id: 11, name: "Xbox Series X", category: "Gaming", quantity: 7, price: 499.99 },
  { id: 12, name: "Gaming Chair", category: "Furniture", quantity: 12, price: 299.99 },
  { id: 13, name: "Standing Desk", category: "Furniture", quantity: 8, price: 599.99 },
  { id: 14, name: 'Monitor 27"', category: "Electronics", quantity: 14, price: 329.99 },
  { id: 15, name: "Mechanical Keyboard", category: "Electronics", quantity: 22, price: 149.99 },
  { id: 16, name: "Wireless Mouse", category: "Electronics", quantity: 35, price: 79.99 },
  { id: 17, name: "USB-C Hub", category: "Electronics", quantity: 28, price: 49.99 },
  { id: 18, name: "Webcam 4K", category: "Electronics", quantity: 16, price: 199.99 },
  { id: 19, name: "Bluetooth Speaker", category: "Electronics", quantity: 19, price: 129.99 },
  { id: 20, name: "Power Bank", category: "Electronics", quantity: 42, price: 39.99 },
  { id: 21, name: "Nike Air Max", category: "Clothing", quantity: 15, price: 129.99 },
  { id: 22, name: "Adidas Hoodie", category: "Clothing", quantity: 8, price: 79.99 },
  { id: 23, name: "Levi's Jeans", category: "Clothing", quantity: 12, price: 89.99 },
  { id: 24, name: "Ray-Ban Sunglasses", category: "Accessories", quantity: 6, price: 159.99 },
  { id: 25, name: "Leather Wallet", category: "Accessories", quantity: 18, price: 49.99 },
  { id: 26, name: "Coffee Maker", category: "Appliances", quantity: 9, price: 199.99 },
  { id: 27, name: "Blender", category: "Appliances", quantity: 11, price: 89.99 },
  { id: 28, name: "Air Fryer", category: "Appliances", quantity: 7, price: 149.99 },
  { id: 29, name: "Vacuum Cleaner", category: "Appliances", quantity: 5, price: 299.99 },
  { id: 30, name: 'Smart TV 55"', category: "Electronics", quantity: 4, price: 799.99 },
  { id: 31, name: "Soundbar", category: "Electronics", quantity: 13, price: 249.99 },
  { id: 32, name: "Router WiFi 6", category: "Electronics", quantity: 21, price: 179.99 },
  { id: 33, name: "Smart Thermostat", category: "Smart Home", quantity: 16, price: 199.99 },
  { id: 34, name: "Security Camera", category: "Smart Home", quantity: 24, price: 129.99 },
  { id: 35, name: "Smart Doorbell", category: "Smart Home", quantity: 18, price: 179.99 },
  { id: 36, name: "LED Light Bulbs", category: "Smart Home", quantity: 45, price: 12.99 },
  { id: 37, name: "Yoga Mat", category: "Sports", quantity: 20, price: 29.99 },
  { id: 38, name: "Dumbbells Set", category: "Sports", quantity: 8, price: 199.99 },
  { id: 39, name: "Resistance Bands", category: "Sports", quantity: 32, price: 24.99 },
  { id: 40, name: "Water Bottle", category: "Sports", quantity: 38, price: 19.99 },
  { id: 41, name: "Protein Powder", category: "Health", quantity: 15, price: 49.99 },
  { id: 42, name: "Vitamins", category: "Health", quantity: 28, price: 29.99 },
  { id: 43, name: "Face Moisturizer", category: "Beauty", quantity: 22, price: 39.99 },
  { id: 44, name: "Shampoo", category: "Beauty", quantity: 31, price: 15.99 },
  { id: 45, name: "Electric Toothbrush", category: "Health", quantity: 14, price: 89.99 },
  { id: 46, name: "Books - Programming", category: "Books", quantity: 25, price: 59.99 },
  { id: 47, name: "Notebook Set", category: "Stationery", quantity: 40, price: 19.99 },
  { id: 48, name: "Pen Set", category: "Stationery", quantity: 55, price: 12.99 },
  { id: 49, name: "Desk Lamp", category: "Furniture", quantity: 17, price: 79.99 },
  { id: 50, name: "Office Chair", category: "Furniture", quantity: 6, price: 399.99 },
  { id: 51, name: "Filing Cabinet", category: "Furniture", quantity: 4, price: 199.99 },
  { id: 52, name: "Whiteboard", category: "Office", quantity: 9, price: 89.99 },
  { id: 53, name: "Projector", category: "Electronics", quantity: 3, price: 599.99 },
  { id: 54, name: "Tablet Stand", category: "Accessories", quantity: 26, price: 34.99 },
  { id: 55, name: "Phone Case", category: "Accessories", quantity: 48, price: 24.99 },
]

let nextId = 56

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: inventoryItems,
      total: inventoryItems.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, quantity, price } = body

    // Validation
    if (!name || !category || quantity === undefined || price === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    if (quantity < 0 || price < 0) {
      return NextResponse.json({ success: false, error: "Quantity and price must be non-negative" }, { status: 400 })
    }

    // Create new item
    const newItem = {
      id: nextId++,
      name: name.trim(),
      category: category.trim(),
      quantity: Number.parseInt(quantity),
      price: Number.parseFloat(price),
    }

    // Add to inventory
    inventoryItems.push(newItem)

    return NextResponse.json(
      {
        success: true,
        data: newItem,
        message: "Item added successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, quantity } = body

    // Validation
    if (!id || quantity === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    if (quantity < 0) {
      return NextResponse.json({ success: false, error: "Quantity must be non-negative" }, { status: 400 })
    }

    // Find item
    const itemIndex = inventoryItems.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    // Update quantity
    inventoryItems[itemIndex].quantity = Number.parseInt(quantity)

    return NextResponse.json({
      success: true,
      data: inventoryItems[itemIndex],
      message: "Item updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 })
  }
}
