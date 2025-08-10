import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  List,
  LayoutList,
} from "lucide-react";

export default function InventoryPage() {
  return (
    <div>
      <div className="flex flex-col justify-center min-h-screen bg-red-100 md:bg-white ">
        {/* Header */}
        <div className="text-center mt-10 md:mt-0 mb-10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-2xl">
              <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 " />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            TrackKit
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-xl md:max-w-2xl mx-auto">
            Streamline your business operations with our comprehensive inventory
            and sales management system
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10 md:mb-0 px-4">
          <Link href="/inventory" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Add to Inventory
                </h2>
                <p className="text-gray-600 mb-6">
                  Manage your inventory items, add new products, and track stock
                  levels in real-time
                </p>
                <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-green-700 transition-colors duration-300">
                  Manage Inventory →
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/sales" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sell Items
                </h2>
                <p className="text-gray-600 mb-6">
                  Process sales transactions, update inventory automatically,
                  and track your revenue
                </p>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-blue-700 transition-colors duration-300">
                  Start Selling →
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/items" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-amber-100 text-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LayoutList className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  All Items
                </h2>
                <p className="text-gray-600 mb-6">
                  Stores items, which are added in inventory and updates
                  automatically when sold
                </p>
                <div className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-amber-700 transition-colors duration-300">
                  View Items →
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-4 md:mt-0">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Real-time Updates
            </h4>
            <p className="text-gray-600">
              Inventory levels update automatically when sales are made,
              ensuring accurate stock tracking
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Inventory
            </h4>
            <p className="text-gray-600">
              Dynamic status tracking with color-coded alerts for low stock and
              out-of-stock items
            </p>
          </div>

          <div className="text-center">
            <div className="bg-pink-100 text-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Management
            </h4>
            <p className="text-gray-600">
              Intuitive interface for managing products, processing sales, and
              monitoring business performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
