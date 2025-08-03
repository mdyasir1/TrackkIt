import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for sales records
const salesRecords: Array<{
  id: number
  itemId: number
  itemName: string
  quantitySold: number
  unitPrice: number
  totalAmount: number
  timestamp: string
}> = []

let nextSaleId = 1

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId, quantitySold } = body

    // Validation
    if (!itemId || !quantitySold || quantitySold <= 0) {
      return NextResponse.json({ success: false, error: "Invalid sale data" }, { status: 400 })
    }

    // Get current inventory to check availability
    const inventoryResponse = await fetch(`${request.nextUrl.origin}/api/inventory`)
    const inventoryData = await inventoryResponse.json()

    if (!inventoryData.success) {
      return NextResponse.json({ success: false, error: "Failed to fetch inventory" }, { status: 500 })
    }

    const item = inventoryData.data.find((item: any) => item.id === itemId)
    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    if (item.quantity < quantitySold) {
      return NextResponse.json(
        { success: false, error: `Insufficient stock. Available: ${item.quantity}` },
        { status: 400 },
      )
    }

    // Update inventory quantity
    const newQuantity = item.quantity - quantitySold
    const updateResponse = await fetch(`${request.nextUrl.origin}/api/inventory`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, quantity: newQuantity }),
    })

    const updateData = await updateResponse.json()
    if (!updateData.success) {
      return NextResponse.json({ success: false, error: "Failed to update inventory" }, { status: 500 })
    }

    // Create sale record
    const saleRecord = {
      id: nextSaleId++,
      itemId,
      itemName: item.name,
      quantitySold,
      unitPrice: item.price,
      totalAmount: item.price * quantitySold,
      timestamp: new Date().toISOString(),
    }

    salesRecords.push(saleRecord)

    return NextResponse.json(
      {
        success: true,
        data: {
          sale: saleRecord,
          updatedItem: updateData.data,
        },
        message: "Sale completed successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process sale" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: salesRecords,
      total: salesRecords.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch sales" }, { status: 500 })
  }
}
