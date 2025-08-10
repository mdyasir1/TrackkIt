import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for inventory items
const inventoryItems = [
  { id: 1, name: 'MacBook Pro 16"', category: "Electronics", quantity: 15, price: 207499.17 },
  { id: 2, name: "iPhone 15 Pro", category: "Electronics", quantity: 8, price: 82999.17 },
  { id: 3, name: "AirPods Pro", category: "Electronics", quantity: 0, price: 20749.17 },
  { id: 4, name: "iPad Air", category: "Electronics", quantity: 12, price: 49799.17 },
  { id: 5, name: "Apple Watch Series 9", category: "Electronics", quantity: 6, price: 33199.17 },
  { id: 6, name: "Samsung Galaxy S24", category: "Electronics", quantity: 20, price: 74399.17 },
  { id: 7, name: "Dell XPS 13", category: "Electronics", quantity: 5, price: 107899.17 },
  { id: 8, name: "Sony WH-1000XM5", category: "Electronics", quantity: 18, price: 29049.17 },
  { id: 9, name: "Nintendo Switch", category: "Gaming", quantity: 25, price: 24899.17 },
  { id: 10, name: "PlayStation 5", category: "Gaming", quantity: 3, price: 41499.17 },
  { id: 11, name: "Xbox Series X", category: "Gaming", quantity: 7, price: 41499.17 },
  { id: 12, name: "Gaming Chair", category: "Furniture", quantity: 12, price: 24899.17 },
  { id: 13, name: "Standing Desk", category: "Furniture", quantity: 8, price: 49799.17 },
  { id: 14, name: 'Monitor 27"', category: "Electronics", quantity: 14, price: 27389.17 },
  { id: 15, name: "Mechanical Keyboard", category: "Electronics", quantity: 22, price: 12449.17 },
  { id: 16, name: "Wireless Mouse", category: "Electronics", quantity: 35, price: 6639.17 },
  { id: 17, name: "USB-C Hub", category: "Electronics", quantity: 28, price: 4149.17 },
  { id: 18, name: "Webcam 4K", category: "Electronics", quantity: 16, price: 16599.17 },
  { id: 19, name: "Bluetooth Speaker", category: "Electronics", quantity: 19, price: 10789.17 },
  { id: 20, name: "Power Bank", category: "Electronics", quantity: 42, price: 3311.17 },
  { id: 21, name: "Nike Air Max", category: "Clothing", quantity: 15, price: 10789.17 },
  { id: 22, name: "Adidas Hoodie", category: "Clothing", quantity: 8, price: 6631.17 },
  { id: 23, name: "Levi's Jeans", category: "Clothing", quantity: 12, price: 7459.17 },
  { id: 24, name: "Ray-Ban Sunglasses", category: "Accessories", quantity: 6, price: 13279.17 },
  { id: 25, name: "Leather Wallet", category: "Accessories", quantity: 18, price: 4149.17 },
  { id: 26, name: "Coffee Maker", category: "Appliances", quantity: 9, price: 16599.17 },
  { id: 27, name: "Blender", category: "Appliances", quantity: 11, price: 7431.17 },
  { id: 28, name: "Air Fryer", category: "Appliances", quantity: 7, price: 12449.17 },
  { id: 29, name: "Vacuum Cleaner", category: "Appliances", quantity: 5, price: 24899.17 },
  { id: 30, name: 'Smart TV 55"', category: "Electronics", quantity: 4, price: 66399.17 },
  { id: 31, name: "Soundbar", category: "Electronics", quantity: 13, price: 20749.17 },
  { id: 32, name: "Router WiFi 6", category: "Electronics", quantity: 21, price: 14939.17 },
  { id: 33, name: "Smart Thermostat", category: "Smart Home", quantity: 16, price: 16599.17 },
  { id: 34, name: "Security Camera", category: "Smart Home", quantity: 24, price: 10779.17 },
  { id: 35, name: "Smart Doorbell", category: "Smart Home", quantity: 18, price: 14939.17 },
  { id: 36, name: "LED Light Bulbs", category: "Smart Home", quantity: 45, price: 1079.17 },
  { id: 37, name: "Yoga Mat", category: "Sports", quantity: 20, price: 2489.17 },
  { id: 38, name: "Dumbbells Set", category: "Sports", quantity: 8, price: 16599.17 },
  { id: 39, name: "Resistance Bands", category: "Sports", quantity: 32, price: 2074.17 },
  { id: 40, name: "Water Bottle", category: "Sports", quantity: 38, price: 1659.17 },
  { id: 41, name: "Protein Powder", category: "Health", quantity: 15, price: 4149.17 },
  { id: 42, name: "Vitamins", category: "Health", quantity: 28, price: 2489.17 },
  { id: 43, name: "Face Moisturizer", category: "Beauty", quantity: 22, price: 3319.17 },
  { id: 44, name: "Shampoo", category: "Beauty", quantity: 31, price: 1323.17 },
  { id: 45, name: "Electric Toothbrush", category: "Health", quantity: 14, price: 7459.17 },
  { id: 46, name: "Books - Programming", category: "Books", quantity: 25, price: 4979.17 },
  { id: 47, name: "Notebook Set", category: "Stationery", quantity: 40, price: 1659.17 },
  { id: 48, name: "Pen Set", category: "Stationery", quantity: 55, price: 1079.17 },
  { id: 49, name: "Desk Lamp", category: "Furniture", quantity: 17, price: 6631.17 },
  { id: 50, name: "Office Chair", category: "Furniture", quantity: 6, price: 33199.17 },
  { id: 51, name: "Filing Cabinet", category: "Furniture", quantity: 4, price: 16599.17 },
  { id: 52, name: "Whiteboard", category: "Office", quantity: 9, price: 7431.17 },
  { id: 53, name: "Projector", category: "Electronics", quantity: 3, price: 48789.17 },
  { id: 54, name: "Tablet Stand", category: "Accessories", quantity: 26, price: 2894.17 },
  { id: 55, name: "Phone Case", category: "Accessories", quantity: 48, price: 2074.17 },
];


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
